import { Backdrop } from "../backdrop.js/dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useDBClients } from "../pointOfSale/clientContext";
import { ModalProps } from "../../tipos/ModalProps";
import { Client } from "../../tipos/Client";

const In = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition:{
            duration: 0.1,
            type: "spring",
            damping: 25,
            stifness: 500
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition:{
            duration: 0.25,
        }
    }
}

export const ModalPagar = (props: ModalProps) => {
    const [cliente, ] = useState<Client>({nif: 'Genérico', calle: '', cp: '', nombre: 'Genérico'} as Client);
    const [customers, ] = useDBClients();

    const addSale = () => {
        const clienteSeleccionado = customers.filter(c => c.nif == cliente.nif)[0];
        const erpBackURL = process.env.REACT_APP_ERP_BACKURL;
        const tipo = props.isEfectivo ? "Efectivo" : "Tarjeta"
        const data = {
            productos: props.customerProducts.map(p => p._id),
            precioVentaTotal: props.finalPrice,
            cambio: props.cambio,
            cliente: clienteSeleccionado,
            tipo: tipo
        }
        axios.put(`${erpBackURL}api/ventas/add`, data).then(
            (res) => {
                console.log(res);
            }
        );
    }

    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity:0 }} >
            <Backdrop onClick={props.handleClose}>
                <motion.div className="m-auto py-2 flex flex-col items-center bg-white rounded-lg" 
                    onClick={(e) => e.stopPropagation()} 
                    variants={In} 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >     
                    
                    <div className="bg-white mx-auto p-2 sm:p-4 sm:h-64 sm:w-auto rounded-2xl flex flex-col sm:flex-row gap-5 select-none ">
                        <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 items-center justify-center ">
                            {/* Generar lista de productos */}
                            {props.customerProducts.map((p) => {
                                return( 
                                <div className="" key={`modal${p._id}`}>
                                    {p.nombre}
                                </div>);
                            })}
                        </div>
                        <div className="flex flex-col flex-1 gap-5 sm:p-2">
                            <div className="flex flex-1 flex-col gap-3">
                                <div className="bg-gray-200 w-full  h-3 rounded-2xl">
                                    Cliente: {}
                                </div>
                                <div className="bg-gray-200 w-full  h-3 rounded-2xl">
                                </div>
                                <div className="bg-gray-200 w-full  h-3 rounded-2xl">
                                </div>
                                <div className="bg-gray-200 w-full  h-3 rounded-2xl">
                                </div>
                                <div className="bg-gray-200 w-full  h-3 rounded-2xl">
                                </div>
                            </div>
                            <div className="mt-auto flex gap-3">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white w-20 h-8 hover:shadow-lg rounded-full flex items-center justify-center" onClick={props.handleClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button className="bg-green-500 hover:bg-green-600 text-white w-20 h-8 hover:shadow-lg rounded-full flex items-center justify-center" onClick={addSale}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white w-20 h-8 hover:shadow-lg rounded-full ml-auto flex items-center justify-center" onClick={props.handleClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>        
        </motion.div>
    );

}