import { Backdrop } from "../backdrop.js/dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDBClients } from "../pointOfSale/clientContext";
import { ModalProps, ModalResumenProps } from "../../tipos/ModalProps";
import { InputDinero } from "../input/inputDinero";
import { CustomerPaymentInformation } from "../../tipos/CustomerPayment";
import { TipoCobro } from "../../tipos/Enums/TipoCobro";
import axios from "axios";
import { useSelectedProducts } from "../pointOfSale/productsContext";
import AutoComplete from "../autocomplete/autocomplete";
import { Input } from "../input/input";

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
    const [customers, ] = useDBClients();
    
    const [dineroEntregado, setDineroEntregado] = useState<string>("0");
    const [dineroEntregadoTarjeta, setDineroEntregadoTarjeta] = useState<string>("0");
    const [showModalResumen, setModalResumen] = useState<boolean>(false);
    
    const [customerPayment, setCustomerPaymentInfo] = useState<CustomerPaymentInformation>({tipo: "default", efectivo: 0, tarjeta: 0});
    
    let date = new Date();
    let fechaActual = `${date.getDate().toLocaleString('es-ES', { minimumIntegerDigits: 2})}/${parseInt(date.getUTCMonth().toLocaleString('es-ES', { minimumIntegerDigits: 2})) + 1}/${date.getFullYear()} `;
    let horaActual = `${date.getHours().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getMinutes().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getSeconds().toLocaleString('es-ES', { minimumIntegerDigits: 2})}`
    let cambio: number = isNaN((Number(dineroEntregado) + Number(dineroEntregadoTarjeta) - props.finalPrice)) ? Number(dineroEntregado) + Number(dineroEntregadoTarjeta) : (Number(dineroEntregado) + Number(dineroEntregadoTarjeta) - props.finalPrice);
    let tipoCobro: TipoCobro = TipoCobro.Efectivo;
    
    const SetDineroClienteEfectivo = (dineroDelCliente: string) => {
        if(!dineroDelCliente.match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$") && dineroDelCliente != "") return;
        setDineroEntregado(dineroDelCliente);
    }

    const SetDineroClienteTarjeta = (dineroDelCliente: string) => {
        if(!dineroDelCliente.match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$") && dineroDelCliente != "") return;
        setDineroEntregadoTarjeta(dineroDelCliente);
    }

    const OpenResumen = () => {
        switch(tipoCobro) {
            case TipoCobro.Efectivo:
                setCustomerPaymentInfo({tipo: "Efectivo", efectivo: Number(dineroEntregado), tarjeta: Number(dineroEntregadoTarjeta) });
                break;
            case TipoCobro.Tarjeta:
                setCustomerPaymentInfo({tipo: "Tarjeta", efectivo: Number(dineroEntregado), tarjeta: Number(dineroEntregadoTarjeta)});
                break;
            case TipoCobro.Fraccionado:
                setCustomerPaymentInfo({tipo: "Fraccionado", efectivo: Number(dineroEntregado), tarjeta:Number(dineroEntregadoTarjeta)});
                break;
        }
        setModalResumen(true);
    }

    const CloseResumen = (): void => {
        setModalResumen(false);
    }

    if(Number(dineroEntregado) > 0 && Number(dineroEntregadoTarjeta) <= 0) tipoCobro = TipoCobro.Efectivo;
    if(Number(dineroEntregadoTarjeta) > 0) {
        tipoCobro = TipoCobro.Tarjeta;
        if(Number(dineroEntregado) > 0) {
            tipoCobro = TipoCobro.Fraccionado;
        }
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
                        <div className="grid grid-cols-2">
                            {/* Parte izquierda, datos cliente */}
                            <div className="bg-white text-center justify-center py-6">
                                <div>
                                    <div className="text-2xl font-semibold">Datos cliente</div>
                                    <hr/>                                    
                                    <div className="text-lg text-left px-2 pt-4">Fecha: {fechaActual} </div>
                                    <div className="text-lg text-left px-2">Hora: {horaActual} </div>
                                    <div className="flex justify-between mt-4 px-2  text-lg text-center">
                                        <AutoComplete className="text-left text-lg w-80" sugerencias={["Luca Lee","Simone","Miguel"]} nombreInput="Cliente" placeholder="General"/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 py-6 px-2 gap-10 justify-items-start">
                                    <div className="text-left w-80">
                                        <h1 className="text-lg">Nombre completo</h1>
                                        <Input placeholder="Nombre del cliente"/>
                                    </div>
                                    <div className="text-left w-80">
                                        <h1 className="text-lg">Dirección completa</h1>
                                        <Input placeholder="Ejem.: Calle Alcalá 14"/>
                                    </div>
                                    <div className="text-left w-80">
                                        <h1 className="text-lg">NIF</h1>
                                        <Input placeholder="Número de identificación fiscal"/>
                                    </div>
                                    <div className="text-left w-80">
                                        <h1 className="text-lg">Código postal</h1>
                                        <Input placeholder="Ejem.: 46006"/>
                                    </div>
                                </div> 
                            </div>
                            {/* Parte derecha, forma de pago */}
                            <div className="text-center justify-center py-6">
                                <div>
                                    <div className="text-2xl font-semibold">Método de pago</div>
                                    <hr/>
                                    <div className="grid grid-cols-2 justify-items gap-6 p-10">
                                        <div>
                                            <div className="text-xl text-left">
                                                Efectivo
                                            </div>
                                            <div className="text-xl">
                                                <InputDinero inputDinero={dineroEntregado} setDinero={SetDineroClienteEfectivo}/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xl text-left">
                                                Tarjeta
                                            </div>
                                            <div className="text-xl">
                                                <InputDinero inputDinero={dineroEntregadoTarjeta} setDinero={SetDineroClienteTarjeta}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 text-lg text-center justify-center">
                                    <div>
                                        <div>Total a pagar</div>
                                        <div className="text-4xl font-semibold">{props.finalPrice.toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div>Dinero entregado</div>
                                        <div className="text-4xl font-semibold">{isNaN(Number(dineroEntregado) + Number(dineroEntregadoTarjeta)) ? "0.00" : (Number(dineroEntregado) + Number(dineroEntregadoTarjeta)).toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div>{cambio < 0 ? 'Pendiente' : 'Cambio'}</div>
                                        <div className={`text-4xl font-semibold ${cambio < 0 ? "text-red-500" : "text-green-500"}`}>{cambio.toFixed(2)}€</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <hr className="my-2"/>
                        <div className="grid grid-cols-2 justify-items-center">
                            <button className="bg-red-500 hover:bg-red-600 text-white w-full h-12 hover:shadow-lg rounded-lg flex items-center justify-center" onClick={props.handleClose}>
                                <div className="text-lg">CANCELAR</div>
                            </button>
                            {cambio < 0 ? 
                                <button className="bg-blue-400 text-white w-full h-12 cursor-default rounded-lg flex items-center justify-center">
                                    <div className="text-lg">DINERO INSUFICIENTE</div>
                                </button>
                                :
                                <button className="bg-blue-500 hover:bg-blue-600 text-white w-full h-12 hover:shadow-lg rounded-lg flex items-center justify-center" onClick={OpenResumen}>
                                    <div className="text-lg">COMPLETAR VENTA</div>
                                </button>
                            }
                        </div>
                        <AnimatePresence>
                            {showModalResumen && <ModalResumenCompra customerPayment={customerPayment} cliente={props.cliente} customerProducts={props.customerProducts} finalPrice= {props.finalPrice} cambio={cambio} handleClose={CloseResumen} tipoCobro={tipoCobro} />}
                        </AnimatePresence>  
                    </div>
                    
                </motion.div>
            </Backdrop>        
        </motion.div>
    );
}

type ProductoComprado = {
    _id: string,
    cantidad: number,
    dto: number
}

export const ModalResumenCompra = (props: ModalResumenProps) => {
    let date = new Date();

    const [customers, ] = useDBClients();
    const [, SetProductos] = useSelectedProducts();
    const fechaActual = `${date.getDate().toLocaleString('es-ES', { minimumIntegerDigits: 2})}/${parseInt(date.getUTCMonth().toLocaleString('es-ES', { minimumIntegerDigits: 2})) + 1}/${date.getFullYear()} - ${date.getHours().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getMinutes().toLocaleString('es-ES', { minimumIntegerDigits: 2})}:${date.getSeconds().toLocaleString('es-ES', { minimumIntegerDigits: 2})}`;

    const addSale = async() => {
        const clienteSeleccionado = customers.filter(c => c.nif == props.cliente.nif)[0];
        const erpBackURL = process.env.REACT_APP_ERP_BACKURL;
        const productosComprados: ProductoComprado[] = [];
        props.customerProducts.forEach(p => 
            {
                const pComprado = { _id: p._id, precioUnidad: p.precioVenta, cantidad: p.cantidad, dto: p.dto } as unknown as ProductoComprado;
                productosComprados.push(pComprado);
            }
        );
        
        const data = {
            productos: productosComprados,
            precioVentaTotal: props.finalPrice,
            precioVentaEfectivo: props.customerPayment.efectivo,
            precioVentaTarjeta: props.customerPayment.tarjeta,
            cambio: props.cambio,
            cliente: clienteSeleccionado,
            tipo: props.tipoCobro
        }

        const res = await axios.put(`${erpBackURL}api/ventas/add`, data);

        if(res.status == 200) {
            SetProductos(null);
            props.handleClose();
        }
        else {
            console.log("Error al realizar la venta");
        }
    }

    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity:0 }} >
            <Backdrop onClick={() => props.handleClose()} >
                <motion.div className="m-auto py-2 flex flex-col items-center bg-white rounded-2xl" 
                    onClick={(e) => e.stopPropagation()} 
                    variants={In} 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >     

                    <div className="sm:w-96 w-96 rounded-3xl bg-white z-10">
                        <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">ERPWeb</h2>
                                <p> Resumen de la compra </p>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-1 mt-4 text-xs text-center justify-center">
                                <div className="text-left relative ">Cliente: {props.cliente.nombre} </div>
                                <div className="text-right relative text-black"> {fechaActual} </div>
                            </div>
                            <hr className="my-2"/>
                            <div>
                            <table className="w-full text-xs">
                                <thead>
                                    <tr>
                                        <th className="py-1 w-1/12 text-center">#</th>
                                        <th className="py-1 text-left">Producto</th>
                                        <th className="py-1 w-2/12 text-center">Cantidad</th>
                                        <th className="py-1 w-3/12 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="h-full overflow-y-auto">
                                {
                                    props.customerProducts.map((prod, index) => {
                                        return <GenerarFilaProducto key={"modalRes" + prod._id} numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidad)} precio={Number(prod.precioVenta * (1 - prod.dto/100) )} />
                                    })
                                }
                                </tbody>
                            </table>
                            </div>
                            <hr className="my-2" />              
                            <div className="flex justify-between">
                                <div className="font-semibold self-center">
                                    Pago en {props.tipoCobro.toLowerCase()}
                                </div>
                                <div>
                                    <div>
                                        Total: {props.finalPrice.toFixed(2)}€
                                    </div>
                                    <div className="">
                                        Cambio: {props.cambio.toFixed(2)}€
                                    </div>
                                </div>
                            </div>                  
                        </div>
                    </div>
                    <div className="px-4 pb-2 w-full flex flex-grow text-center gap-2">
                        <button className="bg-red-500 hover:bg-red-600 text-white w-1/2 h-8 hover:shadow-lg rounded-lg ml-auto flex items-center justify-center" onClick={() => props.handleClose()}>
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