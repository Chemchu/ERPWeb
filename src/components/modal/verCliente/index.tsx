import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useEmpleadoContext from "../../../context/empleadoContext";
import { Cierre } from "../../../tipos/Cierre";
import { Cliente } from "../../../tipos/Cliente";
import { Roles } from "../../../tipos/Enums/Roles";
import { In } from "../../../utils/animations";
import GenerateQrBase64 from "../../../utils/generateQr";
import ClienteForm from "../../elementos/Forms/clienteForm";
import EditableLabel from "../../elementos/Forms/editableLabel";
import CierrePrintable from "../../printable/cierrePrintable";
import { Backdrop } from "../backdrop";
import BorrarClienteModal from "../borrarClienteModal";

const VerCliente = (props: { showModal: Function, cliente: Cliente, setCliente: Function }) => {
    const [nombre, setNombre] = useState<string>(props.cliente.nombre);
    const [hayCambios, setHayCambios] = useState<boolean>(false);
    const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
    const [clienteAux, setClienteAux] = useState<Cliente>(props.cliente);
    const { Empleado } = useEmpleadoContext();

    const GuardarCliente = async () => {
        props.setCliente(clienteAux)

        // Guardar cliente en server
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
                                text={nombre}
                                setText={setNombre}
                                cambiosHandler={setHayCambios}
                                placeholder="Nombre del cliente"
                                type="input"
                            />
                            {
                                Empleado.rol !== Roles.Cajero &&
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    onClick={() => { setDeleteModal(true); }}
                                    className="self-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </motion.button>
                            }
                        </div>
                        <ClienteForm setCliente={setClienteAux} cliente={clienteAux} setHayCambios={setHayCambios} />
                        <div className="flex w-full h-full gap-4 justify-around items-end text-white">
                            <button className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                                Cerrar
                            </button>
                            {
                                hayCambios ?
                                    <button className={`flex bg-blue-500 hover:bg-blue-600 h-12 w-full rounded-xl shadow-lg justify-center items-center`}
                                        onClick={async () => { await GuardarCliente() }}>
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
                        <AnimatePresence>
                            {
                                showDeleteModal &&
                                <BorrarClienteModal showClienteModal={props.showModal} showModal={setDeleteModal} cliente={props.cliente} setCliente={props.setCliente} />
                            }
                        </AnimatePresence>

                    </div>
                    {/* <div className="flex flex-col w-full h-full">
                        <div className="text-2xl">
                            {props.cliente.nombre}
                            <div className="flex flex-col gap-1 pt-4 text-base">
                                <span>
                                    ID: {props.cliente._id}
                                </span>
                                <span>
                                    CIF: {props.cliente.nif}
                                </span>
                                <span>
                                    Dirección: {props.cliente.calle}
                                </span>
                                <span>
                                    Código postal: {props.cliente.cp}
                                </span>
                            </div>
                        </div>
                        <div className="flex w-full h-full gap-4 justify-around items-end text-white">
                            <button className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                                Cerrar
                            </button>
                            {
                                hayCambios ?
                                    <button className={`flex bg-blue-500 hover:bg-blue-600 h-12 w-full rounded-xl shadow-lg justify-center items-center`}
                                        onClick={async () => { }}>
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
                    </div> */}
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default VerCliente;