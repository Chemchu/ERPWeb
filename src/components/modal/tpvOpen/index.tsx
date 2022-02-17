import { motion } from "framer-motion";
import Router from "next/router";
import { useState } from "react";
import { Backdrop } from "../backdrop";

const TpvOpenModal = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(true);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop >
                <div className="flex flex-col h-5/6 w-5/6 bg-white rounded-xl  items-center">
                    <div className="text-2xl justify-self-start flex-grow pt-4">
                        TPV Cerrada
                    </div>


                    <div className="flex flex-row-reverse gap-10 text-center justify-end items-end text-white pb-4">
                        <div className="flex h-10 w-32 m-auto bg-blue-500 hover:bg-blue-600 rounded-2xl cursor-pointer items-center justify-center shadow-lg">
                            <div>
                                Abrir TPV
                            </div>
                        </div>
                        <div className="flex h-10 w-32 m-auto bg-red-500 hover:bg-red-600 rounded-2xl cursor-pointer items-center justify-center shadow-lg"
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