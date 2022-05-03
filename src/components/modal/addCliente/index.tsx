import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { In } from "../../../utils/animations";
import { CreateProducto } from "../../../utils/fetches";
import { notifyError } from "../../../utils/toastify";
import ClientForm from "../../elementos/Forms/clientForm";
import { Backdrop } from "../backdrop";


const AddCliente = (props: { showModal: Function }) => {
    const [Cliente, setCliente] = useState<Cliente>();

    const CrearCliente = async () => {
        if (!Cliente) {
            notifyError("Error con la creación del cliente");
            return;
        }
        //CreateClient(Cliente);
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
                            Añadir nuevo cliente
                        </span>

                        <ClientForm setCliente={setCliente} />

                        <div className="flex w-full h-full items-end justify-around text-white gap-10">
                            <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => props.showModal(false)}>
                                Cancelar
                            </button>
                            <button className="h-12 w-full rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={async () => { await CrearCliente() }}>
                                Añadir cliente
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default AddCliente;