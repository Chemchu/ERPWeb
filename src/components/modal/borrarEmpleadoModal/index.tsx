import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { Empleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";
import { In } from "../../../utils/animations";
import { DeleteEmpleado } from "../../../utils/fetches/empleadoFetches";
import AuthorizationWrapper from "../../authorizationWrapper";
import { Backdrop } from "../backdrop";

const BorrarEmpleadoModal = (props: { showModal: Function, showEmpleadoModal: Function, empleado: Empleado, setEmpleados: Dispatch<SetStateAction<Empleado[]>> }) => {

    const Eliminar = async (id: string) => {
        const deletedCorrectly = await DeleteEmpleado(id);

        if (deletedCorrectly) {
            props.showEmpleadoModal(false);
            props.setEmpleados((empleados) => empleados.filter((c: Empleado) => c._id !== props.empleado._id));
        }
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.showModal(false) }} >
                <motion.div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >

                    <div className="w-full h-full text-center">
                        <div className="flex h-full flex-col justify-between">
                            <svg width="40" height="40" className="mt-4 w-12 h-12 m-auto text-blue-500" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z">
                                </path>
                            </svg>
                            <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
                                {`Borrar ${props.empleado.nombre}`}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
                                ¿Seguro de que quieres borrar este empleado?
                            </p>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <button onClick={async () => await Eliminar(props.empleado._id)} type="button" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Sí
                                </button>
                                <button onClick={() => props.showModal(false)} type="button" className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-blue-500 focus:ring-offset-blue-200 text-blue-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop >
        </motion.div >
    )
}

export default AuthorizationWrapper([Roles.Administrador, Roles.Gerente])(BorrarEmpleadoModal);