import { motion } from "framer-motion";
import Router from "next/router";
import { useState } from "react";
import { Backdrop } from "../backdrop";

const TpvOpenModal = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(true);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop >
                <div className="flex flex-col h-5/6 w-5/6 bg-white rounded-lg  items-center">
                    <div className="text-2xl justify-self-start">
                        TPV Cerrada
                    </div>
                    <div className="flex gap-10 text-center justify-end items-end text-white">
                        <div className="flex h-10 w-32 m-auto bg-blue-400 rounded-2xl cursor-pointer items-center justify-center">
                            <div>
                                Abrir TPV
                            </div>
                        </div>
                        <div className="flex h-10 w-32 m-auto bg-red-400 rounded-2xl cursor-pointer items-center justify-center"
                            onClick={() => { Router.push('/dashboard/') }}>
                            <div>
                                Cancelar
                            </div>
                        </div>
                    </div>
                </div>
            </Backdrop>
        </motion.div>
    );
}

export default TpvOpenModal;