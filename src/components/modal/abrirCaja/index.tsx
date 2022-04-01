import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import { JWT } from "../../../tipos/JWT";
import { TPVType } from "../../../tipos/TPV";
import { FetchTPVsByDisponibilidad } from "../../../utils/fetches";
import { OCUPY_TPV } from "../../../utils/querys";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import Droplist from "../../Forms/droplist";
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

const AbrirCaja = (props: { setShowModal: Function, setEmpleadoUsandoTPV: Function }) => {
    const [tpvs, setTpvs] = useState<TPVType[]>([]);
    const [currentTpvName, setCurrentTpvName] = useState<string>();
    const [cajaInicial, setCajaInicial] = useState<string>('0');
    const [ocuparTpv, { data, error }] = useMutation(OCUPY_TPV);
    const { Empleado } = useEmpleadoContext();

    useEffect(() => {
        const TpvsAbiertas = async () => {
            setTpvs(await FetchTPVsByDisponibilidad(true));
        }

        let isUnmounted = false;
        TpvsAbiertas();

        return (() => {
            isUnmounted = true;
        })
    }, []);

    useEffect(() => {
        // Selecciona el primer TPV libre
        if (tpvs.length > 0) {
            setCurrentTpvName(tpvs[0].nombre)
        }
    }, [tpvs]);

    useEffect(() => {
        if (!error && data) {
            Cookies.set("authorization", data.ocupyTPV.token)
            props.setShowModal(false);
            props.setEmpleadoUsandoTPV(true);
        }

    }, [data])

    const AbrirTPV = async () => {
        const tpv: TPVType | undefined = tpvs.find((t) => {
            return t.nombre === currentTpvName
        });

        const cInicial: number = parseFloat(Number(cajaInicial).toFixed(2))
        ocuparTpv({
            variables: {
                "idEmpleado": Empleado._id,
                "idTpv": tpv?._id,
                "cajaInicial": cInicial
            }
        });
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop >
                <motion.div variants={In} initial="hidden" animate="visible" exit="exit"
                    className="flex flex-col h-3/5 w-3/5 bg-white rounded-xl  items-center">
                    <div className="text-2xl justify-self-start pt-4 w">
                        TPV Cerrada
                    </div>

                    <div className="flex flex-col flex-grow gap-10 justify-center">
                        <div className="flex gap-10">
                            <div className="self-center ">
                                Selecciona la TPV
                            </div>
                            <div className="w-full self-center justify-end">
                                {/* <Dropdown selectedElemento={tpvs ? tpvs.values().next().value : "Cargando..."} elementos={Array.from(tpvs.values())} setElemento={setCurrentTpv} /> */}
                                <Droplist selectedElemento={tpvs.length > 0 ? tpvs[0].nombre : "Cargando..."} elementos={tpvs.map((a) => { return a.nombre; })} setElemento={setCurrentTpvName} />
                            </div>
                        </div>

                        <div className="flex gap-10">
                            <div className="self-center">
                                Caja inicial
                            </div>
                            <div className="flex gap-2 self-center justify-end ml-auto">
                                <input type="text" inputMode="numeric" name="cajaInicial" id="cajaInicial" placeholder=" Por ejemplo 350.50"
                                    className="text-right border border-gray-500 rounded-md justify-self-end w-60  outline-blue-500 "
                                    onChange={(e) => { setCajaInicial(ValidatePositiveFloatingNumber(e.target.value)) }} value={cajaInicial} />
                                €

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