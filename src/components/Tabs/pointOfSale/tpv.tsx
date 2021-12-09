import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { ApplyDtoCash, ApplyDtoPercentage, IsPositiveFloatingNumber, IsPositiveIntegerNumber, ValidatePositiveFloatingNumber, ValidatePositiveIntegerNumber, ValidateString } from "../../../pages/api/validator";
import { Client } from "../../../tipos/Client";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { Producto } from "../../../tipos/Producto";
import { TipoCobro } from "../../../tipos/Enums/TipoCobro";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { ModalPagar, ModalResumenCompra } from "../../modal/modal";
import { ProductCard, ProductSelectedCard } from "./productCard";

const TPV = (props: { productos: Producto[], clientes: Client[] }) => {
    const [Busqueda, setBusqueda] = useState<string>("");
    const [Clientes,] = useState<Client[]>(props.clientes);
    const [Productos,] = useState<Producto[]>(props.productos);
    const [ProductosFiltrados, setProductosFiltrados] = useState<Producto[]>(props.productos);
    const [ProductosEnCarrito, setProductosEnCarrito] = useState<ProductoVendido[]>([]);
    const [Familias, setFamilias] = useState<string[]>([]);

    useEffect(() => {
        function uniq_fast(a: Producto[]) {
            var seenMap: Map<string, number> = new Map();
            var out: string[] = [];
            var len = a.length;
            var j = 0;
            for (var i = 0; i < len; i++) {
                var item = a[i].familia;
                if (!seenMap.has(item)) {
                    seenMap.set(item, 1);
                    out[j++] = item;
                }
            }
            return out;
        }
        setFamilias(uniq_fast(Productos));
    }, [Productos]);

    var Filtrar = (cadena: string) => {
        const stringValidated = ValidateString(cadena);

        if (stringValidated) {
            setBusqueda(stringValidated);

            const pFiltrados = Productos.filter((p: Producto) => { p.nombre.toUpperCase().includes(stringValidated.toUpperCase()) || p.ean.includes(stringValidated) });
            setProductosFiltrados(pFiltrados);
        }
        else { return; }
    }

    return (
        <div className="h-screen antialiased overflow-hidden text-gray-800">
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
                            <input onChange={(e) => { Filtrar(e.target.value); }} value={Busqueda} autoFocus={true} className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Buscar producto o código de barras..." />
                        </div>

                        {/* Genera los botones de favorito */}
                        {
                            Familias[0] !== undefined &&
                            <div className="grid grid-rows-1 gap-2 m-4 grid-flow-col overflow-y-hidden">
                                <button key={"Todos"} id={"Todos"} className="bg-blue-400 font-semibold hover:bg-yellow-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                                    onClick={() => setProductosFiltrados(Productos)}>Todos</button>
                                {
                                    Familias.map(f => {
                                        return <button key={f} id={f} className="bg-blue-400 font-semibold hover:bg-yellow-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                                            onClick={(e) => setProductosFiltrados(Productos.filter(p => p.familia === e.currentTarget.id))}>{f}</button>
                                    })
                                }
                            </div>
                        }

                        <div className="h-full overflow-hidden pt-2">
                            <div className="h-full overflow-y-auto overflow-x-hidden px-2">
                                {/* Base de datos vacía o con productos*/}
                                {
                                    Productos.length === 0 ?
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
                                        :
                                        ProductosFiltrados.length <= 0 ?
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
                                            :
                                            <div>
                                                <div className="grid gap-4 pb-3 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:grid-cols-5 text-xs">
                                                    {ProductosFiltrados.map((prod: Producto) => {
                                                        return (
                                                            <button key={prod._id} id={prod._id}
                                                                onClick={() => {
                                                                    const prodEnCarrito = ProductosEnCarrito.find(p => p.producto._id == prod._id);

                                                                    if (prodEnCarrito) {
                                                                        const prodIndex = ProductosEnCarrito.indexOf(prodEnCarrito);
                                                                        const prodAlCarrito = {
                                                                            producto: prodEnCarrito.producto,
                                                                            cantidad: (Number(prodEnCarrito.cantidad) + 1).toString(),
                                                                            dto: prodEnCarrito.dto
                                                                        } as ProductoVendido;

                                                                        let ProductosEnCarritoUpdated = ProductosEnCarrito;
                                                                        ProductosEnCarritoUpdated[prodIndex] = prodAlCarrito;

                                                                        setProductosEnCarrito([...ProductosEnCarritoUpdated]);
                                                                    }
                                                                    else {
                                                                        const prodAlCarrito = {
                                                                            producto: prod,
                                                                            cantidad: "1",
                                                                            dto: "0"
                                                                        } as ProductoVendido

                                                                        setProductosEnCarrito([...ProductosEnCarrito, prodAlCarrito]);
                                                                    }
                                                                }}>
                                                                <ProductCard _id={prod._id} alta={prod.alta} descripcion={prod.descripcion} ean={prod.ean} familia={prod.familia}
                                                                    nombre={prod.nombre} precioVenta={prod.precioVenta} img={prod.img}
                                                                    iva={prod.iva} precioCompra={prod.precioCompra} tags={prod.tags} cantidad={prod.cantidad} promociones={prod.promociones} />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Menú tienda */}
                {/* Sidebar derecho */}
                <div className="m-4">
                    <SidebarDerecho todosProductos={Productos} productosEnCarrito={ProductosEnCarrito} setProductosCarrito={setProductosEnCarrito} clientes={Clientes} />
                </div>
            </div>
        </div>
    );
}

const SidebarDerecho = React.memo((props: { todosProductos: Producto[], productosEnCarrito: ProductoVendido[], clientes: Client[], setProductosCarrito: React.Dispatch<React.SetStateAction<ProductoVendido[]>> }) => {
    const [descuentoOpen, setDescuentoPupup] = useState<boolean>(false);
    const [dtoEfectivo, setDtoEfectivo] = useState<string>("0");
    const [dtoPorcentaje, setDtoPorcentaje] = useState<string>("0");

    const [showModalPagar, setPagarModal] = useState(false);
    const [showModalCobro, setCobroModal] = useState(false);

    const cerrarModal = () => {
        setPagarModal(false);
    }

    const cerrarModalResumen = () => {
        setCobroModal(false);
    }

    // Se accede a la lista de productos actualizada usando "functional state update" de react
    const SetPropiedadProd = useCallback((idProd: string, cantidad: string, dto: string) => {
        if (!IsPositiveIntegerNumber(cantidad.toString())) { return; }
        if (!IsPositiveFloatingNumber(dto.toString())) { return; }

        props.setProductosCarrito((prevCarrito) => {
            const prodEnCarrito = prevCarrito.find(p => p.producto._id == idProd);

            if (prodEnCarrito) {

                if (Number(cantidad) === 0 && cantidad.toString() !== "") {
                    return prevCarrito.filter(p => p.producto._id != idProd);
                }

                props.setProductosCarrito((prevCarrito) => {
                    const dtoAjustado = Number(dto) > 100 ? "100" : dto;
                    const prodIndex = prevCarrito.indexOf(prodEnCarrito);
                    const prodAlCarrito = {
                        producto: prodEnCarrito.producto,
                        cantidad: cantidad,
                        dto: dtoAjustado.toString()
                    } as ProductoVendido;

                    let ProductosEnCarritoUpdated = prevCarrito;
                    ProductosEnCarritoUpdated[prodIndex] = prodAlCarrito;

                    // Actualiza la lista de productos en carrito
                    return [...ProductosEnCarritoUpdated];
                });
            }

            return [...prevCarrito]
        })
    }, []);

    const precioTotal: number = props.productosEnCarrito.reduce((total: number, p: ProductoVendido) => {
        if (p.dto) {
            return total += ((100 - Number(p.dto)) / 100) * (Number(p.cantidad) * p.producto.precioVenta);
        }
        else {
            return total += (Number(p.cantidad) * p.producto.precioVenta);
        }
    }, 0)

    const clienteGeneral = props.clientes.find(c => c.nif == "General");
    const pagoRapido: CustomerPaymentInformation = { cliente: clienteGeneral, cambio: 0, pagoEnEfectivo: precioTotal, pagoEnTarjeta: 0, precioTotal: precioTotal, tipo: TipoCobro.Rapido } as CustomerPaymentInformation;

    return (
        <div className="bg-white rounded-3xl shadow">
            {/* En caso de carrito vacío o con productos */}
            {
                props.productosEnCarrito.length <= 0 ?
                    <div className="grid grid-rows-2 grid-cols-1 h-screen p-4">
                        <div className="grid grid-rows-2 grid-cols-1 justify-items-center justify-self-center opacity-25 self-end">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="self-center">
                                CARRITO VACÍO
                            </p>
                        </div>

                        <div className="row-start-6 row-end-7 flex mb-3 text-lg font-semibold self-end">
                            <button className="flex gap-2">
                                Cerrar caja
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </button>

                            <button className="flex gap-2">
                                Imprimir recibo
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col h-screen mb-4">
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
                                    HayDescuento(dtoEfectivo, dtoPorcentaje) ?
                                        <div className="flex gap-2 justify-end ml-auto">
                                            <div className="text-right w-full text-red-500 line-through">
                                                {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                {props.productosEnCarrito.length <= 0 ? 0.00 : precioTotal.toFixed(2)} €
                                            </div>
                                            <div className="text-right w-full">
                                                {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                {props.productosEnCarrito.length <= 0 ? 0.00 : ApplyDtoPercentage(ApplyDtoCash(precioTotal, Number(dtoEfectivo)), Number(dtoPorcentaje)).toFixed(2)} €
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
                                    <motion.button whileTap={{ scale: 0.9 }} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none" onClick={(e) => { setCobroModal(true) }}>COBRO RAPIDO</motion.button>
                                </div>
                            }
                        </div>
                    </div>
            }
            {/* Modal aceptar compra */}
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {showModalPagar && <ModalPagar handleCerrarModal={cerrarModal} productosComprados={props.productosEnCarrito} precioFinal={precioTotal} clientes={props.clientes} />}
                {showModalCobro && <ModalResumenCompra pagoCliente={pagoRapido} handleClose={cerrarModalResumen} productosComprados={props.productosEnCarrito} />}
            </AnimatePresence>
        </div>
    );
});

const GenerarProductList = React.memo((props: { productosEnCarrito: ProductoVendido[], setPropiedadProducto: Function }) => {
    return (
        <>
            {
                props.productosEnCarrito.map((p: ProductoVendido) => {
                    return (
                        <ProductSelectedCard key={`${p.producto._id}`} cantidad={p.cantidad} dto={p.dto}
                            producto={p.producto} setPropiedadProd={props.setPropiedadProducto} />
                    );
                })
            }
        </>
    );
});

function HayDescuento(DtoEfectivo: string, DtoPorcentaje: string): boolean {
    // Si el descuento efectivo o el descuento por porcentaje es diferente de cero 
    // es decir, si se aplica descuento de alguna forma, devuelve true
    return (DtoEfectivo != "" && DtoEfectivo != "0" && DtoEfectivo != "0.00") || (DtoPorcentaje != "" && DtoPorcentaje != "0" && DtoPorcentaje != "0.00");
}

export default TPV;