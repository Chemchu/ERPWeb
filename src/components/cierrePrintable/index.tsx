import React from "react";
import Image from "next/image";
import { Cierre } from "../../tipos/Cierre";

const CierrePrintable = React.forwardRef((props: { tpv: string, cierre: Cierre, qrImage: string }, ref: React.LegacyRef<HTMLDivElement>) => {
    return (
        <div className="flex flex-col gap-4 items-center bg-white rounded-2xl w-full h-auto text-xs" ref={ref}>
            <div className="w-full h-5/6 rounded-3xl bg-white z-10 ">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-center ">ERPWeb</h2>
                    <div className="text-center">Fecha: {new Date(Number(props.cierre.cierre)).toLocaleString()}</div>
                    <div className="flex flex-col text-center">

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

                        </div>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-evenly w-full h-auto items-center">
                <div className="font-semibold">

                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
            <div className="flex justify-center">
                <Image src={props.qrImage} layout="fixed" width={50} height={50} />
            </div>

            <div className="flex flex-col pb-2">
                <span>
                    ¡Gracias por su compra! Vuelva siempre
                </span>
                <hr />
            </div>
        </div>

    )
});

CierrePrintable.displayName = 'Ticket';

export default CierrePrintable;


const GenerarFila = (props: { numFila: number, nombreProducto: string, cantidad: number, precio: number }) => {
    return (
        <div className="flex w-full">
            <div className="w-3/5 text-left">
                {props.nombreProducto}
            </div>
            <div className="w-1/5 text-center">
                {props.cantidad}
            </div>
            <div className="w-1/5 text-center">
                {(props.precio * props.cantidad).toFixed(2)}€
            </div>
        </div>
    );
}