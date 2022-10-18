import { AnimatePresence, motion, useTime } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useComprasAparcadasContext from "../../../../context/comprasAparcadas";
import useEmpleadoContext from "../../../../context/empleadoContext";
import useProductEnCarritoContext from "../../../../context/productosEnCarritoContext";
import useTpvContext from "../../../../context/tpvContext";
import { Cliente } from "../../../../tipos/Cliente";
import { CustomerPaymentInformation } from "../../../../tipos/CustomerPayment";
import { SesionEmpleado } from "../../../../tipos/Empleado";
import { TipoCobro } from "../../../../tipos/Enums/TipoCobro";
import { Producto } from "../../../../tipos/Producto";
import { ProductoVendido } from "../../../../tipos/ProductoVendido";
import { Venta } from "../../../../tipos/Venta";
import { FetchClientes } from "../../../../utils/fetches/clienteFetches";
import { AddVenta, FetchVentaByQuery } from "../../../../utils/fetches/ventasFetches";
import GenerateQrBase64 from "../../../../utils/generateQr";
import { AplicarDescuentos, PrecioTotalCarrito } from "../../../../utils/preciosUtils";
import { notifyError, notifySuccess } from "../../../../utils/toastify";
import { IsPositiveFloatingNumber, IsPositiveIntegerNumber, ValidatePositiveFloatingNumber } from "../../../../utils/validator";
import GuardarCompra from "../../../modal/guardarCompra";
import Ofertar from "../../../modal/ofertar";
import ModalPagar from "../../../modal/pagar";
import TransferirTpv from "../../../modal/transferirTpv";
import VerComprasAparcadas from "../../../modal/verComprasAparcadas";
import Ticket from "../../../printable/ticket";
import { ProductSelectedCard } from "../productCard";

