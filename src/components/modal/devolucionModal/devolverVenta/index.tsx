import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useEmpleadoContext from "../../../../context/empleadoContext";
import { Devolucion } from "../../../../tipos/Devolucion";
import { TipoCobro } from "../../../../tipos/Enums/TipoCobro";
import { Venta } from "../../../../tipos/Venta";
import { In } from "../../../../utils/animations";
import { AddDevolucion, FetchDevolucionesByQuery } from "../../../../utils/fetches/devolucionesFetches";
import GenerateQrBase64 from "../../../../utils/generateQr";
import { notifyError, notifySuccess } from "../../../../utils/toastify";
import DevolucionTicket from "../../../printable/devolucionTicket";
import { Backdrop } from "../../backdrop";
import ListaDevolucionProductos from "./devolucionListaProductos";

const DevolverVenta = (props: { venta: Venta, setModal: Function, setModalVenta: Function }) => {
    const [ProductosDevolver, setProductosDevolver] = useState<Map<string, number>>(new Map());
    const [Devolucion, setDevolucion] = useState<Devolucion>();
    const { Empleado } = useEmpleadoContext();
    const [qrImage, setQrImage] = useState<string>();
    const componentRef = useRef(null);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    // Se encarga de limpiar el carrito y los descuentos
    const onAfterPrintHandler = React.useCallback(() => {
        notifySuccess("Devolución realizada correctamente")
        props.setModal(false)
        props.setModalVenta(false);
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Ticket de devolución",
        content: reactToPrintContent,
        onAfterPrint: onAfterPrintHandler
    });

    useEffect(() => {
        if (qrImage) { handlePrint() }
    }, [qrImage])

    const AceptarReembolso = async () => {
        const abortController = new AbortController();
        try {
            if (!Empleado || !Empleado.TPV) { notifyError("Error con la autenticación"); return; }
            const { data, error } = await AddDevolucion(props.venta, ProductosDevolver, Empleado);

            if (!error) {
                const devoluciones = await FetchDevolucionesByQuery(data._id);
                if (devoluciones.length <= 0) {
                    setQrImage(undefined);
                    notifyError("Error al realizar la devolución")
                    return;
                }
                setDevolucion(devoluciones.pop());
                setQrImage(await GenerateQrBase64(data._id, abortController));
            }
            else {
                setQrImage(undefined);
                notifyError("Error al realizar la devolución")
            }
        }
        catch (err) {
            console.log(err);
            abortController.abort();
            notifyError("Error al realizar la devolución")
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop onClick={() => { props.setModal(false) }}>
                <motion.div className="h-2/3 w-4/6 flex flex-col gap-4 items-center justify-between bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <span className="text-xl w-full text-left font-semibold">
                        Selecciona los productos a devolver
                    </span>

                    <ListaDevolucionProductos key={`listaKey::${props.venta.productos.length}`} listaProductos={props.venta.productos} productosDevolver={ProductosDevolver} setProductosDevolver={setProductosDevolver} />

                    {
                        props.venta.tipo === TipoCobro.Fraccionado &&
                        <span className="italic">Recuerda: si la venta fue fraccionada, toda la devolución se hará en efectivo</span>
                    }

                    <div className="flex gap-4 w-full h-1/6 justify-around items-end text-white">
                        <button className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => props.setModal(false)}>
                            Cancelar
                        </button>
                        {
                            ProductosDevolver.size > 0 ?
                                <button className={`w-full h-12 rounded-xl shadow-lg bg-blue-500 hover:bg-blue-600 cursor-pointer`}
                                    onClick={async () => { await AceptarReembolso() }}>
                                    Aceptar
                                </button>
                                :
                                <button className={`w-full h-12 rounded-xl shadow-lg bg-blue-400 cursor-default`}>
                                    Aceptar
                                </button>
                        }
                    </div>
                    {
                        qrImage &&
                        Devolucion &&
                        <div style={{ display: "none" }}>
                            <DevolucionTicket
                                ref={componentRef}
                                devolucion={Devolucion}
                                fecha={Devolucion.createdAt}
                                qrImage={qrImage}
                            />
                        </div>
                    }
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default DevolverVenta;