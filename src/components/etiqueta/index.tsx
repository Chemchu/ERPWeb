import React, { useEffect, useState } from "react";
import { useBarcode } from "react-barcodes";

const Etiqueta = React.forwardRef((props: { nombre: string, ean: string, precio: number }, ref: React.LegacyRef<HTMLDivElement>) => {
    const { inputRef } = useBarcode({
        value: props.ean,
        options: {
            background: '#ffffff',
            height: 25,
            displayValue: false
        }
    });

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
            <svg ref={inputRef} />
        </div>
    );
});

export default Etiqueta;