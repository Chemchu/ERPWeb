import { Backdrop } from "../backdrop.js/dropdown.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useDBProducts } from "../pointOfSale/productsContext";
import { useDBClients } from "../pointOfSale/clientContext";

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
        opacity: 0
    }
}

export const ModalPagar = ({handleClose: cerrarModal, finalPrice, cambio, customerProducts, isEfectivo}) => {
    const [cliente, setCliente] = useState({});
    const [dbProducts] = useDBProducts();
    const [customers, setCustomers] = useDBClients();

    const addSale = () => {
        const clienteSeleccionado = customers.filter(c => c.nif == cliente.nif)[0];
        const erpBackURL = process.env.REACT_APP_ERP_BACKURL;
        const tipo = isEfectivo ? "Efectivo" : "Tarjeta"
        const data = {
            productos: customerProducts.map(p => p._id),
            precioVentaTotal: finalPrice,
            cambio: cambio,
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
        <Backdrop onClick={cerrarModal}>
            <motion.div className="m-auto py-2 flex flex-col items-center bg-white rounded-lg" 
                onClick={(e) => e.stopPropagation()} 
                variants={In} 
                initial="hidden"
                animate="visible"
                exit="exit"
            >     
                
                <div class="bg-white mx-auto p-2 sm:p-4 sm:h-64 sm:w-auto rounded-2xl flex flex-col sm:flex-row gap-5 select-none ">
                    <div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 items-center justify-center ">
                        {/* Generar lista de productos */}
                        {customerProducts.map((p) => {
                            return( 
                            <div className="">
                                {dbProducts.filter(prod => prod._id == p._id)[0].nombre}
                            </div>);
                        })}
                    </div>
                    <div class="flex flex-col flex-1 gap-5 sm:p-2">
                        <div class="flex flex-1 flex-col gap-3">
                            <div class="bg-gray-200 w-full  h-3 rounded-2xl">
                                Cliente: {}
                            </div>
                            <div class="bg-gray-200 w-full  h-3 rounded-2xl">
                            </div>
                            <div class="bg-gray-200 w-full  h-3 rounded-2xl">
                            </div>
                            <div class="bg-gray-200 w-full  h-3 rounded-2xl">
                            </div>
                            <div class="bg-gray-200 w-full  h-3 rounded-2xl">
                            </div>
                        </div>
                        <div class="mt-auto flex gap-3">
                            <button class="bg-yellow-500 hover:bg-yellow-600 text-white w-20 h-8 hover:shadow-lg rounded-full flex items-center justify-center" onClick={cerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button class="bg-green-500 hover:bg-green-600 text-white w-20 h-8 hover:shadow-lg rounded-full flex items-center justify-center" onClick={addSale}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                            <button class="bg-red-500 hover:bg-red-600 text-white w-20 h-8 hover:shadow-lg rounded-full ml-auto flex items-center justify-center" onClick={cerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>        
    );

}