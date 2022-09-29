import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { ITPV } from "../../../tipos/TPV";
import { Venta } from "../../../tipos/Venta";
import { In } from "../../../utils/animations";
import { FetchTPV } from "../../../utils/fetches/tpvFetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import Ticket from "../../printable/ticket";
import { Backdrop } from "../backdrop";
import DevolverVenta from "../devolucionModal/devolverVenta";
import EditarVenta from "../modificarVenta";

const VerVenta = (props: { venta: Venta | undefined, setModal: Function }) => {
    const [tpv, setTpv] = useState<ITPV>();
    const componentRef = useRef(null);
    const [PagoDelCliente, setPago] = useState<CustomerPaymentInformation>();
    const [qrImage, setQrImage] = useState<string>();
    const [showDevolverModal, setShowDevolverModal] = useState<boolean>(false);
    const [showEditarVentaModal, setShowEditarVentaModal] = useState<boolean>(false);

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

    let fecha = new Date(Number(props.venta.createdAt));
    let fechaActualizada = new Date(Number(props.venta.updatedAt));
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
                        <div className="flex justify-between items-center">
                            <span className="text-2xl">
                                Venta en: {`${fecha.toLocaleString()}`}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                className="h-6 w-6 hover:text-blue-500 cursor-pointer"
                                onClick={() => { setShowEditarVentaModal(true) }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
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
                                        Valor total: {props.venta.precioVentaTotal.toFixed(2)}€
                                    </span>
                                    <span>
                                        Cantidad pagada con efectivo: {props.venta.dineroEntregadoEfectivo.toFixed(2)}€
                                    </span>
                                    <span>
                                        Cantidad pagada con tarjeta: {props.venta.dineroEntregadoTarjeta.toFixed(2)}€
                                    </span>
                                    <span>
                                        Cambio: {props.venta.cambio.toFixed(2)}€
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
                            <div className="bg-gray-100 rounded-lg border-2 w-1/2 h-full font-normal overflow-y-scroll">
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
                            props.venta &&
                            PagoDelCliente &&
                            <div style={{ display: "none" }}>
                                <Ticket
                                    ref={componentRef}
                                    pagoCliente={PagoDelCliente}
                                    productosVendidos={props.venta.productos}
                                    qrImage={qrImage}
                                    venta={props.venta}
                                />
                            </div>
                        }
                        <AnimatePresence>
                            {
                                showDevolverModal &&
                                <DevolverVenta venta={props.venta} setModal={setShowDevolverModal} setModalVenta={props.setModal} />
                            }
                            {
                                showEditarVentaModal && <EditarVenta setShowModal={setShowEditarVentaModal} setVenta={() => { }} />
                            }
                        </AnimatePresence>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div >
    );
}

const GenerarFilaProducto = (props: { numFila: number, producto: ProductoVendido }) => {
    const precio = props.producto.precioFinal || Number(props.producto.precioVenta) * ((100 - props.producto.dto) / 100);

    return (
        <>
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