import JsBarcode from "jsbarcode";
import React, { useEffect, useState } from "react";
import { notifyError } from "../../utils/toastify";

const Etiqueta = React.forwardRef((props: { nombre: string, ean: string, precio: number }, ref: React.LegacyRef<HTMLDivElement>) => {
    useEffect(() => {
        try {
            JsBarcode("#ean-13", props.ean, { format: "ean13", background: "#ffffff", height: 20, displayValue: true });
        }
        catch (e) {
            notifyError("El código EAN de este producto es inválido. No se mostrará el código de barras en la etiqueta")
        }

    }, [])

    return (
        <div className="flex flex-col gap-1 items-center bg-white rounded-2xl w-full h-auto text-sm p-2" ref={ref}>
            <div className="flex justify-between w-full text-center">
                <span className="text-left w-full">
                    {props.nombre}
                </span>
                <span className="w-full text-xl text-right">
                    {props.precio.toFixed(2)}€
                </span>
            </div>
            <svg id="ean-13" />
        </div>
    );
});

export default Etiqueta;