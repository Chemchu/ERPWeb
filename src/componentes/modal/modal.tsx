import { Backdrop } from "../backdrop.js/dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useDBClients } from "../pointOfSale/clientContext";
import { ModalProps } from "../../tipos/ModalProps";
import { Client } from "../../tipos/Client";
import { useConsumerMoney } from "../pointOfSale/productsContext";
import { Teclado } from "../teclado/tecladoPago";
import { InputDinero } from "../input/inputDinero";

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
    
    const [dineroEntregado, setDineroEntregado] = useConsumerMoney();

    let date = new Date();
    const fechaActual = `${date.getDate().toLocaleString('es-ES', { minimumIntegerDigits: 2})}/${parseInt(date.getUTCMonth().toLocaleString('es-ES', { minimumIntegerDigits: 2})) + 1}/${date.getFullYear()} - ${date.getHours().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getMinutes().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getSeconds().toLocaleString('es-ES', { minimumIntegerDigits: 2})}`;

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
                <motion.div className="mx-20 my-20 flex flex-grow items-center bg-white rounded-2xl" 
                    onClick={(e) => e.stopPropagation()} 
                    variants={In} 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >     

                    <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                        {/* <div className="text-center">
                            <h1 className="text-4xl font-semibold">ERPWeb</h1>
                        </div> */}

                        <div className="grid grid-cols-2">
                            <div className="bg-white text-center justify-center py-6">
                                <div>
                                    <div className="text-2xl font-semibold">Datos cliente</div>
                                    <hr/>
                                    <div className="grid grid-cols-2 grid-rows-1 mt-4 text-xs text-center justify-center">
                                        <div className="text-left relative ">Cliente: {props.cliente.nombre? props.cliente.nombre : "general"} </div>
                                        <div className="text-right relative "> {fechaActual} </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center justify-center py-6">
                                <div>
                                    <div className="text-2xl font-semibold">Método de pago</div>
                                    <hr/>

                                    <div className="grid grid-rows-2 grid-cols-2 justify-items-center gap-6 p-10 ">
                                        <div className="text-xl">
                                            Efectivo
                                        </div>
                                        <div className="text-xl">
                                            <InputDinero inputDinero={dineroEntregado} setDinero={setDineroEntregado}/>
                                        </div>
                                        <div className="text-xl col-end-auto">
                                            Tarjeta
                                        </div>
                                        <div className="text-xl">
                                            <InputDinero inputDinero={dineroEntregado} setDinero={setDineroEntregado}/>
                                        </div>
                                    </div>
                                    {/* <h2 className="py-6 text-lg font-semibold">PRECIO TOTAL: {props.finalPrice.toFixed(2)}€</h2> */}
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg h-8 w-full">Efectivo</button>
                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg h-8 w-full">Tarjeta</button> */}
                                        {/* <div className="py-6 pb-0 text-xl">
                                            <Teclado numInput={dineroEntregado} setNumInput={setDineroEntregado} tipoPago={"Efectivo"}/>
                                            {
                                                parseFloat(dineroEntregado) > 0 && (props.dineroEntregado - props.finalPrice) >= 0 ?
                                                <div className="flex mb-3 text-lg font-semibold bg-green-100 rounded-lg py-2 px-3">
                                                    <div className="text-green-600">CAMBIO</div>
                                                    <div className="text-right flex-grow text-green-600">
                                                        {(props.dineroEntregado - props.finalPrice).toFixed(2)} €
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                            {
                                                parseFloat(dineroEntregado) - props.finalPrice < 0 &&
                                                <div className="flex mb-3 text-lg font-semibold bg-pink-100 text-blue-gray-700 rounded-lg py-2 px-3">
                                                    <div className="text-right flex-grow text-pink-600">
                                                        <span className="inline-block ml-1">{(props.dineroEntregado - props.finalPrice).toFixed(2)} €</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="">
                                            Tarjeta
                                        </div> */}
                                    </div>
                                    {/* <div className="grid grid-rows-2 text-left">
                                        <div>Efectivo</div>
                                        <div>Tarjeta</div>
                                    </div> */}
                                </div>

                                <div className="grid grid-cols-3">
                                    <div>Total a pagar</div>
                                    <div>Tipo de pago actual</div>
                                    <div>Pendiente</div>
                                </div>

                            </div>
                        </div>

                        <hr className="my-2"/>
                        <div className="grid grid-cols-2 justify-items-center">
                            <button className="bg-red-500 hover:bg-red-600 text-white w-full h-10 hover:shadow-lg rounded-lg flex items-center justify-center" onClick={props.handleClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white w-full h-10 hover:shadow-lg rounded-lg flex items-center justify-center" onClick={addSale}>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg> */}
                                <div className="text-lg">Completar venta</div>
                            </button>
                        </div>
                    </div>
                    
                </motion.div>
            </Backdrop>        
        </motion.div>
    );
}

export const ModalResumenCompra = (props: ModalProps) => {
    const [cliente, ] = useState<Client>({nif: 'Genérico', calle: '', cp: '', nombre: 'Genérico'} as Client);
    const [customers, ] = useDBClients();

    let date = new Date();
    const fechaActual = `${date.getDate().toLocaleString('es-ES', { minimumIntegerDigits: 2})}/${parseInt(date.getUTCMonth().toLocaleString('es-ES', { minimumIntegerDigits: 2})) + 1}/${date.getFullYear()} - ${date.getHours().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getMinutes().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getSeconds().toLocaleString('es-ES', { minimumIntegerDigits: 2})}`;

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
                            <div className="grid grid-cols-2 grid-rows-1 mt-4 text-xs text-center justify-center">
                                <div className="text-left relative ">Cliente: {props.cliente.nombre? props.cliente.nombre : "general"} </div>
                                <div className="text-right relative "> {fechaActual} </div>
                            </div>
                            <hr className="my-2"/>
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
                                            <div> {props.finalPrice.toFixed(2)}€</div>
                                        </div>
                                        <div className="flex text-xs font-semibold">
                                            <div className="flex-grow">CANTIDAD A PAGAR</div>
                                            <div> {props.dineroEntregado.toFixed(2)}€</div>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="flex text-xs font-semibold">
                                            <div className="flex-grow">CAMBIO</div>
                                            <div> {(props.dineroEntregado - props.finalPrice).toFixed(2) }€ </div>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="flex font-semibold">
                                            <div className="flex-grow">TOTAL</div>
                                            <div> {props.finalPrice.toFixed(2)}€ </div>
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
            <td className="py-1 w-3/12 text-right">{(props.precio * props.cantidad).toFixed(2)}€</td>
        </tr>
    );
}