const SidebarDerecho = React.memo((props: {
    productos: Producto[], setProductosCarrito: React.Dispatch<React.SetStateAction<ProductoVendido[]>>, inputRef?: any
}) => {
    const { ProductosEnCarrito, SetProductosEnCarrito } = useProductEnCarritoContext();
    const { Empleado } = useEmpleadoContext();
    const [DescuentoOpen, setDescuentoPopup] = useState<boolean>(false);
    const [OfertaOpen, setOfertaPopup] = useState<boolean>(false);
    const { DtoEfectivo, SetDtoEfectivo, DtoPorcentaje, SetDtoPorcentaje } = useProductEnCarritoContext()
    const [PrecioTotal, setPrecioTotal] = useState<number>(PrecioTotalCarrito(ProductosEnCarrito));
    const [PrecioTotalFinal, setPrecioTotalFinal] = useState<number>(AplicarDescuentos(ProductosEnCarrito, Number(DtoEfectivo), Number(DtoPorcentaje)));
    const [isVentaValida, setIsVentaValida] = useState<boolean>(false)
    const { ComprasAparcadasMap } = useComprasAparcadasContext();

    const [showModalPagar, setPagarModal] = useState(false);
    const [showModalTransferir, setTransferirModal] = useState(false);
    const [showRecuperarVentas, setRecuperarVentas] = useState(false);
    const [showModalSaveCompra, setSaveCompra] = useState(false);
    const [PagoRapido, setPagoRapido] = useState<CustomerPaymentInformation>();
    const [Pago, setPago] = useState<CustomerPaymentInformation>();
    const [qrImage, setQrImage] = useState<string>();
    const [VentaResultante, setVenta] = useState<Venta>();

    const [Clientes, SetClientes] = useState<Cliente[]>([]);
    const componentRef = useRef(null);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false)

    const { EmpleadoUsingTPVState, AbrirCajaState, CerrarCajaState } = useTpvContext()

    useEffect(() => {
        let isUnmounted = false;

        FetchClientes().then((r) => {
            if (!isUnmounted) {
                SetClientes(r)
            }
        }).catch((err) => {
            console.log(err)
        });

        return () => {
            isUnmounted = true;
        }
    }, []);

    useEffect(() => {
        for (let i = 0; i < ProductosEnCarrito.length; i++) {
            if (ProductosEnCarrito[i].cantidadVendida <= 0) {
                setIsVentaValida(false)
                return;
            }
            if (Number(ProductosEnCarrito[i].precioVenta) <= 0) {
                setIsVentaValida(false)
                return;
            }
        }
        setIsVentaValida(true)
    }, [ProductosEnCarrito])

    useEffect(() => {
        if (VentaResultante) {
            handlePrint();
        }
    }, [VentaResultante]);

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
        setButtonDisabled(false)
        props.inputRef?.current?.focus();
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Ticket de venta",
        content: reactToPrintContent,
        onAfterPrint: onAfterPrintHandler
    });

    // Se accede a la lista de productos actualizada usando "functional state update" de react
    // Es para evitar muchos rerenders
    const SetPropiedadProd = useCallback((idProd: string, cantidad: string, dto: string, precioVenta?: string) => {
        if (!IsPositiveIntegerNumber(String(cantidad))) { return; }
        if (!IsPositiveFloatingNumber(dto)) { return; }

        props.setProductosCarrito((prevCarrito) => {
            const prodEnCarrito = prevCarrito.find(p => p._id == idProd);
            if (prodEnCarrito) {
                if (Number(cantidad) === 0 && cantidad !== "") {
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
                        precioFinal: Number(prodEnCarrito.precioVenta) * ((100 - Number(dtoAjustado)) / 100),
                        dto: Number(dtoAjustado)
                    } as unknown as ProductoVendido;

                    if (precioVenta !== undefined) {
                        prodAlCarrito.precioVenta = String(precioVenta)
                    }

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
        try {
            setButtonDisabled(true)
            if (!emp.TPV) {
                throw "Error en la autenticación y el uso de la TPV";
            }

            const { data, error } = await AddVenta(pagoCliente, productosEnCarrito, emp, clientes, emp.TPV);

            if (!error && data) {
                const abortController = new AbortController();
                setQrImage(await GenerateQrBase64(data._id, abortController));
                setVenta((await FetchVentaByQuery(data._id))[0]);
            }
            else {
                setQrImage(undefined);
                setVenta(undefined);
                notifyError("Error al realizar la venta");
            }
        }
        catch (e) {
            console.log(e);
            setButtonDisabled(false)
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
                            Cargando...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (ProductosEnCarrito.length <= 0) {
        return (
            <div className="bg-white grid grid-rows-2 grid-cols-1 h-full rounded-3xl shadow">
                <div className="flex flex-col gap-2 justify-items-center justify-self-center opacity-25 self-end">
                    <div className="flex justify-center animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <p className="self-center">
                        Carrito vacío
                    </p>
                </div>
                <div className="flex flex-col gap-2 items-center justify-end text-gray-500">
                    {
                        ComprasAparcadasMap.size > 0 &&
                        <button className="flex gap-2" onClick={() => setRecuperarVentas(true)}>
                            Recuperar ventas
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    }
                    {
                        EmpleadoUsingTPVState.isEmpleadoUsingTPV ?
                            <div className="flex flex-col w-full items-center gap-2 pb-6">
                                <button className="flex gap-2 hover:text-blue-500" onClick={() => { CerrarCajaState.setShowCerrarCajaModal(true) }}>
                                    Cerrar caja
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button className="flex gap-2 hover:text-blue-500" onClick={() => { setTransferirModal(true) }}>
                                    Transferir caja
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10 4.5c1.215 0 2.417.055 3.604.162a.68.68 0 01.615.597c.124 1.038.208 2.088.25 3.15l-1.689-1.69a.75.75 0 00-1.06 1.061l2.999 3a.75.75 0 001.06 0l3.001-3a.75.75 0 10-1.06-1.06l-1.748 1.747a41.31 41.31 0 00-.264-3.386 2.18 2.18 0 00-1.97-1.913 41.512 41.512 0 00-7.477 0 2.18 2.18 0 00-1.969 1.913 41.16 41.16 0 00-.16 1.61.75.75 0 101.495.12c.041-.52.093-1.038.154-1.552a.68.68 0 01.615-.597A40.012 40.012 0 0110 4.5zM5.281 9.22a.75.75 0 00-1.06 0l-3.001 3a.75.75 0 101.06 1.06l1.748-1.747c.042 1.141.13 2.27.264 3.386a2.18 2.18 0 001.97 1.913 41.533 41.533 0 007.477 0 2.18 2.18 0 001.969-1.913c.064-.534.117-1.071.16-1.61a.75.75 0 10-1.495-.12c-.041.52-.093 1.037-.154 1.552a.68.68 0 01-.615.597 40.013 40.013 0 01-7.208 0 .68.68 0 01-.615-.597 39.785 39.785 0 01-.25-3.15l1.689 1.69a.75.75 0 001.06-1.061l-2.999-3z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            :
                            <button className="flex gap-2 hover:text-blue-500 w-full h-20 items-center justify-center" onClick={() => { AbrirCajaState.setShowAbrirCajaModal(true) }}>
                                Abrir caja
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z" clipRule="evenodd" />
                                </svg>
                            </button>
                    }
                </div>
                <AnimatePresence>
                    {showRecuperarVentas && <VerComprasAparcadas setModal={setRecuperarVentas} />}
                    {showModalTransferir && <TransferirTpv setModal={setTransferirModal} />}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-start items-center rounded-3xl bg-white shadow h-full max-h-full">
            <div className="flex justify-around items-center w-full h-20">
                <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {` ${ProductosEnCarrito.length}`}
                </div>
                <div className="flex justify-center text-blue-gray-300 hover:text-orange-500 focus:outline-none cursor-pointer w-10" onClick={() => { setSaveCompra(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </div>
                <div className="flex justify-center text-blue-gray-300 hover:text-red-500 focus:outline-none cursor-pointer w-10" onClick={() => { props.setProductosCarrito([]) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
            <div className="h-full w-full p-2 overflow-y-scroll overflow-x-hidden">
                <GenerarProductList productosEnCarrito={ProductosEnCarrito} setPropiedadProducto={SetPropiedadProd} />
            </div>
            <div className="h-1/3 xl:h-1/4 p-3 w-full">
                <div className="relative">
                    {DescuentoOpen &&
                        <div className="w-full absolute block bg-blue-200 duration-300 transform -translate-y-16 top-4 z-10 origin-[0] border-t-2 border-2 border-blue-400 rounded-lg p-2">
                            <div className="flex w-full items-center justify-center text-sm">
                                <div className="flex self-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <div>
                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoEfectivo" value={DtoEfectivo}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => {
                                                SetDtoEfectivo(ValidatePositiveFloatingNumber(e.target.value));
                                            }}
                                        />
                                        €
                                    </div>
                                </div>

                                <div className="flex ml-auto gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <div>
                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoPorcentaje" value={DtoPorcentaje}
                                            onClick={(e) => e.stopPropagation()}
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
                    <div className="w-full flex justify-between text-left text-lg font-semibold">
                        <div className="hover:text-blue-500 underline cursor-pointer" onClick={() => setDescuentoPopup(!DescuentoOpen)}>
                            Descuento
                        </div>
                        {
                            PrecioTotal === PrecioTotalFinal &&
                            <div className="hover:text-blue-500 underline cursor-pointer" onClick={() => setOfertaPopup(!OfertaOpen)}>
                                Ofertas
                            </div>
                        }
                    </div>
                </div>
                <div className="flex text-lg font-semibold">
                    <div>Total</div>
                    {
                        PrecioTotal !== PrecioTotalFinal ?
                            <div className="flex gap-2 justify-end ml-auto">
                                <div className="text-right w-full text-red-500 line-through">
                                    {ProductosEnCarrito.length <= 0 ? 0.00 : PrecioTotal.toFixed(2)} €
                                </div>
                                <div className="text-right w-full">
                                    {ProductosEnCarrito.length <= 0 ? 0.00 : PrecioTotalFinal.toFixed(2)} €
                                </div>
                            </div>
                            :
                            <div className="text-right w-full">
                                {ProductosEnCarrito.length <= 0 ? 0.00 : PrecioTotal.toFixed(2)} €
                            </div>
                    }
                </div>
                {
                    !isNaN(PrecioTotal) &&
                    <div className="flex flex-col w-full gap-2">
                        {
                            PrecioTotal > 0 &&
                                !isButtonDisabled &&
                                isVentaValida ?
                                <>
                                    <motion.button disabled={isButtonDisabled} whileTap={{ scale: 0.9 }} className={`bg-blue-500 h-10 xl:h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none`} onClick={(e) => { setPagarModal(true) }}>
                                        PAGAR
                                    </motion.button>
                                    <motion.button disabled={isButtonDisabled} whileTap={{ scale: 0.9 }} className="bg-blue-500 h-10 xl:h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none"
                                        onClick={async () => { await Vender(PagoRapido, ProductosEnCarrito, Empleado, Clientes); }}>
                                        COBRO RAPIDO
                                    </motion.button>
                                </>
                                :
                                <>
                                    <motion.button className={`bg-blue-400 h-10 xl:h-12 shadow rounded-lg text-white focus:outline-none`}
                                        onClick={() => notifyError("No se puede realizar una venta con un producto de 0.00€")}>
                                        PAGAR
                                    </motion.button>
                                    <motion.button className="bg-blue-400 h-10 xl:h-12 shadow rounded-lg text-white focus:outline-none"
                                        onClick={() => notifyError("No se puede realizar una venta con un producto de 0.00€")}>
                                        COBRO RAPIDO
                                    </motion.button>
                                </>
                        }

                    </div>
                }
                <AnimatePresence>
                    {showModalPagar && Pago && <ModalPagar PagoCliente={Pago} handleModalOpen={setPagarModal} AllClientes={Clientes} inputRef={props.inputRef} />}
                    {showModalSaveCompra && <GuardarCompra compraActual={ProductosEnCarrito} setCompraActual={SetProductosEnCarrito} setModal={setSaveCompra} />}
                    {OfertaOpen && <Ofertar setModal={setOfertaPopup} productos={props.productos} />}
                </AnimatePresence>
            </div>
            {
                VentaResultante &&
                PagoRapido &&
                <div style={{ display: "none" }}>
                    <Ticket
                        ref={componentRef}
                        pagoCliente={PagoRapido}
                        productosVendidos={ProductosEnCarrito}
                        qrImage={qrImage}
                        venta={VentaResultante}
                    />
                </div>
            }
        </div>
    );
});

SidebarDerecho.displayName = 'SidebarDerecho';
export default SidebarDerecho;

const GenerarProductList = React.memo((props: { productosEnCarrito: ProductoVendido[], setPropiedadProducto: Function }) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        if (messagesEndRef.current == null) { return }
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [props.productosEnCarrito]);

    return (
        <div className="flex flex-col h-full gap-2">
            {
                props.productosEnCarrito.map((p: ProductoVendido) => {
                    return (
                        <div key={`${p._id}`} ref={messagesEndRef}>
                            <ProductSelectedCard producto={p} setPropiedadProd={props.setPropiedadProducto} />
                        </div>
                    );
                })
            }

        </div>
    );
});

GenerarProductList.displayName = 'GenerarProductList';