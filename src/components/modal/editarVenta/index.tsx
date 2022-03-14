import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { TPVType } from "../../../tipos/TPV";
import { Venta } from "../../../tipos/Venta";
import { FetchTPV } from "../../../utils/fetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import Ticket from "../../ticket";
import { Backdrop } from "../backdrop";

const In = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 15,
            stifness: 500
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition: {
            duration: 0.25,
        }
    }
}

const EditarVenta = (props: { venta: Venta | undefined, setModal: Function }) => {
    const [tpv, setTpv] = useState<TPVType>();
    const componentRef = useRef(null);
    const [PagoDelCliente, setPago] = useState<CustomerPaymentInformation>();
    const [qrImage, setQrImage] = useState<string>();

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Ticket de venta",
        content: reactToPrintContent,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!props.venta) {
                return;
            }

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

            const tpvRes = await FetchTPV(props.venta.tpv);
            const qr = await GenerateQrBase64(props.venta._id);
            setQrImage(qr);
            setTpv(tpvRes);
            setPago(pago);
        }
        let isUnmounted = false;
        fetchData();

        return () => {
            isUnmounted = true;
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
                    <div className="flex flex-col w-full h-full text-left">
                        <span className="text-2xl">
                            Venta en: {`${fecha.toLocaleString()}`}
                        </span>
                        <div className="flex w-full h-full justify-between align-middle py-6">
                            <span className="font-semibold">
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
                            <span className="font-semibold">
                                Lista de productos
                                <div>

                                </div>
                            </span>
                        </div>
                        <div className="flex w-full h-auto justify-around items-end text-white">
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
                            PagoDelCliente && qrImage &&
                            <div style={{ display: "none" }}>
                                <Ticket
                                    ref={componentRef}
                                    pagoCliente={PagoDelCliente}
                                    productosVendidos={props.venta.productos}
                                    fecha={fecha.toLocaleString()}
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

export default EditarVenta;