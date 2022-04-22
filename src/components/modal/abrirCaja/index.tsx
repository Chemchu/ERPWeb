import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import { TPVType } from "../../../tipos/TPV";
import { In } from "../../../utils/animations";
import { FetchTPVsByDisponibilidad, OcuparTPV } from "../../../utils/fetches";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import Droplist from "../../Forms/droplist";
import { Backdrop } from "../backdrop";

const AbrirCaja = (props: { setShowModal: Function, setEmpleadoUsandoTPV: Function }) => {
    const [tpvs, setTpvs] = useState<TPVType[]>([]);
    const [currentTpvName, setCurrentTpvName] = useState<string>();
    const [cajaInicial, setCajaInicial] = useState<string>('0');
    const { Empleado, SetEmpleado } = useEmpleadoContext();

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
        const tpv: TPVType | undefined = tpvs.find((t) => {
            return t.nombre === currentTpvName
        });

        const cInicial: number = parseFloat(Number(cajaInicial).toFixed(2));

        if (tpv?._id) {
            const res = await OcuparTPV(tpv._id, Empleado, cInicial, SetEmpleado);

            if (res) {
                props.setShowModal(false);
                props.setEmpleadoUsandoTPV(true);
            }
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop >
                <motion.div variants={In} initial="hidden" animate="visible" exit="exit"
                    className="flex flex-col h-3/6 w-3/6 max-h-96 max-w-lg bg-white rounded-xl  items-center">
                    <div className="text-2xl justify-self-start pt-4 w">
                        TPV Cerrada
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
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-10 text-center justify-end items-end text-white pb-4">
                        <div className="flex h-10 w-32 m-auto bg-red-500 hover:bg-red-600 rounded-2xl cursor-pointer items-center justify-center shadow-lg"
                            onClick={() => { props.setShowModal(false) }}>
                            <div>
                                Cancelar
                            </div>
                        </div>
                        {
                            Number(cajaInicial) > 0 && currentTpvName && tpvs ?
                                <div className="flex h-10 w-32 m-auto bg-blue-500 hover:bg-blue-600 rounded-2xl cursor-pointer items-center justify-center shadow-lg"
                                    onClick={AbrirTPV}>
                                    <div>
                                        Abrir TPV
                                    </div>
                                </div>
                                :
                                <div className="flex h-10 w-32 m-auto bg-blue-400 rounded-2xl cursor-default items-center justify-center shadow-lg">
                                    <div>
                                        Abrir TPV
                                    </div>
                                </div>
                        }

                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default AbrirCaja;