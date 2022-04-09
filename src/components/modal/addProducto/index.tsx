import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import ProductoForm from "../../Forms/productoForm";
import { Backdrop } from "../backdrop";

const In = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 15,
            stifness: 500
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition: {
            duration: 0.25,
        }
    }
}

const AddProducto = (props: { showModal: Function }) => {
    const [Producto, setProducto] = useState<Producto>();

    const CrearProducto = () => {
        console.log("Crear producto");

    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.showModal(false) }} >
                <motion.div className="h-5/6 w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-6"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col w-full h-full text-left ">
                        <span className="text-3xl">
                            Añadir nuevo producto
                        </span>

                        <ProductoForm setProducto={setProducto} />

                        <div className="flex w-full h-full items-end justify-around text-white gap-10">
                            <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => props.showModal(false)}>
                                Cancelar
                            </button>
                            <button className="h-12 w-full rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={() => { CrearProducto() }}>
                                Crear producto
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default AddProducto;