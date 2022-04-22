import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { Devolucion } from "../../../tipos/Devolucion";
import { TPVType } from "../../../tipos/TPV";
import { In } from "../../../utils/animations";
import { FetchTPV } from "../../../utils/fetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import DevolucionTicket from "../../devolucionTicket";
import Ticket from "../../ticket";
import { Backdrop } from "../backdrop";

const DevolucionModal = (props: { devolucion: Devolucion | undefined, setModal: Function }) => {
    const [tpv, setTpv] = useState<TPVType>();
    const [qrImage, setQrImage] = useState<string>();
    const componentRef = useRef(null);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Ticket de devolución",
        content: reactToPrintContent,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            if (!props.devolucion) {
                return;
            }
            const tpvRes = await FetchTPV(props.devolucion.tpv, abortController);
            const qr = await GenerateQrBase64(props.devolucion._id, abortController);
            setQrImage(qr);
            setTpv(tpvRes);
        }
        fetchData();

        return () => {
            abortController.abort();
        }
    }, [])


    if (!props.devolucion) {
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
    fecha.setUTCMilliseconds(Number(props.devolucion.createdAt));
    fechaActualizada.setUTCMilliseconds(Number(props.devolucion.updatedAt));

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
                                    {/* Detalles de la deovlución */}
                                </div>
                            </span>
                            <div className="flex flex-col font-semibold text-right w-1/2 h-full gap-2">
                                <span>
                                    Lista de productos
                                </span>
                                <div className="bg-gray-100 rounded-lg border-2 w-full h-full font-normal overflow-y-scroll">
                                    <div className="flex w-full justify-around p-2 cursor-default">
                                        <p className="w-2/4 text-left font-semibold">Producto</p>
                                        <p className="w-1/4 text-center font-semibold">Cantidad</p>
                                        <p className="w-1/4 text-center font-semibold">Total</p>
                                    </div>
                                    <hr className="border-2 border-gray-300" />
                                    <div className="flex flex-col gap-2 w-full h-full p-2">
                                        {
                                            props.devolucion.productosDevueltos.map((prod, index) => {
                                                if (prod.dto) {
                                                    return (
                                                        <div key={`editarVenta_${prod._id}_${index}`} className="hover:bg-gray-200 hover:cursor-pointer">
                                                            <GenerarFilaProducto numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} precio={Number(prod.precioVenta * (1 - Number(prod.dto) / 100))} />
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div key={`editarVenta_${prod._id}_${index}`} className="hover:bg-gray-200 hover:cursor-pointer">
                                                            <GenerarFilaProducto numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} precio={prod.precioVenta} />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full h-1/6 justify-around items-end text-white">
                            <button className="w-1/4 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.setModal(false) }}>
                                Cerrar
                            </button>
                            <button className="w-1/4 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg">
                                Reembolsar
                            </button>
                            <button className="w-1/4 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={() => { handlePrint() }}>
                                Imprimir
                            </button>
                        </div>
                        {
                            qrImage && fecha &&
                            <div style={{ display: "none" }}>
                                <DevolucionTicket
                                    ref={componentRef}
                                    devolucion={props.devolucion}
                                    fecha={props.devolucion.createdAt}
                                    qrImage={qrImage}
                                />
                            </div>
                        }
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

const GenerarFilaProducto = (props: { numFila: number, nombreProducto: string, cantidad: number, precio: number }) => {
    return (
        <>
            <div className="flex w-full ">
                <div className="w-2/4 text-left">
                    {props.nombreProducto}
                </div>
                <div className="w-1/4 text-center">
                    {props.cantidad}
                </div>
                <div className="w-1/4 text-center">
                    {(props.precio * props.cantidad).toFixed(2)}€
                </div>
            </div>
            <hr />
        </>
    );
}

export default DevolucionModal;