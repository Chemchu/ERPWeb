import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useEmpleadoContext from "../../../../context/empleadoContext";
import useProductEnCarritoContext from "../../../../context/productosEnCarritoContext";
import { Cliente } from "../../../../tipos/Cliente";
import { CustomerPaymentInformation } from "../../../../tipos/CustomerPayment";
import { SesionEmpleado } from "../../../../tipos/Empleado";
import { TipoCobro } from "../../../../tipos/Enums/TipoCobro";
import { Producto } from "../../../../tipos/Producto";
import { ProductoVendido } from "../../../../tipos/ProductoVendido";
import { FetchClientes } from "../../../../utils/fetches/clienteFetches";
import { AddVenta } from "../../../../utils/fetches/ventasFetches";
import GenerateQrBase64 from "../../../../utils/generateQr";
import { AplicarDescuentos, PrecioTotalCarrito } from "../../../../utils/preciosUtils";
import { notifyError, notifySuccess } from "../../../../utils/toastify";
import { IsPositiveFloatingNumber, IsPositiveIntegerNumber, ValidatePositiveFloatingNumber } from "../../../../utils/validator";
import ModalPagar from "../../../modal/pagar";
import Ticket from "../../../printable/ticket";
import { ProductSelectedCard } from "../productCard";

const SidebarDerecho = React.memo((props: {
    setProductosCarrito: React.Dispatch<React.SetStateAction<ProductoVendido[]>>, empleadoUsandoTPV: boolean,
    setShowModalCerrar: Function, setShowModalAbrir: Function
}) => {
    const { ProductosEnCarrito, SetProductosEnCarrito } = useProductEnCarritoContext();
    const { Empleado } = useEmpleadoContext();
    const [DescuentoOpen, setDescuentoPupup] = useState<boolean>(false);
    const { DtoEfectivo, SetDtoEfectivo, DtoPorcentaje, SetDtoPorcentaje } = useProductEnCarritoContext()
    const [PrecioTotal, setPrecioTotal] = useState<number>(PrecioTotalCarrito(ProductosEnCarrito));
    const [PrecioTotalFinal, setPrecioTotalFinal] = useState<number>(AplicarDescuentos(ProductosEnCarrito, Number(DtoEfectivo), Number(DtoPorcentaje)));

    const [showModalPagar, setPagarModal] = useState(false);
    const [PagoRapido, setPagoRapido] = useState<CustomerPaymentInformation>();
    const [Pago, setPago] = useState<CustomerPaymentInformation>();
    const [qrImage, setQrImage] = useState<string>();
    const [Fecha, setFecha] = useState<string>();

    const [Clientes, SetClientes] = useState<Cliente[]>([]);
    const componentRef = useRef(null);

    useEffect(() => {
        let isUnmounted = false;

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
        setPrecioTotal(PrecioTotalCarrito(ProductosEnCarrito));
        setPrecioTotalFinal(AplicarDescuentos(ProductosEnCarrito, Number(DtoEfectivo), Number(DtoPorcentaje)));
    }, [ProductosEnCarrito, DtoEfectivo, DtoPorcentaje])

    useEffect(() => {
        const pagoRapido = {
            cliente: Clientes.find((c) => c.nombre === "General"),
            cambio: 0,
            pagoEnEfectivo: PrecioTotalFinal,
            pagoEnTarjeta: 0,
            precioTotalSinDto: PrecioTotal,
            precioTotal: PrecioTotalFinal,
            dtoEfectivo: Number(DtoEfectivo),
            dtoPorcentaje: Number(DtoPorcentaje),
            tipo: TipoCobro.Rapido
        } as CustomerPaymentInformation;
        setPagoRapido(pagoRapido);

        const pago = {
            cliente: Clientes.find((c) => c.nombre === "General"),
            cambio: PrecioTotalFinal * -1,
            pagoEnEfectivo: 0,
            pagoEnTarjeta: 0,
            precioTotalSinDto: PrecioTotal,
            precioTotal: PrecioTotalFinal,
            dtoEfectivo: Number(DtoEfectivo),
            dtoPorcentaje: Number(DtoPorcentaje),
            tipo: TipoCobro.Efectivo
        } as CustomerPaymentInformation;
        setPago(pago);
    }, [Clientes, PrecioTotalFinal])

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
        if (!IsPositiveIntegerNumber(String(cantidad))) { return; }
        if (!IsPositiveFloatingNumber(dto)) { return; }

        props.setProductosCarrito((prevCarrito) => {
            const prodEnCarrito = prevCarrito.find(p => p._id == idProd);

            if (prodEnCarrito) {
                if (Number(cantidad) === 0) {
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
                        precioFinal: prodEnCarrito.precioVenta * ((100 - Number(dtoAjustado)) / 100),
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

    const Vender = async (pagoCliente: CustomerPaymentInformation, productosEnCarrito: ProductoVendido[], emp: SesionEmpleado, clientes: Cliente[]) => {
        if (!emp.TPV) {
            throw "Error en la autenticación y el uso de la TPV";
        }

        const { data, error } = await AddVenta(pagoCliente, productosEnCarrito, emp, clientes, emp.TPV);

        if (!error) {
            const abortController = new AbortController();
            setFecha(data.createdAt);
            setQrImage(await GenerateQrBase64(data._id, abortController));
        }
        else {
            setFecha(undefined);
            setQrImage(undefined);
            notifyError("Error al realizar la venta");
        }
    }

    if (!PagoRapido?.cliente || !Empleado) {
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
                    ProductosEnCarrito.length <= 0 ?
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
                                        {` ${ProductosEnCarrito.length}`}
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
                                    <GenerarProductList productosEnCarrito={ProductosEnCarrito} setPropiedadProducto={SetPropiedadProd} />
                                }
                            </div>
                            <div className="text-center p-4 mb-4">
                                <div>
                                    {DescuentoOpen &&
                                        <div className="h-auto border-t-2 border-2 p-2 border-blue-400 rounded-xl">
                                            <div className="flex text-left text-sm">
                                                <div className="flex self-center gap-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <div>
                                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoEfectivo" value={DtoEfectivo}
                                                            onChange={(e) => {
                                                                SetDtoEfectivo(ValidatePositiveFloatingNumber(e.target.value));
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
                                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoPorcentaje" value={DtoPorcentaje}
                                                            onChange={(e) => {
                                                                SetDtoPorcentaje(ValidatePositiveFloatingNumber(e.target.value));
                                                            }}
                                                        />
                                                        %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="flex flex-col text-left text-lg font-semibold hover:text-blue-500 underline cursor-pointer" onClick={() => setDescuentoPupup(!DescuentoOpen)}>
                                        Descuento
                                    </div>
                                </div>
                                <div className="flex mb-3 text-lg font-semibold">
                                    <div>Total</div>
                                    {
                                        PrecioTotal !== PrecioTotalFinal ?
                                            <div className="flex gap-2 justify-end ml-auto">
                                                <div className="text-right w-full text-red-500 line-through">
                                                    {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                    {ProductosEnCarrito.length <= 0 ? 0.00 : PrecioTotal.toFixed(2)} €
                                                </div>
                                                <div className="text-right w-full">
                                                    {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                    {ProductosEnCarrito.length <= 0 ? 0.00 : PrecioTotalFinal.toFixed(2)} €
                                                </div>
                                            </div>
                                            :
                                            <div className="text-right w-full">
                                                {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                                {ProductosEnCarrito.length <= 0 ? 0.00 : PrecioTotal.toFixed(2)} €
                                            </div>
                                    }
                                </div>
                                {
                                    ProductosEnCarrito.length > 0 &&
                                    !isNaN(PrecioTotal) &&
                                    <div className="grid grid-cols-1 gap-2 h-auto">
                                        <motion.button whileTap={{ scale: 0.9 }} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none" onClick={(e) => { setPagarModal(true) }}>PAGAR</motion.button>
                                        <motion.button whileTap={{ scale: 0.9 }} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none"
                                            onClick={async () => { await Vender(PagoRapido, ProductosEnCarrito, Empleado, Clientes); }}>
                                            COBRO RAPIDO
                                        </motion.button>
                                    </div>
                                }
                            </div>
                        </div>
                }
                {
                    qrImage && Fecha &&
                    <div style={{ display: "none" }}>
                        <Ticket
                            ref={componentRef}
                            pagoCliente={PagoRapido}
                            productosVendidos={ProductosEnCarrito}
                            fecha={Fecha}
                            qrImage={qrImage}
                        />
                    </div>
                }

                {/* Modal aceptar compra */}
                {showModalPagar && Pago && <ModalPagar PagoCliente={Pago} handleModalOpen={setPagarModal} AllClientes={Clientes} />}
            </div>
        </div >
    );
});

SidebarDerecho.displayName = 'SidebarDerecho';
export default SidebarDerecho;

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