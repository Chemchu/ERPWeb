import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ProductoVendido } from "../../../../../tipos/ProductoVendido";
import { IsPositiveIntegerNumber } from "../../../../../utils/validator";

const DevolucionFila = (props: { producto: ProductoVendido, productosMarcadosMap: Map<string, number>, setProductosMarcados: Function }) => {
    const [cantidad, setCantidad] = useState<string>(String(props.producto.cantidadVendida));
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (checked) {
            const prodsMap = new Map(props.productosMarcadosMap);

            if (prodsMap.has(props.producto._id)) { return }
            if (Number(cantidad) <= 0) { return }

            prodsMap.set(props.producto._id, Number(cantidad))
            props.setProductosMarcados(prodsMap)
        }
        else {
            if (!props.productosMarcadosMap.has(props.producto._id)) { return; }

            const prodsMap = new Map(props.productosMarcadosMap);
            prodsMap.delete(props.producto._id)
            props.setProductosMarcados(prodsMap)
        }
    }, [checked])

    useEffect(() => {
        if (!checked) { return; }

        const prodsMap = new Map(props.productosMarcadosMap);

        prodsMap.set(props.producto._id, Number(cantidad))
        props.setProductosMarcados(prodsMap)
    }, [cantidad])


    const ValueInput = (e: string) => {
        if (!IsPositiveIntegerNumber(e)) { return }
        if (e === "") { setCantidad(""); return; }
        if (Number(e) === 0) { setCantidad("1"); return; }
        if (Number(e) > props.producto.cantidadVendida) { return }

        setCantidad(e)
    }

    const AddCantidad = () => {
        setCantidad((cantidad) => {
            let c = Number(cantidad);

            if (cantidad === "") { c = 1 }
            if (isNaN(c)) { c = 1 }
            if (Number(cantidad) >= props.producto.cantidadVendida) { return cantidad }

            return String(c + 1)
        })
    }

    const SubCantidad = () => {
        setCantidad((cantidad) => {
            let c = Number(cantidad);

            if (cantidad === "") { c = 1 }
            if (isNaN(c)) { c = 1 }
            if (c <= 1) { return "1" }
            if (Number(cantidad) > props.producto.cantidadVendida) { return cantidad }

            return String(c - 1)
        })
    }

    const OnFocusLost = () => {
        if (Number(cantidad) <= 0 && checked) { setCantidad("1") }
    }

    return (
        <li className="flex gap-2 items-center justify-start border-2 rounded-md px-2 py-1 hover:border-blue-400 hover:bg-blue-100">
            <input type="checkbox" name={`checkbox::${props.producto._id}`} id={`idInput::${props.producto._id}`}
                className="cursor-pointer"
                checked={checked} onChange={() => { setChecked((isChecked) => !isChecked) }} />
            <span className="w-full cursor-pointer h-full"
                onClick={() => { setChecked((isChecked) => !isChecked) }}>
                {props.producto.nombre}
            </span>
            <AnimatePresence>
                {
                    checked &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex gap-1 items-center">
                        <button className={`${cantidad === "1" ? 'bg-blue-300 cursor-default' : 'bg-blue-500 hover:bg-blue-600'} rounded w-10 h-8 text-white font-bold`} onClick={SubCantidad}>-</button>
                        <input type="text" className="w-12 xl:w-20 border-2 border-blue-400 focus:outline-blue-500 rounded-md text-center"
                            value={cantidad}
                            onBlur={OnFocusLost}
                            onChange={(e) => ValueInput(e.currentTarget.value)} />
                        <button className={`${Number(cantidad) === props.producto.cantidadVendida ? 'bg-blue-300 cursor-default' : 'bg-blue-500 hover:bg-blue-600'} rounded w-10 h-8 text-white font-bold`} onClick={AddCantidad}>+</button>
                    </motion.div>
                }
            </AnimatePresence>
        </li>
    )
}

export default DevolucionFila;