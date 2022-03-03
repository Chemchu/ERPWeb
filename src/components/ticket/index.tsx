import React from "react";
import { CustomerPaymentInformation } from "../../tipos/CustomerPayment";
import { ProductoVendido } from "../../tipos/ProductoVendido";

export class Ticket extends React.PureComponent<{ pagoCliente: CustomerPaymentInformation, productosVendidos: ProductoVendido[] }> {
    render() {
        return (
            <div className="flex flex-col gap-4 items-center bg-white rounded-2xl w-full h-auto text-xs">
                <div className="w-full h-5/6 rounded-3xl bg-white z-10 ">
                    <div>
                        <h2 className="text-xl font-semibold text-center ">ERPWeb</h2>
                        <div className="flex justify-evenly">
                            <div className="text-left relative ">Cliente: {this.props.pagoCliente.cliente.nombre} </div>
                        </div>
                    </div>
                    <div id="receipt-content" className="text-left w-full h-5/6 p-4">
                        <hr />
                        <div className="w-full h-full">
                            <div className="flex w-full justify-around">
                                <p className="w-1/4 text-left font-semibold">#</p>
                                <p className="w-1/4 text-left font-semibold">Producto</p>
                                <p className="w-1/4 text-center font-semibold">Cantidad</p>
                                <p className="w-1/4 text-center font-semibold">Total</p>
                            </div>
                            <div className="flex flex-col gap-2 w-full h-full overflow-y-auto overflow-x-hidden pt-2">
                                {
                                    this.props.productosVendidos.map((prod, index) => {
                                        if (prod.dto) {
                                            return <GenerarFilaProducto key={"modalRes" + prod._id} numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} precio={Number(prod.precioVenta * (1 - Number(prod.dto) / 100))} />
                                        }
                                        else {
                                            return <GenerarFilaProducto key={"modalRes" + prod._id} numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} precio={prod.precioVenta} />
                                        }
                                    })
                                }
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly w-full h-auto items-center">
                    <div className="font-semibold">
                        {this.props.pagoCliente.tipo}
                    </div>
                    <div>
                        <div>
                            Total: {this.props.pagoCliente.precioTotal.toFixed(2)}€
                        </div>
                        <div>
                            Cambio: {this.props.pagoCliente.cambio.toFixed(2)}€
                        </div>
                    </div>
                </div>

                <div className="flex flex-col pb-2">
                    <span>
                        ¡Gracias por su compra! Vuelva siempre
                    </span>
                    <hr />
                </div>
            </div>
        );
    }
}

const GenerarFilaProducto = (props: { numFila: number, nombreProducto: string, cantidad: number, precio: number }) => {
    return (
        <div className="flex w-full">
            <div className="w-1/4 text-left">
                {props.numFila}
            </div>
            <div className="w-1/4 text-left">
                {props.nombreProducto}
            </div>
            <div className="w-1/4 text-center">
                {props.cantidad}
            </div>
            <div className="w-1/4 text-center">
                {(props.precio * props.cantidad).toFixed(2)}€
            </div>
        </div>
    );
}