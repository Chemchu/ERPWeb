import JsBarcode from "jsbarcode";
import React, { useEffect } from "react";
import { notifyWarn } from "../../../utils/toastify";

const Etiqueta = React.forwardRef((props: { nombre: string, ean: string, precio: number }, ref: React.LegacyRef<HTMLDivElement>) => {
    useEffect(() => {
        try {
            JsBarcode("#ean-13", props.ean, { format: "ean13", background: "#ffffff", height: 10, displayValue: true, fontSize: 20 });
        }
        catch (e) {
            notifyWarn("EAN inválido. El código de barras no estará en la etiqueta");
        }
    }, [])

    return (
        <div ref={ref} className="flex flex-col items-center bg-white w-full h-auto p-3">
            <span className="text-left w-full line-clamp-3">
                {props.nombre}
            </span>
            <div className="flex justify-between items-center w-full text-center text-lg px-2">
                <svg id="ean-13" />
                <span className="w-1/3 text-4xl text-right font-semibold">
                    {props.precio.toFixed(2)}€
                </span>
            </div>
        </div>
    );
});

Etiqueta.displayName = "Etiqueta"
export default Etiqueta;