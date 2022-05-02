import React from "react";
import Image from "next/image";
import { Devolucion } from "../../../tipos/Devolucion";

const DevolucionTicket = React.forwardRef((props: { devolucion: Devolucion, fecha: string, qrImage: string }, ref: React.LegacyRef<HTMLDivElement>) => {
    return (
        <div className="flex flex-col gap-4 items-center bg-white rounded-2xl w-full h-auto text-xs" ref={ref}>
            <div className="w-full h-5/6 rounded-3xl bg-white z-10 ">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-center ">ERPWeb</h2>
                    <div className="text-center">Fecha: {new Date(Number(props.fecha)).toLocaleString()}</div>
                    <div className="flex flex-col text-center">
                        <div>Cliente: {props.devolucion.cliente.nombre} </div>
                        {props.devolucion.cliente.nif && props.devolucion.cliente.nif !== "General" && <div>CIF: {props.devolucion.cliente.nif} </div>}
                        {props.devolucion.cliente.calle && props.devolucion.cliente.calle !== "General" && <div>Dirección: {props.devolucion.cliente.calle} </div>}
                        {props.devolucion.cliente.cp && props.devolucion.cliente.cp !== "General" && <div>Código postal: {props.devolucion.cliente.cp} </div>}
                    </div>
                </div>
                <div id="receipt-content" className="text-left w-full h-5/6 p-4">
                    <hr />
                    <div className="w-full h-full">
                        <div className="flex w-full justify-around">
                            <p className="w-2/4 text-left font-semibold">Producto</p>
                            <p className="w-1/4 text-center font-semibold">Cantidad</p>
                            <p className="w-1/4 text-center font-semibold">Total</p>
                        </div>
                        <div className="flex flex-col gap-2 w-full h-full overflow-y-auto overflow-x-hidden pt-2">
                            {
                                props.devolucion.productosDevueltos.map((prod, index) => {
                                    if (prod.dto) {
                                        return <GenerarFilaProducto key={"modalRes" + prod._id} numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} />
                                    }
                                    else {
                                        return <GenerarFilaProducto key={"modalRes" + prod._id} numFila={index + 1} nombreProducto={prod.nombre} cantidad={Number(prod.cantidadVendida)} />
                                    }
                                })
                            }
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-evenly w-full h-auto items-center">
                Dinero devuelto al cliente: {props.devolucion.dineroDevuelto.toFixed(2)}€
            </div>
            <div className="flex justify-center">
                <Image src={props.qrImage} layout="fixed" width={50} height={50} />
            </div>

            <div className="flex flex-col pb-2">
                <span>
                    ¡Ha sido un placer atenderle! Vuelva siempre
                </span>
                <hr />
            </div>
        </div>
    )
});

DevolucionTicket.displayName = 'Ticket de devolución';

export default DevolucionTicket;


const GenerarFilaProducto = (props: { numFila: number, nombreProducto: string, cantidad: number }) => {
    return (
        <div className="flex w-full">
            <div className="w-3/4 text-left">
                {props.nombreProducto}
            </div>
            <div className="w-1/4 text-center">
                {props.cantidad}
            </div>
        </div>
    );
}