import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useEmpleadoContext from "../../../context/empleadoContext";
import useTpvStateContext from "../../../context/tpvContext";
import { Cierre } from "../../../tipos/Cierre";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { ITPV } from "../../../tipos/TPV";
import { Venta } from "../../../tipos/Venta";
import { In } from "../../../utils/animations";
import { NuevoCierreTPV } from "../../../utils/fetches/cierresFetches";
import { FetchDevolucionesByDateRange } from "../../../utils/fetches/devolucionesFetches";
import { FetchTPV } from "../../../utils/fetches/tpvFetches";
import { FetchVentasByTPVDate } from "../../../utils/fetches/ventasFetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import { GetEfectivoTotal, GetTarjetaTotal, GetTotalEnCaja } from "../../../utils/preciosUtils";
import { notifyError } from "../../../utils/toastify";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import CargandoSpinner from "../../cargandoSpinner";
import CierrePrintable from "../../printable/cierrePrintable";
import { Backdrop } from "../backdrop";
import ContarCaja from "../contarCaja";
import RequestConfirmacion from "../requestConfirmacion";

export const CerrarCaja = (props: { Empleado?: SesionEmpleado }) => {
    const [Ventas, setVentas] = useState<Venta[]>();
    const [Tpv, setTPV] = useState<ITPV>();
    const [TotalEfectivo, setTotalEfectivo] = useState<string>();
    const [TotalTarjeta, setTotalTarjeta] = useState<string>();
    const [TotalPrevistoEnCaja, setTotalPrevistoEnCaja] = useState<string>();
    const [TotalRealEnCaja, setTotalRealEnCaja] = useState<string>("");
    const [Desglose, setDesglose] = useState<Map<number, number>>(new Map());
    const [DineroRetirado, setDineroRetirado] = useState<string>("");
    const [showContarCaja, setContarCaja] = useState<boolean>(false);
    const [qrImage, setQrImage] = useState<string>();
    const [Cierre, setCierre] = useState<Cierre>();
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [confimationRequest, setConfimationRequest] = useState<boolean>(false);
    const [anyadiendoCierre, setAnyadiendoCierre] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const { Empleado, SetEmpleado } = useEmpleadoContext();
    const componentRef = useRef(null);

    const { CerrarCajaState, EmpleadoUsingTPVState } = useTpvStateContext()

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const onAfterPrintHandler = React.useCallback(() => {
        setButtonDisabled(false)
        setAnyadiendoCierre(false)
        CerrarCajaState.setShowCerrarCajaModal(false)
        EmpleadoUsingTPVState.setEmpleadoUsingTPV(false);
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Cierre de caja",
        content: reactToPrintContent,
        onAfterPrint: onAfterPrintHandler
    });

    useEffect(() => {
        const abortController = new AbortController();
        const GetVentas = async (j: SesionEmpleado) => {
            if (!j.TPV) { notifyError("El empleado no está usando la TPV"); return; }

            const tpv = await FetchTPV(j.TPV, abortController);
            if (!tpv) { notifyError("No se ha encontrado la TPV que se quiere cerrar"); return; }

            const devoluciones = await FetchDevolucionesByDateRange(tpv.fechaApertura, String(Date.now()));
            const ventas = await FetchVentasByTPVDate(j.TPV, tpv.fechaApertura);

            setVentas(ventas);
            setTPV(tpv);
            setTotalEfectivo(GetEfectivoTotal(ventas).toString());
            setTotalTarjeta(GetTarjetaTotal(ventas).toString());
            setTotalPrevistoEnCaja(GetTotalEnCaja(ventas, devoluciones, tpv).toString());
        }

        GetVentas(Empleado);
        setIsMounted(true);

        return () => {
            abortController.abort();
        }
    }, [])

    useEffect(() => {
        if (!isMounted) { return; }

        if (Cierre) {
            handlePrint();
        }
    }, [Cierre])

    const SetTotalReal = (value: string) => {
        if (Desglose.size > 0) { setDesglose(new Map()) }

        setTotalRealEnCaja(ValidatePositiveFloatingNumber(value))
    }

    const CerrarCaja = async () => {
        const abortController = new AbortController();
        try {
            setButtonDisabled(true);
            if (!Tpv || !Tpv._id) { return; }

            const cierre = await NuevoCierreTPV(Empleado, SetEmpleado, Number(TotalEfectivo),
                Number(TotalTarjeta), Number(DineroRetirado),
                Number(TotalPrevistoEnCaja), Number(TotalRealEnCaja), abortController);

            if (cierre) {
                setQrImage(await GenerateQrBase64(cierre._id, abortController));
                setCierre(cierre);
            }
            else {
                setButtonDisabled(false)
                setAnyadiendoCierre(false)
            }
        }
        catch (e) {
            abortController.abort();
            setButtonDisabled(false)
            setAnyadiendoCierre(false)
            CerrarCajaState.setShowCerrarCajaModal(false)
            return;
        }
    }

    const ConfirmarCierre = async () => {
        setConfimationRequest(false)
        setAnyadiendoCierre(true)
        await CerrarCaja()
    }

    if (!Ventas) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full w-full">
                <Backdrop onClick={(e) => { e.stopPropagation(); CerrarCajaState.setShowCerrarCajaModal(false) }} >
                    <motion.div className="h-3/6 w-2/6 m-auto py-2 flex flex-col gap-4 items-center justify-center bg-white rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                        variants={In}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <CargandoSpinner />
                    </motion.div>
                </Backdrop>
            </motion.div>
        );
    }

    if (anyadiendoCierre) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full w-full ">
                <Backdrop onClick={(e) => { e.stopPropagation(); }} >
                    <motion.div className="h-1/3 w-1/3 flex flex-col items-center bg-white rounded-2xl p-4"
                        onClick={(e) => e.stopPropagation()}
                        variants={In}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex w-full h-full justify-center">
                            <CargandoSpinner mensaje="Añadiendo cierre..." />
                        </div>
                        {
                            Cierre &&
                            Tpv &&
                            <div style={{ display: "none" }}>
                                <CierrePrintable
                                    ref={componentRef}
                                    cierre={Cierre}
                                    tpv={Tpv.nombre}
                                    qrImage={qrImage}
                                />
                            </div>
                        }
                    </motion.div>
                </Backdrop>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full ">
            <Backdrop onClick={(e) => { e.stopPropagation(); CerrarCajaState.setShowCerrarCajaModal(false) }} >
                <motion.div className="h-4/6 w-4/6 flex flex-col items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col gap-4 h-full w-full rounded justify-center content-center">
                        <div className="text-lg text-center font-bold">
                            Ventana de cierre de TPV
                        </div>
                        <hr />
                        <div className="flex w-full h-full">
                            <div className="flex flex-col gap-2 xl:gap-4 w-full h-full">
                                <div className="flex gap-2">
                                    <p>Número de ventas: </p>
                                    <p>{Ventas.length}</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Ventas totales: </p>
                                    <p>{(Number(TotalEfectivo) + Number(TotalTarjeta)).toFixed(2)}€</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Ventas en efectivo: </p>
                                    <p>{Number(TotalEfectivo).toFixed(2)}€</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Ventas en tarjeta: </p>
                                    <p>{Number(TotalTarjeta).toFixed(2)}€</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Dinero total esperado en caja: </p>
                                    <p>{Number(TotalPrevistoEnCaja).toFixed(2)}€</p>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <p>Dinero total real en caja: </p>
                                    <input className="rounded-lg border p-1 outline-blue-500 text-right"
                                        onChange={(e) => { SetTotalReal(e.target.value) }} value={TotalRealEnCaja} />
                                    €
                                    <div className="flex hover:bg-blue-200 rounded-full cursor-pointer w-8 h-8 items-center justify-center"
                                        onClick={() => { setContarCaja((isOpen) => !isOpen) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#4b5563" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <p>Dinero retirado: </p>
                                    <input className="rounded-lg border p-1 outline-blue-500 text-right"
                                        onChange={(e) => { setDineroRetirado(ValidatePositiveFloatingNumber(e.target.value)) }} value={DineroRetirado} />
                                    €
                                </div>

                            </div>

                        </div>

                        <div className="flex gap-4 h-auto w-full text-white">
                            <div className="flex h-10 w-2/3 m-auto bg-red-500 hover:bg-red-600 rounded-xl cursor-pointer items-center justify-center shadow-lg"
                                onClick={() => { CerrarCajaState.setShowCerrarCajaModal(false) }}>
                                <div>
                                    Cancelar
                                </div>
                            </div>
                            {
                                Number(TotalRealEnCaja) > 0 && Number(TotalRealEnCaja) - Number(DineroRetirado) >= 0 && !isButtonDisabled ?
                                    <div className={`flex h-10 w-2/3 m-auto bg-blue-500 hover:bg-blue-600 rounded-xl cursor-pointer items-center justify-center shadow-lg`}
                                        onClick={() => { setConfimationRequest(true) }}>
                                        <div>
                                            Cerrar TPV
                                        </div>
                                    </div>
                                    :
                                    <div className={`flex h-10 w-2/3 m-auto bg-blue-400 rounded-xl cursor-default items-center justify-center shadow-lg`}>
                                        <div>
                                            Cerrar TPV
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <AnimatePresence>
                        {
                            showContarCaja && <ContarCaja showItself={setContarCaja} setTotal={setTotalRealEnCaja} desglose={Desglose} setDesglose={setDesglose} />
                        }
                        {
                            confimationRequest && <RequestConfirmacion titulo="¿Desea añadir el cierre?" msg="El cierre no se podrá modificar una vez sea añadido"
                                acceptCallback={async () => await ConfirmarCierre()}
                                cancelCallback={() => setConfimationRequest(false)} />
                        }
                    </AnimatePresence>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default CerrarCaja;