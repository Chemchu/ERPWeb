import { motion } from "framer-motion"
import { useState } from "react"
import useComprasAparcadasContext from "../../../context/comprasAparcadas"
import useProductEnCarritoContext from "../../../context/productosEnCarritoContext"
import { In } from "../../../utils/animations"
import { notifySuccess } from "../../../utils/toastify"
import SimpleListBox from "../../elementos/Forms/simpleListBox"
import { Backdrop } from "../backdrop"

const VerComprasAparcadas = (props: { setModal: Function }) => {
    const { ComprasAparcadasMap, SetComprasAparcadasMap } = useComprasAparcadasContext();
    const { SetProductosEnCarrito } = useProductEnCarritoContext()
    const [compraAparcada, setCompraAparcada] = useState<string>("")

    const Recuperar = () => {
        if (compraAparcada === "") { return }

        const productos = ComprasAparcadasMap.get(compraAparcada)
        if (productos) {
            SetProductosEnCarrito(productos)
            SetComprasAparcadasMap((compras) => {
                compras.delete(compraAparcada)
                return new Map(compras)
            })
            notifySuccess("Carrito recuperado")
            props.setModal(false)
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
                    <div className="text-lg text-center h-1/3 w-full font-semibold">Recuperar venta</div>
                    <div className="flex flex-col h-full w-full items-center justify-center px-2">
                        <SimpleListBox elementos={Array.from(ComprasAparcadasMap.keys())} setElemento={setCompraAparcada} />
                    </div>
                    <div className="flex gap-4 w-full justify-around items-end text-white ">
                        <button className="w-1/3 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.setModal(false) }}>
                            Cerrar
                        </button>
                        <button className="w-1/3 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={Recuperar}>
                            Recuperar
                        </button>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default VerComprasAparcadas