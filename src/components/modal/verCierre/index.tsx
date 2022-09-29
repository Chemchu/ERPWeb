import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Cierre } from "../../../tipos/Cierre";
import { In } from "../../../utils/animations";
import GenerateQrBase64 from "../../../utils/generateQr";
import CierrePrintable from "../../printable/cierrePrintable";
import { Backdrop } from "../backdrop";
import BorrarCierreModal from "../borrarCierreModal";

const VerCierre = (props: { showModal: Function, cierre: Cierre, setCierre: Function, tpv: string }) => {
    const [qrImage, setQrImage] = useState<string>();
    const [showModalDelete, setModalDelete] = useState<boolean>(false);
    const componentRef = useRef(null);

    useEffect(() => {
        const abortController = new AbortController();
        const GetQrImage = async () => {
            const qr = await GenerateQrBase64(props.cierre._id, abortController);
            setQrImage(qr);
        }

        GetQrImage();

        return (() => {
            abortController.abort();
        });
    }, []);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Cierre de caja",
        content: reactToPrintContent,
    });

    const fechaCierre = new Date(Number(props.cierre.cierre)).toLocaleString();
    const fechaApertura = new Date(Number(props.cierre.apertura)).toLocaleString();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.showModal(false) }} >
                <motion.div className="h-5/6 w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-6"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col w-full h-full">
                        <div className="text-2xl">
                            <div className="flex w-full justify-between">
                                <span>
                                    Cierre de {fechaCierre}
                                </span>
                                <div className="hover:text-red-500 cursor-pointer"
                                    onClick={() => { setModalDelete(true) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-base">
                                ID: {props.cierre._id}
                            </span>
                            <div className="grid grid-cols-2 pt-2">
                                <div className="flex flex-col gap-1 text-base">
                                    <span>
                                        TPV: {props.tpv}
                                    </span>
                                    <span>
                                        Venta total: {props.cierre.ventasTotales.toFixed(2)}€
                                    </span>
                                    <span>
                                        Ventas en efectivo: {props.cierre.ventasEfectivo.toFixed(2)}€
                                    </span>
                                    <span>
                                        Ventas en tarjeta: {props.cierre.ventasTarjeta.toFixed(2)}€
                                    </span>
                                    <span>
                                        Caja inicial: {props.cierre.cajaInicial.toFixed(2)}€
                                    </span>
                                    <span>
                                        Caja final esperada: {props.cierre.dineroEsperadoEnCaja.toFixed(2)}€
                                    </span>
                                    <span>
                                        Caja final real: {props.cierre.dineroRealEnCaja.toFixed(2)}€
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 text-base">
                                    <span>
                                        Dinero retirado: {props.cierre.dineroRetirado.toFixed(2)}€
                                    </span>
                                    <span>
                                        Fondo de caja dejado: {props.cierre.fondoDeCaja.toFixed(2)}€
                                    </span>
                                    <span>
                                        Abierto por: {props.cierre.abiertoPor.nombre}
                                    </span>
                                    <span>
                                        Fecha de apertura: {fechaApertura}
                                    </span>
                                    <span>
                                        Cerrado por: {props.cierre.cerradoPor.nombre}
                                    </span>
                                    <span>
                                        Fecha de cierre: {fechaCierre}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full h-full gap-4 justify-around items-end text-white">
                            <button className="w-1/2 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                                Cerrar
                            </button>
                            <button className="w-1/2 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={() => { handlePrint() }}>
                                Imprimir
                            </button>
                        </div>
                        {
                            showModalDelete &&
                            <BorrarCierreModal cierre={props.cierre} showCierreModal={props.showModal} setCierre={props.setCierre} showModal={setModalDelete} />
                        }
                        {
                            <div style={{ display: "none" }}>
                                <CierrePrintable
                                    ref={componentRef}
                                    cierre={props.cierre}
                                    tpv={props.tpv}
                                    qrImage={qrImage}
                                />
                            </div>
                        }
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default VerCierre;