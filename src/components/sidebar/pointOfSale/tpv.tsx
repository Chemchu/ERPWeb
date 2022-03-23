import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IsPositiveFloatingNumber, IsPositiveIntegerNumber, ValidatePositiveFloatingNumber, ValidateSearchString } from "../../../utils/validator";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { Producto } from "../../../tipos/Producto";
import { TipoCobro } from "../../../tipos/Enums/TipoCobro";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import ProductCard, { ProductSelectedCard } from "./productCard";
import useProductEnCarritoContext from "../../../context/productosEnCarritoContext";
import SkeletonProductCard from "../../Skeletons/skeletonProductCard";
import ModalPagar from "../../modal/pagar";
import { AplicarDescuentos, PrecioTotalCarrito } from "../../../utils/preciosUtils";
import { Cliente } from "../../../tipos/Cliente";
import { AddVenta, FetchClientes, FetchEmpleado } from "../../../utils/fetches";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwt from "../../../hooks/jwt";
import { JWT } from "../../../tipos/JWT";
import { notifyError, notifySuccess } from "../../../utils/toastify";
import { useReactToPrint } from "react-to-print";
import Ticket from "../../ticket";
import GenerateQrBase64 from "../../../utils/generateQr";

const TPV = (props: { productos: Producto[], serverOperativo: boolean, empleadoUsandoTPV: boolean, setEmpleadoUsandoTPV: Function, setShowModalCerrar: Function, setShowModalAbrir: Function }) => {
    const [ProductosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
    const { ProductosEnCarrito, SetProductosEnCarrito } = useProductEnCarritoContext();
    const { SetEmpleado } = useEmpleadoContext()
    const [Familias, setFamilias] = useState<string[]>([]);
    const [jwt, setJwt] = useState<JWT>();

    useEffect(() => {
        setJwt(getJwt());
    }, [])

    useEffect(() => {
        // Actualiza el Empleado
        const GetData = async (j: JWT) => {
            SetEmpleado(await FetchEmpleado(j._id));
        }
        if (!jwt) { return; }

        GetData(jwt);
    }, [jwt])

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
        setProductosFiltrados(props.productos);
    }, [props.productos]);

    var Filtrar = (cadena: string) => {
        const stringValidated = ValidateSearchString(cadena);

        let productosFiltrados: Producto[];
        if (stringValidated === "") productosFiltrados = props.productos;
        else {
            productosFiltrados = props.productos.filter((p: Producto) => {
                return p.nombre.toUpperCase().includes(stringValidated.toUpperCase()) || p.ean === stringValidated.toUpperCase()
            });
        }
        setProductosFiltrados(productosFiltrados);
    }

    const arrayNum = [...Array(3)];

    if (!props.empleadoUsandoTPV) {
        return (<div className="antialiased overflow-hidden text-gray-800">
            {/* Página principal del POS */}
            <div className="grid grid-cols-3 bg-gray-100">
                {/* Menú tienda, donde se muestran los productos */}
                <div className="col-span-2 h-screen">
                    <div className="flex flex-col h-full w-full py-4">
                        <div className="flex px-2 flex-row relative">
                            <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-blue-400 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Buscar producto o código de barras..." />
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
                            <ListaProductos productos={[]} productosFiltrados={ProductosFiltrados} ServerUp={props.serverOperativo} />
                        </div>
                    </div>
                </div>
                {/* Sidebar derecho */}
                <div className="h-screen">
                    <SidebarDerecho todosProductos={[]} productosEnCarrito={[]} setProductosCarrito={SetProductosEnCarrito} empleadoUsandoTPV={props.empleadoUsandoTPV} setShowModalAbrir={props.setShowModalAbrir} setShowModalCerrar={props.setShowModalCerrar} />
                </div>

            </div>
        </div>)
    }

    return (
        <div className="antialiased overflow-hidden text-gray-800">
            {/* Página principal del POS */}
            <div className="grid grid-cols-3 bg-gray-100">
                {/* Menú tienda, donde se muestran los productos */}
                <div className="col-span-2 h-screen">
                    <div className="flex flex-col h-full w-full py-4">
                        <div className="flex px-2 flex-row relative">
                            <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-blue-400 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input onChange={(e) => { Filtrar(e.target.value); }} className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Buscar producto o código de barras..." />
                        </div>

                        {/* Genera los botones de favorito */}
                        {
                            props.serverOperativo &&
                                props.productos.length <= 0 ?
                                <div className="flex gap-2 p-4">
                                    {
                                        arrayNum.map((n, i) => {
                                            return (
                                                <div key={`SkeletonFav-${i}`} className="animate-pulse h-10 w-16 md:w-32 lg:w-48 border-2 rounded-md mx-auto bg-gray-300" />
                                            );
                                        })
                                    }
                                </div>
                                :
                                Familias[0] !== undefined &&
                                <div className="flex gap-4 pt-4 pl-4 overflow-y-hidden">
                                    <button key={"Todos"} id={"Todos"} className="bg-blue-400 font-semibold hover:bg-blue-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                                        onClick={() => setProductosFiltrados(props.productos)}>Todos</button>
                                    {
                                        Familias.map(f => {
                                            return <button key={f} id={f} className="bg-blue-400 font-semibold hover:bg-blue-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                                                onClick={(e) => setProductosFiltrados(props.productos.filter(p => p.familia === e.currentTarget.id))}>{f}</button>
                                        })
                                    }
                                </div>
                        }
                        <div className="h-full overflow-hidden">
                            <ListaProductos productos={props.productos} productosFiltrados={ProductosFiltrados} ServerUp={props.serverOperativo} />
                        </div>
                    </div>
                </div>
                {/* Sidebar derecho */}
                <div className="h-screen">
                    <SidebarDerecho todosProductos={props.productos} productosEnCarrito={ProductosEnCarrito} setProductosCarrito={SetProductosEnCarrito} empleadoUsandoTPV={props.empleadoUsandoTPV} setShowModalAbrir={props.setShowModalAbrir} setShowModalCerrar={props.setShowModalCerrar} />
                </div>
            </div>
        </div>
    );
}

