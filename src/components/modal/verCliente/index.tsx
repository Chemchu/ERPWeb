import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Cierre } from "../../../tipos/Cierre";
import { Cliente } from "../../../tipos/Cliente";
import { In } from "../../../utils/animations";
import GenerateQrBase64 from "../../../utils/generateQr";
import CierrePrintable from "../../printable/cierrePrintable";
import { Backdrop } from "../backdrop";

const VerCliente = (props: { showModal: Function, cliente: Cliente }) => {
    const [hayCambios, setHayCambios] = useState<boolean>(false);

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
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default VerCliente;