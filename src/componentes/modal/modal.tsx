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
            damping: 15,
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

    let date = new Date();
    const fechaActual = `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const addSale = () => {
        const clienteSeleccionado = customers.filter(c => c.nif == cliente.nif)[0];
        const erpBackURL = process.env.REACT_APP_ERP_BACKURL;
        const tipo = props.isEfectivo ? "Efectivo" : "Tarjeta"
        const data = {
            productos: props.customerProducts.map(p => p._id),
            precioVentaTotal: props.finalPrice,
            cambio: props.dineroEntregado - props.finalPrice,
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
            <Backdrop onClick={props.handleClose} >
                <motion.div className="m-auto py-2 flex flex-col items-center bg-white rounded-2xl" 
                    onClick={(e) => e.stopPropagation()} 
                    variants={In} 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >     

                    <div className="sm:w-96 w-96 rounded-3xl bg-white overflow-hidden z-10">
                        <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">ERPWeb</h2>
                                <p> Resumen de la compra </p>
                            </div>
                            <div className="flex mt-4 text-xs">
                                {/* <div className="flex-grow">No: <span x-text="receiptNo" /></div> */}
                                <div x-text="receiptDate" > {fechaActual} </div>

                            </div>
                            <hr className="my-2" />
                            <div>
                            <table className="w-full text-xs">
                                <thead>
                                    <tr>
                                        <th className="py-1 w-1/12 text-center">#</th>
                                        <th className="py-1 text-left">Producto</th>
                                        <th className="py-1 w-2/12 text-center">Cantidad</th>
                                        <th className="py-1 w-3/12 text-right">Precio</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-auto">
                                {
                                    props.customerProducts.map((prod, index) => {
                                        return <GenerarFilaProducto numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidad)} precio={prod.precioVenta} />
                                    })
                                }
                                </tbody>
                            </table>
                            </div>
                            <hr className="my-2" />
                                {
                                    props.isEfectivo 
                                    ?
                                    <div>
                                        <div className="flex font-semibold">
                                            <div className="flex-grow">TOTAL</div>
                                            <div> {props.finalPrice.toFixed(2)} </div>
                                        </div>
                                        <div className="flex text-xs font-semibold">
                                            <div className="flex-grow">CANTIDAD A PAGAR</div>
                                            <div> {props.dineroEntregado.toFixed(2)} </div>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="flex text-xs font-semibold">
                                            <div className="flex-grow">CAMBIO</div>
                                            <div> {(props.dineroEntregado - props.finalPrice).toFixed(2) } </div>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="flex font-semibold">
                                            <div className="flex-grow">TOTAL</div>
                                            <div> {props.finalPrice.toFixed(2)} </div>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="flex text-xs font-semibold text-center">
                                            <div className="flex-grow">PAGO CON TARJETA</div>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                        </div>
                        <div className="px-4 pb-2 w-full flex flex-grow text-center">
                            <button className="bg-red-500 hover:bg-red-600 text-white w-1/2 h-8 hover:shadow-lg rounded-lg ml-auto flex items-center justify-center" onClick={props.handleClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white w-1/2 h-8 hover:shadow-lg rounded-lg flex items-center justify-center" onClick={addSale}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                        </div>
                </motion.div>
            </Backdrop>        
        </motion.div>
    );

}


type ResumenFila = {
    numFila: number,
    nombreProducto: string,
    cantidad: number,
    precio: number
}

const GenerarFilaProducto = (props: ResumenFila) => {
    return(
        <tr>
            <td className="py-1 w-1/12 text-center">{props.numFila}</td>
            <td className="py-1 text-left">{props.nombreProducto}</td>
            <td className="py-1 w-2/12 text-center">{props.cantidad}</td>
            <td className="py-1 w-3/12 text-right">{(props.precio * props.cantidad).toFixed(2)}</td>
        </tr>
    );
}