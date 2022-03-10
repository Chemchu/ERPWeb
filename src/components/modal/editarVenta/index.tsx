import { motion } from "framer-motion";
import { Venta } from "../../../tipos/Venta";
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

const EditarVenta = (props: { venta: Venta | undefined, setModal: Function }) => {

    if (!props.venta) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full w-full ">
                <Backdrop onClick={() => { props.setModal(false) }}>
                    <motion.div className="h-5/6 w-5/6 flex flex-col items-center bg-white rounded-2xl p-4"
                        onClick={(e) => e.stopPropagation()}
                        variants={In}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        Venta indefinida
                    </motion.div>
                </Backdrop>
            </motion.div>
        )
    }

    let fecha = new Date(0);
    fecha.setUTCMilliseconds(Number(props.venta.createdAt));

    return (

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full ">
            <Backdrop onClick={() => { props.setModal(false) }}>
                <motion.div className="h-5/6 w-5/6 flex flex-col items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col w-full h-full text-left">
                        <span className="text-2xl">
                            Venta en: {`${fecha.toLocaleString()}`}
                        </span>
                        <div>
                            <span>
                                Productos comprados
                            </span>
                            <div>
                                Lista de productos
                            </div>
                        </div>
                        <div className="flex w-full h-full justify-around items-end pb-10">
                            <span>
                                Tipo de venta: {props.venta.tipo}
                            </span>
                            <span>
                                Valor total: {props.venta.precioVentaTotal}€
                            </span>
                        </div>
                        <div className="flex w-full h-auto justify-around items-end text-white">
                            <button className="w-1/3 h-12 rounded-xl bg-red-500" onClick={() => { props.setModal(false) }}>
                                Cerrar
                            </button>
                            <button className="w-1/3 h-12 rounded-xl bg-green-500">
                                Imprimir
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default EditarVenta;