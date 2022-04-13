import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Cierre } from "../../../tipos/Cierre";
import { In } from "../../../utils/animations";
import GenerateQrBase64 from "../../../utils/generateQr";
import CierrePrintable from "../../cierrePrintable";
import { Backdrop } from "../backdrop";

const VerCierre = (props: { showModal: Function, cierre: Cierre, tpv: string }) => {
    const componentRef = useRef(null);
    const [qrImage, setQrImage] = useState<string>();

    useEffect(() => {
        const GetQrImage = async () => {
            const qr = await GenerateQrBase64(props.cierre._id);
            setQrImage(qr);
        }

        GetQrImage();
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
                            Cierre de {fechaCierre}
                            <div className="flex flex-col gap-1 pt-4 text-base">
                                <span>
                                    TPV: {props.tpv}
                                </span>
                                <span>
                                    Venta total: {props.cierre.ventasTotales}€
                                </span>
                                <span>
                                    Ventas en efectivo: {props.cierre.ventasEfectivo}€
                                </span>
                                <span>
                                    Ventas en tarjeta: {props.cierre.ventasTarjeta}€
                                </span>
                                <span>
                                    Beneficio: {props.cierre.beneficio}€ (Server calculando mal el beneficio)
                                </span>
                                <span>
                                    Caja inicial: {props.cierre.cajaInicial}€
                                </span>
                                <span>
                                    Caja final esperada: {props.cierre.dineroEsperadoEnCaja}€
                                </span>
                                <span>
                                    Caja final real: {props.cierre.dineroRealEnCaja}€
                                </span>
                                <span>
                                    Dinero retirado: {props.cierre.dineroRetirado}€
                                </span>
                                <span>
                                    Fondo de caja dejado: {props.cierre.fondoDeCaja}€
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
                        <div className="flex w-full h-full gap-4 justify-around items-end text-white">
                            <button className="w-1/2 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                                Cerrar
                            </button>
                            {
                                qrImage ?
                                    <button className="w-1/2 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={() => { handlePrint() }}>
                                        Imprimir
                                    </button>
                                    :
                                    <div className="flex justify-center items-center w-1/2 h-12 rounded-xl bg-blue-400 cursor-default shadow-lg" >
                                        <span>
                                            Imprimir
                                        </span>
                                    </div>
                            }
                        </div>
                        {
                            qrImage &&
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