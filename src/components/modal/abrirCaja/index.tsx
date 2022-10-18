import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import useTpvStateContext from "../../../context/tpvContext";
import { ITPV } from "../../../tipos/TPV";
import { In } from "../../../utils/animations";
import { FetchTPVsByDisponibilidad, OcuparTPV } from "../../../utils/fetches/tpvFetches";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import Droplist from "../../elementos/Forms/droplist";
import { Backdrop } from "../backdrop";
import ContarCaja from "../contarCaja";

const AbrirCaja = () => {
    const [tpvs, setTpvs] = useState<ITPV[]>([]);
    const [currentTpvName, setCurrentTpvName] = useState<string>();
    const [cajaInicial, setCajaInicial] = useState<string>('');
    const { Empleado, SetEmpleado } = useEmpleadoContext();
    const [showContador, setContador] = useState<boolean>(false);
    const [desglose, setDesglose] = useState<Map<number, number>>(new Map())

    const { AbrirCajaState, EmpleadoUsingTPVState } = useTpvStateContext()

    useEffect(() => {
        const abortController = new AbortController();
        const TpvsAbiertas = async () => {
            const tpvs = await FetchTPVsByDisponibilidad(true, abortController);
            if (tpvs) { setTpvs(tpvs); }
        }

        TpvsAbiertas();

        return (() => {
            abortController.abort();
        })
    }, []);

    useEffect(() => {
        // Selecciona el primer TPV libre
        if (tpvs.length > 0) {
            setCurrentTpvName(tpvs[0].nombre)
        }
    }, [tpvs]);

    const AbrirTPV = async () => {
        const tpv: ITPV | undefined = tpvs.find((t) => {
            return t.nombre === currentTpvName
        });
        const cInicial: number = parseFloat(Number(cajaInicial).toFixed(2));

        if (tpv?._id) {
            const res = await OcuparTPV(tpv._id, Empleado, cInicial, SetEmpleado);

            if (res) {
                AbrirCajaState.setShowAbrirCajaModal(false);
                EmpleadoUsingTPVState.setEmpleadoUsingTPV(true);
            }
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop onClick={() => AbrirCajaState.setShowAbrirCajaModal(false)}>
                <motion.div variants={In} initial="hidden" animate="visible" exit="exit"
                    className="flex flex-col h-3/6 w-3/6 max-h-96 max-w-lg bg-white rounded-xl  items-center"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="text-2xl justify-self-start p-4">
                        Abrir TPV
                    </div>

                    <div className="flex flex-col flex-grow gap-10 justify-center">
                        <div className="flex gap-10">
                            <div className="self-center ">
                                Selecciona la TPV
                            </div>
                            <div className="w-full self-center justify-end">
                                <Droplist selectedElemento={currentTpvName ? currentTpvName : "Cargando..."} elementos={tpvs.map((a) => { return a.nombre; })} setElemento={setCurrentTpvName} />
                            </div>
                        </div>

                        <div className="flex gap-10">
                            <div className="self-center">
                                Caja inicial
                            </div>
                            <div className="flex gap-2 self-center ml-auto items-center">
                                <input type="text" inputMode="numeric" name="cajaInicial" id="cajaInicial" placeholder=" Por ejemplo 350.50"
                                    className="text-right placeholder:text-gray-400 placeholder:italic p-2 border rounded-lg w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onChange={(e) => { setCajaInicial(ValidatePositiveFloatingNumber(e.target.value)) }} value={cajaInicial} />
                                <span>€</span>
                                <div className="flex hover:bg-blue-200 rounded-full cursor-pointer w-8 h-8 items-center justify-center"
                                    onClick={() => { setContador((isOpen) => !isOpen) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#4b5563" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full gap-4 text-center justify-end items-end text-white p-4">
                        <div className="flex h-10 w-full m-auto bg-red-500 hover:bg-red-600 rounded-xl cursor-pointer items-center justify-center shadow-lg"
                            onClick={() => { AbrirCajaState.setShowAbrirCajaModal(false) }}>
                            <div>
                                Cancelar
                            </div>
                        </div>
                        {
                            Number(cajaInicial) > 0 && currentTpvName && tpvs ?
                                <div className="flex h-10 w-full m-auto bg-blue-500 hover:bg-blue-600 rounded-xl cursor-pointer items-center justify-center shadow-lg"
                                    onClick={AbrirTPV}>
                                    <div>
                                        Abrir TPV
                                    </div>
                                </div>
                                :
                                <div className="flex h-10 w-full m-auto bg-blue-400 rounded-xl cursor-default items-center justify-center shadow-lg">
                                    <div>
                                        Abrir TPV
                                    </div>
                                </div>
                        }

                    </div>
                    <AnimatePresence>
                        {showContador && <ContarCaja showItself={setContador} desglose={desglose} setDesglose={setDesglose} setTotal={setCajaInicial} />}
                    </AnimatePresence>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default AbrirCaja;