import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import { Empleado } from "../../../tipos/Empleado";
import { In } from "../../../utils/animations";
import { UpdateEmpleado } from "../../../utils/fetches/empleadoFetches";
import EditableLabel from "../../elementos/Forms/editableLabel";
import EmpleadoForm from "../../elementos/Forms/empleadoForm";
import { Backdrop } from "../backdrop";

export const VerEmpleado = (props: { empleado: Empleado, setEmpleado: Function, showModal: Function }) => {
    const [Nombre, setNombre] = useState<string>(props.empleado.nombre || "");
    const [EmpleadoAux, setEmpleadoAux] = useState<Empleado>();
    const [hayCambios, setHayCambios] = useState<boolean>(false);
    const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        if (!EmpleadoAux) { setHayCambios(false); return; }

    }, [EmpleadoAux]);

    const GuardarCambios = async (empleado: Empleado | undefined) => {
        if (!empleado) { return; }

        const emp: Empleado = {
            _id: "Creando",
            apellidos: empleado.apellidos,
            email: empleado.email,
            nombre: empleado.nombre,
            rol: empleado.rol,
            dni: empleado.dni,
        }

        const updatedCorrectly = await UpdateEmpleado(emp);
        if (updatedCorrectly) {
            props.setEmpleado(emp);
            setHayCambios(false);
        }
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
                    <div className="flex flex-col w-full h-full">
                        <div className="flex self-start font-semibold text-2xl w-full h-auto xl:text-3xl justify-between">
                            <EditableLabel
                                text={Nombre}
                                setText={setNombre}
                                cambiosHandler={setHayCambios}
                                placeholder="Nombre del producto"
                                type="input"
                            />
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                onClick={() => { setDeleteModal(true); }}
                                className="self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </motion.button>
                        </div>
                        <EmpleadoForm setEmpleado={setEmpleadoAux} empleado={props.empleado} setHayCambios={setHayCambios} />
                        <div className="flex w-full h-full gap-10 text-white self-end items-end justify-around">
                            <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                                Cerrar
                            </button>
                            {
                                hayCambios ?
                                    <button className={`flex bg-blue-500 hover:bg-blue-600 h-12 w-full rounded-xl shadow-lg justify-center items-center`}
                                        onClick={async () => { await GuardarCambios(EmpleadoAux) }}>
                                        <p>
                                            Guardar cambios
                                        </p>
                                    </button>
                                    :
                                    <div className={`flex bg-blue-400 h-12 w-full rounded-xl shadow-lg justify-center items-center `}>
                                        <p>
                                            Guardar cambios
                                        </p>
                                    </div>
                            }
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default VerEmpleado;