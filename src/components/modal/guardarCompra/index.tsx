import { motion } from "framer-motion"
import { useState } from "react"
import useComprasAparcadasContext from "../../../context/comprasAparcadas"
import { ProductoVendido } from "../../../tipos/ProductoVendido"
import { In } from "../../../utils/animations"
import { notifySuccess, notifyWarn } from "../../../utils/toastify"
import { Backdrop } from "../backdrop"

const GuardarCompra = (props: { setModal: Function, compraActual: ProductoVendido[], setCompraActual: Function }) => {
    const [nombreCliente, setNombreCliente] = useState<string>("");
    const { SetComprasAparcadasMap } = useComprasAparcadasContext();

    const Guardar = () => {
        let guardado = false;
        SetComprasAparcadasMap((compras) => {
            if (compras.has(nombreCliente)) {
                notifyWarn("Nombre en uso")
                return compras;
            }

            const map = new Map(compras)
            map.set(nombreCliente, props.compraActual);
            guardado = true;
            return map;
        })

        if (guardado) {
            props.setCompraActual([])
            props.setModal(false);
            notifySuccess("Compra guardada correctamente")
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full ">
            <Backdrop onClick={() => { props.setModal(false) }}>
                <motion.div className="flex flex-col h-1/3 w-1/3 items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="text-lg text-center h-1/3 w-full font-semibold">Guardar compra</div>
                    <div className="flex flex-col h-full w-full items-center justify-center px-2">
                        <input className="w-full outline outline-blue-300 rounded-lg p-2" type="text" placeholder="Nombre del cliente..."
                            value={nombreCliente}
                            onChange={(e) => { setNombreCliente(e.target.value) }}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") { Guardar() }
                            }}
                        />
                    </div>
                    <div className="flex gap-4 w-full justify-around items-end text-white ">
                        <button className="w-1/3 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.setModal(false) }}>
                            Cerrar
                        </button>
                        {
                            nombreCliente ?
                                <button className="w-1/3 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={Guardar}>
                                    Guardar
                                </button>
                                :
                                <button className="w-1/3 h-12 rounded-xl bg-blue-400 cursor-default shadow-lg" onClick={() => notifyWarn("No se puede guardar sin el nombre del cliente")}>
                                    Guardar
                                </button>
                        }
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default GuardarCompra