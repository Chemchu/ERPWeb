import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Empleado } from "../../../tipos/Empleado";
import { Producto } from "../../../tipos/Producto";
import { In } from "../../../utils/animations";
import { notifyError } from "../../../utils/toastify";
import { CreateEmployee } from "../../../utils/typeCreator";
import EmpleadoForm from "../../elementos/Forms/empleadoForm";
import ProductoForm from "../../elementos/Forms/productoForm";
import { Backdrop } from "../backdrop";


const AddEmpleado = (props: { showModal: Function }) => {
    const [Empleado, setEmpleado] = useState<Empleado>();

    const CrearEmpleado = async () => {
        if (!Empleado) {
            notifyError("Error con el producto");
            return;
        }
        CreateEmployee(Empleado);
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