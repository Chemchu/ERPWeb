import { gql, useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import useClientContext from "../../../context/clientContext";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { parseJwt } from "../../../utils/parseJwt";
import { Backdrop } from "../backdrop";

const In = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 15,
            stifness: 500
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition: {
            duration: 0.25,
        }
    }
}

const ADD_SALE = gql`
    mutation addVenta($fields: VentaFields!) {
        addVenta(fields: $fields) {
            message
            successful
        }
    }`
    ;


export const Resumen = (props: {
    productosVendidos: ProductoVendido[], setProductosCarrito: Function,
    pagoCliente: CustomerPaymentInformation, handleCloseResumen: Function, handleCloseAll: Function
}) => {
    const [addVentasToDB, { data, loading, error }] = useMutation(ADD_SALE);
    const { Clientes, } = useClientContext();

    let date = new Date();
    const fechaActual = `${date.getDate().toLocaleString('es-ES', { minimumIntegerDigits: 2 })}/${parseInt(date.getUTCMonth().toLocaleString('es-ES', { minimumIntegerDigits: 2 })) + 1}/${date.getFullYear()} - ${date.getHours().toLocaleString('es-ES', { minimumIntegerDigits: 2 })}:${date.getMinutes().toLocaleString('es-ES', { minimumIntegerDigits: 2 })}:${date.getSeconds().toLocaleString('es-ES', { minimumIntegerDigits: 2 })}`;

    const addSale = async () => {
        const authCookie = Cookies.get("authorization")
        if (!authCookie) { return; }

        let cliente;

        if (!props.pagoCliente.cliente) {
            cliente = Clientes.find((c) => c.nombre === "General");
        }
        else {
            cliente = props.pagoCliente.cliente;
        }

        const jwt = parseJwt(authCookie);
        await addVentasToDB({
            variables: {
                "fields": {
                    "productos": props.productosVendidos,
                    "dineroEntregadoEfectivo": props.pagoCliente.pagoEnEfectivo,
                    "dineroEntregadoTarjeta": props.pagoCliente.pagoEnTarjeta,
                    "precioVentaTotal": props.pagoCliente.precioTotal,
                    "tipo": props.pagoCliente.tipo,
                    "cambio": props.pagoCliente.cambio,
                    "cliente": cliente?._id,
                    "vendidoPor": jwt._id,
                    "modificadoPor": jwt._id,
                    "descuentoEfectivo": props.pagoCliente.dtoEfectivo || 0,
                    "descuentoPorcentaje": props.pagoCliente.dtoPorcentaje || 0,
                    "tpv": jwt.TPV
                }
            }
        });

        if (!error && !loading) {
            props.handleCloseAll();
            props.setProductosCarrito([]);

        }
        else {
            console.log("Error al realizar la venta");
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={() => { props.handleCloseResumen() }} >
                <motion.div className="m-auto py-2 flex flex-col items-center bg-white rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="sm:w-96 w-96 rounded-3xl bg-white z-10 self">
                        <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">ERPWeb</h2>
                                <p> Resumen de la compra </p>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-1 mt-4 text-xs text-center justify-center">
                                {/* <div className="text-left relative ">Cliente: {props.pagoCliente.cliente.nombre} </div> */}
                                <div className="text-right relative text-black"> {fechaActual} </div>
                            </div>
                            <hr className="my-2" />
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
                                            props.productosVendidos.map((prod, index) => {
                                                if (prod.dto) {
                                                    return <GenerarFilaProducto key={"modalRes" + prod._id} numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} precio={Number(prod.precioVenta * (1 - Number(prod.dto) / 100))} />
                                                }
                                                else {
                                                    return <GenerarFilaProducto key={"modalRes" + prod._id} numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} precio={prod.precioVenta} />
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between">
                                <div className="font-semibold self-center">
                                    {props.pagoCliente.tipo}
                                </div>
                                <div>
                                    <div>
                                        Total: {props.pagoCliente.precioTotal.toFixed(2)}€
                                    </div>
                                    <div className="">
                                        Cambio: {props.pagoCliente.cambio.toFixed(2)}€
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 pb-2 w-full flex flex-grow text-center gap-2">
                        <button className="bg-red-500 hover:bg-red-600 text-white w-1/2 h-8 hover:shadow-lg rounded-lg ml-auto flex items-center justify-center" onClick={() => props.handleCloseResumen()}>
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

const GenerarFilaProducto = (props: { numFila: number, nombreProducto: string, cantidad: number, precio: number }) => {
    return (
        <tr>
            <td className="py-1 w-1/12 text-center">{props.numFila}</td>
            <td className="py-1 text-left">{props.nombreProducto}</td>
            <td className="py-1 w-2/12 text-center">{props.cantidad}</td>
            <td className="py-1 w-3/12 text-right">{(props.precio * props.cantidad).toFixed(2)}€</td>
        </tr>
    );
}

export default Resumen;