const ListaProductos = (props: { productos: Producto[], productosFiltrados: Producto[], ServerUp: boolean }) => {
    const { ProductosEnCarrito, SetProductosEnCarrito } = useProductEnCarritoContext();
    const maxItems = 30;

    if (props.ServerUp) {
        if (props.productos.length <= 0) {
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
                <div className="h-full overflow-y-auto overflow-x-hidden px-2">
                    <div className="grid gap-4 pb-3 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:grid-cols-5 text-xs">
                        {
                            props.productosFiltrados.slice(0, maxItems).map((prod: Producto) => {
                                return (
                                    <button key={prod._id} id={prod._id}
                                        onClick={() => {
                                            const prodEnCarrito = ProductosEnCarrito.find(p => p._id == prod._id);

                                            if (prodEnCarrito) {
                                                const prodIndex = ProductosEnCarrito.indexOf(prodEnCarrito);
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
                                                    dto: 0
                                                } as unknown as ProductoVendido;

                                                let ProductosEnCarritoUpdated = ProductosEnCarrito;
                                                ProductosEnCarritoUpdated[prodIndex] = prodAlCarrito;

                                                SetProductosEnCarrito([...ProductosEnCarritoUpdated]);
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
                                                    dto: 0
                                                } as unknown as ProductoVendido

                                                SetProductosEnCarrito([...ProductosEnCarrito, prodAlCarrito]);
                                            }
                                        }}>
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
            return (<ProductosNoEncontrados />)
        }
    }

    return (
        <div className="bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
            <div className="w-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <p className="text-xl">
                    FALLO DE CONEXIÓN
                    <br />
                    CON LA BBDD
                </p>
            </div>
        </div>
    );
}

const ProductosNoEncontrados = () => {
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
    );
}

const SidebarDerecho = React.memo((props: {
    todosProductos: Producto[], productosEnCarrito: ProductoVendido[],
    setProductosCarrito: React.Dispatch<React.SetStateAction<ProductoVendido[]>>, empleadoUsandoTPV: boolean,
    setShowModalCerrar: Function, setShowModalAbrir: Function
}) => {
    const { Empleado } = useEmpleadoContext();
    const [descuentoOpen, setDescuentoPupup] = useState<boolean>(false);
    const [dtoEfectivo, setDtoEfectivo] = useState<string>("0");
    const [dtoPorcentaje, setDtoPorcentaje] = useState<string>("0");

    const [showModalPagar, setPagarModal] = useState(false);
    const [PagoRapido, setPagoRapido] = useState<CustomerPaymentInformation>();
    const [Pago, setPago] = useState<CustomerPaymentInformation>();
    const [qrImage, setQrImage] = useState<string>();
    const [fecha, setFecha] = useState<string>();

    const [Clientes, SetClientes] = useState<Cliente[]>([]);
    const [jwt, setJwt] = useState<JWT>();
    const componentRef = useRef(null);

    useEffect(() => {
        let isUnmounted = false;

        setJwt(getJwt());
        FetchClientes().then((r) => {
            if (!isUnmounted) {
                SetClientes(r)
            }
        }).catch(() => {
            console.log("Error gus")
        });

        return () => {
            isUnmounted = true;
        }
    }, []);

    useEffect(() => {
        if (qrImage) {
            handlePrint();
        }
    }, [qrImage]);

    useEffect(() => {
        const pagoRapido = {
            cliente: Clientes.find((c) => c.nombre === "General"),
            cambio: 0,
            pagoEnEfectivo: precioTotal,
            pagoEnTarjeta: 0,
            precioTotal: precioTotalDescontado,
            dtoEfectivo: Number(dtoEfectivo),
            dtoPorcentaje: Number(dtoPorcentaje),
            tipo: TipoCobro.Rapido
        } as CustomerPaymentInformation;
        setPagoRapido(pagoRapido);

        const pago = {
            cliente: Clientes.find((c) => c.nombre === "General"),
            cambio: precioTotal * -1,
            pagoEnEfectivo: 0,
            pagoEnTarjeta: 0,
            precioTotal: precioTotalDescontado,
            dtoEfectivo: Number(dtoEfectivo),
            dtoPorcentaje: Number(dtoPorcentaje),
            tipo: TipoCobro.Efectivo
        } as CustomerPaymentInformation;
        setPago(pago);
    }, [props.productosEnCarrito, Clientes])

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const onAfterPrintHandler = React.useCallback(() => {
        props.setProductosCarrito([]);
        notifySuccess("Venta realizada correctamente")
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Ticket de venta",
        content: reactToPrintContent,
        onAfterPrint: onAfterPrintHandler
    });

    // Se accede a la lista de productos actualizada usando "functional state update" de react
    // Es para evitar muchos rerenders
    const SetPropiedadProd = useCallback((idProd: string, cantidad: string, dto: string) => {
        if (!IsPositiveIntegerNumber(cantidad.toString())) { return; }
        if (!IsPositiveFloatingNumber(dto.toString())) { return; }

        props.setProductosCarrito((prevCarrito) => {
            const prodEnCarrito = prevCarrito.find(p => p._id == idProd);

            if (prodEnCarrito) {

                if (Number(cantidad) === 0 && cantidad.toString() !== "") {
                    return prevCarrito.filter(p => p._id != idProd);
                }

                props.setProductosCarrito((prevCarrito) => {
                    const dtoAjustado = Number(dto) > 100 ? "100" : dto;
                    const prodIndex = prevCarrito.indexOf(prodEnCarrito);
                    const prodAlCarrito = {
                        _id: prodEnCarrito._id,
                        nombre: prodEnCarrito.nombre,
                        familia: prodEnCarrito.familia,
                        proveedor: prodEnCarrito.proveedor,
                        cantidadVendida: Number(cantidad),
                        ean: prodEnCarrito.ean,
                        iva: prodEnCarrito.iva,
                        margen: prodEnCarrito.margen,
                        precioCompra: prodEnCarrito.precioCompra,
                        precioVenta: prodEnCarrito.precioVenta,
                        dto: Number(dtoAjustado)
                    } as unknown as ProductoVendido;

                    let ProductosEnCarritoUpdated = prevCarrito;
                    ProductosEnCarritoUpdated[prodIndex] = prodAlCarrito;

                    // Actualiza la lista de productos en carrito
                    return [...ProductosEnCarritoUpdated];
                });
            }

            return [...prevCarrito]
        })
    }, []);

    const Vender = async (pagoCliente: CustomerPaymentInformation, productosEnCarrito: ProductoVendido[], emp: typeof Empleado, clientes: Cliente[], j: JWT) => {
        const { data, error } = await AddVenta(pagoCliente, productosEnCarrito, emp, clientes, j);

        if (!error) {
            setFecha(data.createdAt);
            setQrImage(await GenerateQrBase64(data._id));
        }
        else {
            setFecha(undefined);
            setQrImage(undefined);
            notifyError("Error al realizar la venta");
        }
    }

    const precioTotal: number = PrecioTotalCarrito(props.productosEnCarrito);
    const precioTotalDescontado: number = AplicarDescuentos(props.productosEnCarrito, Number(dtoEfectivo), Number(dtoPorcentaje));

    if (!PagoRapido?.cliente || !jwt) {
        return (
            <div className="h-full p-2">
                <div className="bg-white rounded-3xl shadow h-full">
                    <div className="flex flex-col gap-2 h-full justify-center opacity-25">
                        <div className="flex justify-center animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <p className="text-center">
                            CARGANDO...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full p-2">
            <div className="bg-white rounded-3xl shadow h-full resize-x">
                {/* En caso de carrito vacío o con productos */}
                {
                    props.productosEnCarrito.length <= 0 ?
                        <div className="grid grid-rows-2 grid-cols-1 h-full">
                            <div className="flex flex-col gap-2 justify-items-center justify-self-center opacity-25 self-end">
                                <div className="flex justify-center animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="self-center">
                                    CARRITO VACÍO
                                </p>
                            </div>
                            {
                                props.empleadoUsandoTPV ?
                                    <button className="flex gap-2 justify-center self-end pb-4" onClick={() => { props.setShowModalCerrar(true) }}>
                                        CERRAR CAJA
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </button>
                                    :
                                    <button className="flex gap-2 justify-center self-end pb-4" onClick={() => { props.setShowModalAbrir(true) }}>
                                        ABRIR CAJA
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </button>
                            }
                        </div>
                        :
                        <div className="flex flex-col h-full">
                            <div className="text-center">
                                <div className="grid grid-cols-2">
                                    <div className="pl-8 text-left text-lg py-4 relative">
                                        {/* Icono carrito */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <div className="text-center absolute text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3" />
                                        {` ${props.productosEnCarrito.length}`}
                                    </div>
                                    <div className="px-8 text-right text-lg py-4 relative">
                                        {/* Boton basura */}
                                        <button className="text-blue-gray-300 hover:text-red-700 focus:outline-none" onClick={() => { props.setProductosCarrito([]) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow gap-2 px-2 overflow-scroll overflow-x-hidden">
                                {/* Añadir producto al carrito (fila con información y cantidad)*/}
                                {
                                    <GenerarProductList productosEnCarrito={props.productosEnCarrito} setPropiedadProducto={SetPropiedadProd} />
                                }
                            </div>
                            <div className="text-center p-4 mb-4">
                                <div>
                                    {descuentoOpen &&
                                        <div className="h-auto border-t-2 border-2 p-2 border-blue-400 rounded-xl">
                                            <div className="flex text-left text-sm">
                                                <div className="flex self-center gap-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <div>
                                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoEfectivo" value={dtoEfectivo}
                                                            onChange={(e) => {
                                                                setDtoEfectivo(ValidatePositiveFloatingNumber(e.target.value));
                                                            }}
                                                        />
                                                        €
                                                    </div>
                                                </div>

                                                <div className="flex ml-auto gap-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    <div>
                                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoPorcentaje" value={dtoPorcentaje}
                                                            onChange={(e) => {
                                                                setDtoPorcentaje(ValidatePositiveFloatingNumber(e.target.value));
                                                            }}
                                                        />
                                                        %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="flex flex-col text-left text-lg font-semibold hover:text-blue-500 underline cursor-pointer" onClick={() => setDescuentoPupup(!descuentoOpen)}>
                                        Descuento
                                    </div>
                                </div>
                                <div className="flex mb-3 text-lg font-semibold">
                                    <div>Total</div>
                                    {
                                        precioTotal !== precioTotalDescontado ?
                                            <div className="flex gap-2 justify-end ml-auto">
                                                <div className="text-right w-full text-red-500 line-through">
                                                    {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                    {props.productosEnCarrito.length <= 0 ? 0.00 : precioTotal.toFixed(2)} €
                                                </div>
                                                <div className="text-right w-full">
                                                    {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                    {props.productosEnCarrito.length <= 0 ? 0.00 : precioTotalDescontado.toFixed(2)} €
                                                </div>
                                            </div>
                                            :
                                            <div className="text-right w-full">
                                                {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                {props.productosEnCarrito.length <= 0 ? 0.00 : precioTotal.toFixed(2)} €
                                            </div>
                                    }
                                </div>
                                {
                                    props.productosEnCarrito.length > 0 && !isNaN(precioTotal) &&
                                    <div className="grid grid-cols-1 gap-2 h-auto">
                                        <motion.button whileTap={{ scale: 0.9 }} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none" onClick={(e) => { setPagarModal(true) }}>PAGAR</motion.button>
                                        <motion.button whileTap={{ scale: 0.9 }} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none"
                                            onClick={async () => { await Vender(PagoRapido, props.productosEnCarrito, Empleado, Clientes, jwt); }}>
                                            COBRO RAPIDO
                                        </motion.button>
                                    </div>
                                }
                            </div>
                        </div>
                }
                {
                    qrImage && fecha &&
                    <div style={{ display: "none" }}>
                        <Ticket
                            ref={componentRef}
                            pagoCliente={PagoRapido}
                            productosVendidos={props.productosEnCarrito}
                            fecha={fecha}
                            qrImage={qrImage}
                        />
                    </div>
                }

                {/* Modal aceptar compra */}
                < AnimatePresence initial={false} exitBeforeEnter={true}>
                    {showModalPagar && Pago && <ModalPagar PagoCliente={Pago} handleModalOpen={setPagarModal} AllClientes={Clientes} />}
                </AnimatePresence>
            </div>
        </div >
    );
});

SidebarDerecho.displayName = 'SidebarDerecho';

const GenerarProductList = React.memo((props: { productosEnCarrito: ProductoVendido[], setPropiedadProducto: Function }) => {
    return (
        <>
            {
                props.productosEnCarrito.map((p: ProductoVendido) => {
                    return (
                        <ProductSelectedCard key={`${p._id}`} producto={p} setPropiedadProd={props.setPropiedadProducto} />
                    );
                })
            }
        </>
    );
});

GenerarProductList.displayName = 'GenerarProductList';

export default TPV;