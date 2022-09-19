import React, { useEffect, useRef, useState, useTransition } from "react";
import { IsEAN, ValidateSearchString } from "../../../utils/validator";
import { Producto } from "../../../tipos/Producto";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import ProductCard from "./productCard";
import useProductEnCarritoContext from "../../../context/productosEnCarritoContext";
import SkeletonProductCard from "../../Skeletons/skeletonProductCard";
import SidebarDerecho from "./sidebarDerecho";
import { motion } from "framer-motion";

const frequenceRateTyping = 100;

const TPV = (props: { productos: Producto[], empleadoUsandoTPV: boolean, setEmpleadoUsandoTPV: Function, setShowModalCerrar: Function, setShowModalAbrir: Function }) => {
    const [ProductosFiltrados, setProductosFiltrados] = useState<Producto[]>(props.productos);
    const [dirtyInput, setDirtyInput] = useState<string>("")
    const [Filtro, setFiltro] = useState<string>("");
    const { ProductosEnCarrito, SetProductosEnCarrito } = useProductEnCarritoContext();
    const [Familias, setFamilias] = useState<string[]>([]);
    const [, startTransition] = useTransition();

    const inputRef = useRef<any>(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            Filtrar(dirtyInput)
        }, frequenceRateTyping)

        return () => clearTimeout(delayDebounceFn)
    }, [dirtyInput])

    useEffect(() => {
        function uniq_fast(a: Producto[]) {
            let seenMap: Map<string, number> = new Map();
            let out: string[] = [];
            let len = a.length;
            let j = 0;
            for (let i = 0; i < len; i++) {
                let item = a[i].familia;
                if (item == "") { continue; }
                if (item == undefined) { continue; }
                if (!seenMap.has(item)) {
                    seenMap.set(item, 1);
                    out[j++] = item;
                }
            }

            return out;
        }

        if (!props.productos) { return; }

        setFamilias(uniq_fast(props.productos));
        setProductosFiltrados(props.productos)
    }, [props.productos]);

    const Filtrar = (cadena: string) => {
        const stringValidated = ValidateSearchString(cadena);
        try {
            startTransition(() => {
                let productosFiltrados: Producto[];
                if (stringValidated === "") productosFiltrados = props.productos;
                else {
                    productosFiltrados = props.productos.filter((p: Producto) => {
                        return p.alta &&
                            (p.nombre.toUpperCase().includes(stringValidated.toUpperCase()) || p.ean === stringValidated)
                    });
                }

                if (IsEAN(stringValidated)) {
                    AddProductoToCarrito(productosFiltrados[0], ProductosEnCarrito, SetProductosEnCarrito);
                    setProductosFiltrados(props.productos);
                    setDirtyInput("");
                    setFiltro("");
                }
                else {
                    setProductosFiltrados(productosFiltrados);
                    setFiltro(stringValidated);
                }
            })
        }
        catch (err) {
            setProductosFiltrados([]);
            setFiltro(stringValidated);
        }
    }

    const LimpiarFiltro = () => {
        setDirtyInput("");
    }

    const arrayNum = [...Array(3)];

    if (!props.empleadoUsandoTPV) {
        return (<div className="antialiased overflow-hidden text-gray-800">
            <div className="grid grid-cols-3 bg-gray-100">
                <div className="col-span-2 h-screen">
                    <div className="flex flex-col h-full w-full py-4">
                        <div className="flex px-2 flex-row relative">
                            <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-blue-400 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input disabled value={Filtro} className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Buscar producto o código de barras" />
                        </div>
                        <div className="flex gap-2 p-4">
                            {
                                arrayNum.map((n, i) => {
                                    return (
                                        <div key={`SkeletonFav-${i}`} className="animate-pulse h-10 w-16 md:w-32 lg:w-48 border-2 rounded-md mx-auto bg-gray-300" />
                                    );
                                })
                            }
                        </div>
                        <div className="h-full overflow-hidden">
                            <ListaProductos productosFiltrados={ProductosFiltrados} />
                        </div>
                    </div>
                </div>
                <div className="h-screen p-3">
                    <SidebarDerecho setProductosCarrito={SetProductosEnCarrito} empleadoUsandoTPV={props.empleadoUsandoTPV}
                        setShowModalAbrir={props.setShowModalAbrir} setShowModalCerrar={props.setShowModalCerrar}
                        productos={props.productos} />
                </div>
            </div>
        </div>)
    }

    return (
        <div className="antialiased overflow-hidden text-gray-800"
            onClick={() => { inputRef?.current?.focus() }}>
            <div className="grid grid-cols-3 bg-gray-100">
                <div className="col-span-2 h-screen">
                    <div className="flex flex-col h-full w-full py-4">
                        <div className="px-2 text-lg h-16">
                            <div className="flex w-full gap-2 flex-row bg-white rounded-3xl shadow transition-shadow focus:outline-none p-2">
                                <div className="flex p-2 items-center rounded-full bg-blue-400 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input className="w-full transition-shadow focus:outline-none" placeholder="Buscar producto o código de barras..."
                                    autoFocus
                                    ref={inputRef}
                                    onChange={(e) => { setDirtyInput(e.target.value); }}
                                    value={dirtyInput} />
                                <button className="flex p-2 items-center rounded-full text-gray-400 hover:text-red-500"
                                    onClick={() => { LimpiarFiltro(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {
                            props.productos.length <= 0 ?
                                <div className="flex gap-2 p-4">
                                    {
                                        arrayNum.map((n, i) => {
                                            return (
                                                <div key={`SkeletonFav-${i}`} className="animate-pulse h-10 w-16 md:w-32 lg:w-48 border-2 rounded-xl mx-auto bg-gray-300" />
                                            );
                                        })
                                    }
                                </div>
                                :
                                Familias[0] !== undefined &&
                                <div className="px-4">
                                    <div className="flex w-full max-h-20 py-2 gap-2 overflow-y-hidden overflow-x-scroll justify-start text-center">
                                        <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}
                                            key={"Todos"} id={"Todos"} className="flex bg-blue-400 hover:bg-blue-500 text-white rounded-xl w-auto max-w-lg py-1 px-2"
                                            onClick={() => { setProductosFiltrados(props.productos); }}>
                                            <span className="self-center p-1">TODOS</span>
                                        </motion.button>
                                        {
                                            Familias.map(f => {
                                                return (
                                                    <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}
                                                        key={f} id={f} className="flex bg-blue-400 hover:bg-blue-500 text-white rounded-xl w-auto max-w-lg py-1 px-2"
                                                        onClick={(e) => { setProductosFiltrados(props.productos.filter(p => p.familia === e.currentTarget.id)); }}>
                                                        <span className="self-center w-full p-1 truncate">
                                                            {f}
                                                        </span>
                                                    </motion.button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                        }
                        <div className="h-full overflow-hidden">
                            <ListaProductos productos={props.productos} productosFiltrados={ProductosFiltrados} inputRef={inputRef} />
                        </div>
                    </div>
                </div>
                <div className="h-screen p-3">
                    <SidebarDerecho setProductosCarrito={SetProductosEnCarrito} empleadoUsandoTPV={props.empleadoUsandoTPV}
                        setShowModalAbrir={props.setShowModalAbrir} setShowModalCerrar={props.setShowModalCerrar}
                        productos={props.productos}
                        inputRef={inputRef} />
                </div>
            </div>
        </div>
    );
}

const ListaProductos = (props: { productos?: Producto[], productosFiltrados: Producto[], inputRef?: any }) => {
    const { ProductosEnCarrito, SetProductosEnCarrito } = useProductEnCarritoContext();
    const maxItems = 30;

    if (!props.productos) {
        const arrayNum = [...Array(30)];

        return (
            <div className="h-full overflow-y-auto overflow-x-hidden px-2">
                <div className="grid gap-4 pb-3 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:grid-cols-5 text-xs">
                    {arrayNum.map((n, i) => {
                        return (
                            <SkeletonProductCard key={"SkeletonTPVCard-" + i} />
                        );
                    })}
                </div>
            </div>
        );
    }

    if (props.productosFiltrados.length > 0 && props.productos.length > 0) {
        return (
            <div className="h-full overflow-y-auto overflow-x-hidden px-3 pt-2">
                <div className="grid gap-4 sm:grid-cols-1 sm:gap-2 md:grid-cols-3 xl:grid-cols-3 lg:gap-3 2xl:grid-cols-4 text-xs">
                    {
                        props.productosFiltrados.slice(0, maxItems).map((prod: Producto) => {
                            return (
                                <button key={prod._id} id={prod._id}
                                    onClick={() => { AddProductoToCarrito(prod, ProductosEnCarrito, SetProductosEnCarrito); }}>
                                    <ProductCard Prod={prod} />
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="h-full overflow-y-auto overflow-x-hidden px-2">
                <div className="bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                    <div className="w-full text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-xl">
                            PRODUCTO NO ENCONTRADO
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TPV;

const AddProductoToCarrito = (prod: Producto, productosEnCarrito: ProductoVendido[], setProductoList: Function) => {
    const prodEnCarrito = productosEnCarrito.find(p => p._id == prod._id);

    if (prodEnCarrito) {
        const prodIndex = productosEnCarrito.indexOf(prodEnCarrito);
        const prodAlCarrito = {
            _id: prodEnCarrito._id,
            nombre: prodEnCarrito.nombre,
            familia: prodEnCarrito.familia,
            proveedor: prodEnCarrito.proveedor || "Desconocido",
            cantidadVendida: prodEnCarrito.cantidadVendida + 1,
            ean: prodEnCarrito.ean,
            iva: prodEnCarrito.iva,
            margen: prodEnCarrito.margen || 0,
            precioCompra: prodEnCarrito.precioCompra,
            precioVenta: prodEnCarrito.precioVenta,
            precioFinal: prod.precioVenta,
            dto: 0
        } as unknown as ProductoVendido;

        let ProductosEnCarritoUpdated = productosEnCarrito;
        ProductosEnCarritoUpdated[prodIndex] = prodAlCarrito;

        setProductoList([...ProductosEnCarritoUpdated]);
    }
    else {
        const prodAlCarrito = {
            _id: prod._id,
            nombre: prod.nombre,
            familia: prod.familia,
            proveedor: prod.proveedor || "Desconocido",
            cantidadVendida: 1,
            ean: prod.ean,
            iva: prod.iva,
            margen: prod.margen || 0,
            precioCompra: prod.precioCompra,
            precioVenta: prod.precioVenta,
            precioFinal: prod.precioVenta,
            dto: 0
        } as unknown as ProductoVendido

        setProductoList([...productosEnCarrito, prodAlCarrito]);
    }
}