import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { TPVType } from "../../../tipos/TPV";
import { Venta } from "../../../tipos/Venta";
import { In } from "../../../utils/animations";
import { FetchTPV } from "../../../utils/fetches/tpvFetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import Ticket from "../../printable/ticket";
import { Backdrop } from "../backdrop";
import DevolverVenta from "../devolucionModal/devolverVenta";

const VerVenta = (props: { venta: Venta | undefined, setModal: Function }) => {
    const [tpv, setTpv] = useState<TPVType>();
    const componentRef = useRef(null);
    const [PagoDelCliente, setPago] = useState<CustomerPaymentInformation>();
    const [qrImage, setQrImage] = useState<string>();
    const [showDevolverModal, setShowDevolverModal] = useState<boolean>(false);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Ticket de venta",
        content: reactToPrintContent,
    });

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            if (!props.venta) {
                return;
            }

            try {
                const pago = {
                    cambio: props.venta.cambio,
                    cliente: props.venta.cliente,
                    dtoEfectivo: props.venta.descuentoEfectivo,
                    dtoPorcentaje: props.venta.descuentoPorcentaje,
                    pagoEnEfectivo: props.venta.dineroEntregadoEfectivo,
                    pagoEnTarjeta: props.venta.dineroEntregadoTarjeta,
                    precioTotal: props.venta.precioVentaTotal,
                    tipo: props.venta.tipo
                } as CustomerPaymentInformation

                const tpvRes = await FetchTPV(props.venta.tpv, abortController);
                const qr = await GenerateQrBase64(props.venta._id, abortController);
                setQrImage(qr);
                setTpv(tpvRes);
                setPago(pago);
            }
            catch (e) { console.log(e) }
        }
        fetchData();

        return () => {
            abortController.abort();
        }
    }, [])


    if (!props.venta) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full w-full ">
                <Backdrop onClick={() => { props.setModal(false) }}>
                    <motion.div className="h-5/6 w-5/6 flex flex-col items-center bg-white rounded-2xl p-4"
                        onClick={(e) => e.stopPropagation()}
                        variants={In}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        Venta indefinida
                    </motion.div>
                </Backdrop>
            </motion.div>
        )
    }

    let fecha = new Date(0);
    let fechaActualizada = new Date(0);
    fecha.setUTCMilliseconds(Number(props.venta.createdAt));
    fechaActualizada.setUTCMilliseconds(Number(props.venta.updatedAt));

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full ">
            <Backdrop onClick={() => { props.setModal(false) }}>
                <motion.div className="h-5/6 w-5/6 flex flex-col items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col w-full h-full text-left ">
                        <span className="text-2xl">
                            Venta en: {`${fecha.toLocaleString()}`}
                        </span>
                        <div className="flex w-full h-5/6 justify-between align-middle py-6">
                            <span className="font-semibold w-1/2 h-full">
                                Resumen de la compra
                                <div className="flex flex-col pt-4 font-normal">
                                    <span>
                                        Cliente: {props.venta.cliente.nombre === "General" ? props.venta.cliente.nombre : `${props.venta.cliente.nombre} (${props.venta.cliente.nif})`}
                                    </span>
                                    <span>
                                        Tipo de venta: {props.venta.tipo}
                                    </span>
                                    <span>
                                        Valor total: {props.venta.precioVentaTotal}€
                                    </span>
                                    <span>
                                        Cantidad pagada con efectivo: {props.venta.dineroEntregadoEfectivo}€
                                    </span>
                                    <span>
                                        Cantidad pagada con tarjeta: {props.venta.dineroEntregadoTarjeta}€
                                    </span>
                                    <span>
                                        Cambio: {props.venta.cambio}€
                                    </span>
                                    <span>
                                        TPV: {`${tpv?.nombre || `Cargando...`}`}
                                    </span>
                                    <span>
                                        Fecha: {fecha.toLocaleString()}
                                    </span>
                                    <span>
                                        Vendedor: {`${props.venta.vendidoPor.nombre} ${props.venta.vendidoPor.apellidos} (${props.venta.vendidoPor.email})`}
                                    </span>
                                    {
                                        props.venta.createdAt !== props.venta.updatedAt &&
                                        <>
                                            <span>
                                                Venta actualizada: {fechaActualizada.toLocaleString()}
                                            </span>
                                            <span>
                                                Venta modificada por: {`${props.venta.modificadoPor.nombre} ${props.venta.modificadoPor.apellidos} (${props.venta.modificadoPor.email})`}
                                            </span>
                                        </>
                                    }
                                    <span>
                                        Descuento en efectivo aplicado: {props.venta.descuentoEfectivo}€
                                    </span>
                                    <span>
                                        Porcentaje de descuento aplicado: {props.venta.descuentoPorcentaje}%
                                    </span>
                                    <span>
                                        ID: {props.venta._id}
                                    </span>
                                </div>
                            </span>
                            <div className="flex flex-col font-semibold text-right w-1/2 h-full gap-2">
                                <span>
                                    Lista de productos
                                </span>
                                <div className="bg-gray-100 rounded-lg border-2 w-full h-full font-normal overflow-y-scroll">
                                    <div className="flex w-full justify-around p-2 cursor-default">
                                        <p className="w-1/4 text-left font-semibold">Producto</p>
                                        <p className="w-1/4 text-center font-semibold">Cantidad</p>
                                        <p className="w-1/4 text-center font-semibold">Descuento</p>
                                        <p className="w-1/4 text-center font-semibold">Total</p>
                                    </div>
                                    <hr className="border-2 border-gray-300" />
                                    <div className="flex flex-col gap-2 w-full h-full p-2">
                                        {
                                            props.venta.productos.map((prod, index) => {
                                                return (
                                                    <div key={`editarVenta_${prod._id}_${index}`} className="hover:bg-gray-200 hover:cursor-pointer">
                                                        <GenerarFilaProducto numFila={index + 1} producto={prod} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 w-full h-1/6 justify-around items-end text-white">
                            <button className="w-1/3 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.setModal(false) }}>
                                Cerrar
                            </button>
                            <button className="w-1/3 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg" onClick={() => { setShowDevolverModal(true) }}>
                                Devolver
                            </button>
                            <button className="w-1/3 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={() => { handlePrint() }}>
                                Imprimir
                            </button>
                        </div>
                        {
                            PagoDelCliente && qrImage && fecha &&
                            <div style={{ display: "none" }}>
                                <Ticket
                                    ref={componentRef}
                                    pagoCliente={PagoDelCliente}
                                    productosVendidos={props.venta.productos}
                                    fecha={props.venta.createdAt}
                                    qrImage={qrImage}
                                />
                            </div>
                        }
                        <AnimatePresence>
                            {
                                showDevolverModal &&
                                <DevolverVenta productos={props.venta.productos} setModal={setShowDevolverModal} />
                            }
                        </AnimatePresence>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div >
    );
}

const GenerarFilaProducto = (props: { numFila: number, producto: ProductoVendido }) => {
    const precio = props.producto.precioFinal || props.producto.precioVenta * ((100 - props.producto.dto) / 100);

    return (
        <>
            {console.log(props.producto)}
            <div className="flex w-full ">
                <div className="w-1/4 text-left">
                    {props.producto.nombre}
                </div>
                <div className="w-1/4 text-center">
                    {props.producto.cantidadVendida}
                </div>
                <div className="w-1/4 text-center">
                    {props.producto.dto}
                </div>
                <div className="w-1/4 text-center">
                    {(precio * props.producto.cantidadVendida).toFixed(2)}€
                </div>
            </div>
            <hr />
        </>
    );
}

export default VerVenta;