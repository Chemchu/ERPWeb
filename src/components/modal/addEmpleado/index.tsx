import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Empleado } from "../../../tipos/Empleado";
import { In } from "../../../utils/animations";
import { AddNewEmpleado } from "../../../utils/fetches/empleadoFetches";
import { notifyError, notifyLoading } from "../../../utils/toastify";
import EmpleadoForm from "../../elementos/Forms/empleadoForm";
import { Backdrop } from "../backdrop";


const AddEmpleado = (props: { showModal: Function }) => {
    const [Empleado, setEmpleado] = useState<Empleado>();

    const CrearEmpleado = async () => {
        if (!Empleado || Object.keys(Empleado).length === 0) {
            notifyError("Los datos del empleado no puede estar vacío");
            return;
        }

        notifyLoading(AddNewEmpleado(Empleado), "Enviando correo electrónico...", () => {
            props.showModal(false);
        })
    }

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
                    <div className="flex flex-col w-full h-full text-left ">
                        <span className="text-3xl cursor-default">
                            Añadir nuevo empleado
                        </span>

                        <EmpleadoForm setEmpleado={setEmpleado} />

                        <div className="flex w-full h-full items-end justify-around text-white gap-10">
                            <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => props.showModal(false)}>
                                Cancelar
                            </button>
                            <button className="h-12 w-full rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={async () => { await CrearEmpleado() }}>
                                Añadir empleado
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default AddEmpleado;