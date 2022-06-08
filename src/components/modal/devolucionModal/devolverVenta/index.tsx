import { motion } from "framer-motion";
import { useState } from "react";
import { ProductoVendido } from "../../../../tipos/ProductoVendido";
import { In } from "../../../../utils/animations";
import { Backdrop } from "../../backdrop";
import ListaDevolucionProductos from "../devolucionListaProductos";

const DevolverVenta = (props: { productos: ProductoVendido[], setModal: Function }) => {
    const [ProductosDevolver, setProductosDevolver] = useState<ProductoVendido[]>([]);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop onClick={() => { props.setModal(false) }}>
                <motion.div className="h-2/3 w-4/6 flex flex-col gap-4 items-center justify-between bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <span className="text-xl w-full text-left font-semibold">
                        Selecciona los productos a devolver
                    </span>

                    <ListaDevolucionProductos listaProductos={props.productos} />

                    <div className="flex gap-4 w-full h-1/6 justify-around items-end text-white">
                        <button className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => props.setModal(false)}>
                            Cancelar
                        </button>
                        <button className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg">
                            Aceptar
                        </button>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default DevolverVenta;