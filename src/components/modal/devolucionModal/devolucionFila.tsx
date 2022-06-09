import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { IsPositiveIntegerNumber } from "../../../utils/validator";

const DevolucionFila = (props: { producto: ProductoVendido }) => {
    const [cantidad, setCantidad] = useState<string>("");
    const [checked, setChecked] = useState<boolean>(false);

    const ValueInput = (e: string) => {
        if (!IsPositiveIntegerNumber(e)) { return }

        setCantidad(e)
    }

    const AddCantidad = () => {
        setCantidad((cantidad) => {
            let c = Number(cantidad);

            if (isNaN(c)) { c = 0 }

            return String(c + 1)
        })
    }

    const SubCantidad = () => {
        setCantidad((cantidad) => {
            let c = Number(cantidad);

            if (isNaN(c)) { c = 0 }
            if (c <= 0) { return "0" }

            return String(c - 1)
        })
    }

    return (
        <li className="flex gap-2 items-center justify-start border-2 rounded-md px-2 py-1">
            <input type="checkbox" name={`checkbox::${props.producto._id}`} id={`idInput::${props.producto._id}`}
                onChange={() => { setChecked((isChecked) => !isChecked) }} />
            <span className="w-full">
                {props.producto.nombre}
            </span>
            <AnimatePresence>
                {
                    checked &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex gap-1 items-center">
                        <button className="bg-blue-400 hover:bg-blue-500 rounded w-10 h-8 text-white font-bold" onClick={SubCantidad}>-</button>
                        <input type="text" className="w-12 xl:w-20 border-2 border-blue-400 focus:outline-blue-500 rounded-md text-center"
                            value={cantidad}
                            onChange={(e) => ValueInput(e.currentTarget.value)} />
                        <button className="bg-blue-400 hover:bg-blue-500 rounded w-10 h-8 text-white font-bold" onClick={AddCantidad}>+</button>
                    </motion.div>
                }
            </AnimatePresence>
        </li>
    )
}

export default DevolucionFila;