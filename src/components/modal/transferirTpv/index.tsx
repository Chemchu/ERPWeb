import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import useTpvStateContext from "../../../context/tpvContext";
import { Empleado } from "../../../tipos/Empleado";
import { In } from "../../../utils/animations";
import { FetchEmpleados, FetchEmpleadosByDisponibilidad } from "../../../utils/fetches/empleadoFetches";
import { notifySuccess } from "../../../utils/toastify";
import CargandoSpinner from "../../cargandoSpinner";
import SimpleListBox from "../../elementos/Forms/simpleListBox";
import { Backdrop } from "../backdrop";

const TransferirTpv = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([])
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<string>()
    const { TransferirTPVState, EmpleadoUsingTPVState } = useTpvStateContext()

    useEffect(() => {
        const GetData = async () => {
            const empleados = await FetchEmpleadosByDisponibilidad(true)
            if (empleados.length <= 0) { return; }

            setEmpleados(empleados)
            setEmpleadoSeleccionado(empleados[0].nombre)
        }
        GetData()
    }, [])

    const Transferir = async () => {
        TransferirTPVState.setShowTransferirTPVModal(false)
        EmpleadoUsingTPVState.setEmpleadoUsingTPV(false)
        notifySuccess("TPV transferida correctamente")
    }

    if (empleados.length <= 0) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full w-full ">
                <Backdrop onClick={() => { TransferirTPVState.setShowTransferirTPVModal(false) }}>
                    <motion.div className="flex h-2/5 w-2/5 items-center justify-center bg-white rounded-2xl p-4"
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
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full ">
            <Backdrop onClick={() => { TransferirTPVState.setShowTransferirTPVModal(false) }}>
                <motion.div className="flex flex-col h-2/5 w-2/5 items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="text-lg text-center h-1/3 w-full font-semibold">Transferir TPV</div>
                    <section className="flex flex-col gap-4 h-full w-full items-center justify-center px-2">
                        <div className="w-full h-auto">
                            <SimpleListBox elementos={empleados.map((emp) => `${emp.nombre} ${emp.apellidos} - (${emp.email})`)} setElemento={setEmpleadoSeleccionado} />
                        </div>
                        {empleadoSeleccionado && <span className="text-sm italic w-full text-center">Se pasará el control de la TPV a {empleadoSeleccionado.split('-')[0]}</span>}
                        <div className="flex items-end gap-2 w-full h-full text-white">
                            <button onClick={() => TransferirTPVState.setShowTransferirTPVModal(false)}
                                className="bg-red-500 hover:bg-red-600 w-full h-10 rounded-lg">
                                Cancelar
                            </button>
                            <button disabled={!empleadoSeleccionado}
                                onClick={Transferir}
                                className={`${!empleadoSeleccionado ? "bg-blue-400 cursor-default" : "bg-blue-500 hover:bg-blue-600"} w-full h-10 rounded-lg`}>
                                Tranferir
                            </button>
                        </div>
                    </section>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default TransferirTpv;