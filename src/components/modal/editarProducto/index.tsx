import { motion } from "framer-motion";
import { Producto } from "../../../tipos/Producto";
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

export const EditarProducto = (props: { product: Producto, handleClose: Function }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.handleClose() }} >
                <motion.div className="h-5/6 w-5/6 flex flex-col items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="grid grid-rows-3 h-full w-full">
                        <div className="flex justify-around">
                        </div>
                        <div className="">
                            {props.product.nombre}
                        </div>
                        <div className="bg-red-500">

                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default EditarProducto;