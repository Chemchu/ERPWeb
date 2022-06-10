import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";
import { IsPositiveIntegerNumber } from "../../../utils/validator";

const ContarCaja = (props: { showItself: Function, setTotal: Function, desglose: Map<number, number>, setDesglose: Function }) => {
    const ContarDinero = () => {
        let t = 0;
        props.desglose.forEach((cantidad, moneda) => {
            t += cantidad * moneda
        })

        props.setTotal(t)
    }

    const ResetDinero = () => {
        props.setDesglose(new Map<number, number>());
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop onClick={(e) => { e.stopPropagation(); props.showItself(false) }}>
                <motion.div variants={In} initial="hidden" animate="visible" exit="exit"
                    className="flex flex-col h-5/6 w-5/6 bg-white rounded-xl items-center"
                    onClick={(e) => e.stopPropagation()}>
                    <span className="text-left text-2xl w-full p-4">Contador</span>
                    <div className="flex flex-col gap-4 w-full h-full"
                        id="contadorDinero">
                        <ContarMoneda valorMoneda={0.5} desglose={props.desglose} />
                        <ContarMoneda valorMoneda={1} desglose={props.desglose} />
                    </div>
                    <div className="flex p-4 w-full text-white gap-2 end self-end">
                        <div className="flex h-10 w-full m-auto bg-orange-500 hover:bg-orange-600 rounded-lg cursor-pointer items-center justify-center shadow-lg"
                            onClick={() => { ResetDinero() }}>
                            <div>
                                Limpiar contenido
                            </div>
                        </div>
                        <div className="flex h-10 w-full m-auto bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer items-center justify-center shadow-lg"
                            onClick={() => { ContarDinero(); props.showItself(false); }}>
                            <div>
                                Aceptar
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

const ContarMoneda = (props: { valorMoneda: number, desglose: Map<number, number> }) => {
    const [cantidad, setCantidad] = useState<string>("0");

    useEffect(() => {
        const cantidadMonedas = props.desglose.get(props.valorMoneda);

        if (cantidadMonedas) {
            setCantidad(String(cantidadMonedas))
            return;
        }

        setCantidad("0")
    }, [])

    useEffect(() => {
        if (!cantidad) { props.desglose.set(props.valorMoneda, 0); return }

        const c = Number(cantidad)

        if (isNaN(c)) { props.desglose.set(props.valorMoneda, 0); return }

        props.desglose.set(props.valorMoneda, c)
    }, [cantidad])

    const ValueInput = (e: string) => {
        if (!IsPositiveIntegerNumber(e)) { return }
        if (e === "") { setCantidad(""); return; }
        if (Number(e) <= 0) { setCantidad(""); return; }

        setCantidad(e)
    }

    return (
        <div className="flex gap-1">
            <input type="text" className="p-1 outline-blue-500" value={cantidad} onChange={(e) => ValueInput(e.target.value)} />
            {props.valorMoneda}€
        </div>
    )
}



export default ContarCaja;