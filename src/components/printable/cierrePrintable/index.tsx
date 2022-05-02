import React from "react";
import Image from "next/image";
import { Cierre } from "../../../tipos/Cierre";

const CierrePrintable = React.forwardRef((props: { tpv: string, cierre: Cierre, qrImage: string }, ref: React.LegacyRef<HTMLDivElement>) => {
    return (
        <div className="flex flex-col gap-4 items-center bg-white rounded-2xl w-full h-auto text-xs" ref={ref}>
            <div className="w-full h-5/6 rounded-3xl bg-white z-10 ">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-center ">ERPWeb</h2>
                    <div className="text-center">TPV: {props.tpv}</div>
                    <div className="text-center">Abierto por: {props.cierre.abiertoPor.nombre}, {props.cierre.abiertoPor.email}</div>
                    <div className="text-center">Abierto: {new Date(Number(props.cierre.apertura)).toLocaleString()}</div>
                    <div className="text-center">Cerrado por: {props.cierre.cerradoPor.nombre}, {props.cierre.cerradoPor.email}</div>
                    <div className="text-center">Cerrado: {new Date(Number(props.cierre.cierre)).toLocaleString()}</div>
                </div>
                <div className="flex flex-col w-full h-5/6 p-4 text-base">
                    <hr className="py-1" />
                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Caja inicial</p>
                        <p className="self-center">{props.cierre.cajaInicial.toFixed(2)}€</p>
                    </div>
                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Caja final esperada</p>
                        <p className="self-center">{props.cierre.dineroEsperadoEnCaja.toFixed(2)}€</p>
                    </div>
                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Caja final real</p>
                        <p className="self-center">{props.cierre.dineroRealEnCaja.toFixed(2)}€</p>
                    </div>

                    {
                        props.cierre.dineroRealEnCaja - props.cierre.dineroEsperadoEnCaja >= 0 ?
                            <div className="flex w-full h-full justify-between align-middle">
                                <p>Sobra</p>
                                <p className="self-center">{(props.cierre.dineroRealEnCaja - props.cierre.dineroEsperadoEnCaja).toFixed(2)}€</p>
                            </div>
                            :
                            <div className="flex w-full h-full justify-between align-middle">
                                <p>Falta</p>
                                <p className="self-center">{(props.cierre.dineroRealEnCaja - props.cierre.dineroEsperadoEnCaja).toFixed(2)}€</p>
                            </div>
                    }

                    <hr className="py-1" />

                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Total vendido</p>
                        <p className="self-center">{props.cierre.ventasTotales.toFixed(2)}€</p>
                    </div>

                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Total en efectivo</p>
                        <p className="self-center">{props.cierre.ventasEfectivo.toFixed(2)}€</p>
                    </div>

                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Total en tarjeta</p>
                        <p className="self-center">{props.cierre.ventasTarjeta.toFixed(2)}€</p>
                    </div>
                    <hr className="py-1" />

                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Dinero retirado de caja</p>
                        <p className="self-center">{props.cierre.dineroRetirado.toFixed(2)}€</p>
                    </div>
                    <div className="flex w-full h-full justify-between align-middle">
                        <p>Fondo de caja dejado</p>
                        <p className="self-center">{props.cierre.fondoDeCaja.toFixed(2)}€</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Image src={props.qrImage} layout="fixed" width={50} height={50} />
            </div>

            <hr />
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