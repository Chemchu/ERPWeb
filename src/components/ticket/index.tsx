import React from "react";
import { CustomerPaymentInformation } from "../../tipos/CustomerPayment";
import { ProductoVendido } from "../../tipos/ProductoVendido";
import Image from "next/image";

const Ticket = React.forwardRef((props: { pagoCliente: CustomerPaymentInformation, productosVendidos: ProductoVendido[], qrImage: string | undefined }, ref: React.LegacyRef<HTMLDivElement>) => {
    return (
        <div className="flex flex-col gap-4 items-center bg-white rounded-2xl w-full h-auto text-xs" ref={ref}>
            <div className="w-full h-5/6 rounded-3xl bg-white z-10 ">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-center ">ERPWeb</h2>
                    <div className="text-center">Fecha: </div>
                    <div className="flex flex-col text-center">
                        <div>Cliente: {props.pagoCliente.cliente.nombre} </div>
                        {props.pagoCliente.cliente.nif && props.pagoCliente.cliente.nif !== "General" && <div>CIF: {props.pagoCliente.cliente.nif} </div>}
                        {props.pagoCliente.cliente.calle && props.pagoCliente.cliente.calle !== "General" && <div>Dirección: {props.pagoCliente.cliente.calle} </div>}
                        {props.pagoCliente.cliente.cp && props.pagoCliente.cliente.cp !== "General" && <div>Código postal: {props.pagoCliente.cliente.cp} </div>}
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
                                props.productosVendidos.map((prod, index) => {
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
            <div className="flex flex-col justify-evenly w-full h-auto items-center">
                <div className="font-semibold">
                    {props.pagoCliente.tipo}
                </div>
                <div>
                    Precio total: {props.pagoCliente.precioTotal.toFixed(2)}€
                </div>
                <div>
                    Cambio: {props.pagoCliente.cambio.toFixed(2)}€
                </div>
                <div>
                    Pagado con efectivo: {props.pagoCliente.pagoEnEfectivo.toFixed(2)}€
                </div>
                <div>
                    Pagado con tarjeta: {props.pagoCliente.pagoEnTarjeta.toFixed(2)}€
                </div>
            </div>
            {
                props.qrImage &&
                <div className="flex justify-center">
                    <Image src={props.qrImage} layout="fixed" width={50} height={50} />
                </div>
            }

            <div className="flex flex-col pb-2">
                <span>
                    ¡Gracias por su compra! Vuelva siempre
                </span>
                <hr />
            </div>
        </div>

    )
});

export default Ticket


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