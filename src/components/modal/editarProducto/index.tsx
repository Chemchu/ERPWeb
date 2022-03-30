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

export const EditarProducto = (props: { producto: Producto, showModal: Function }) => {
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
                    <div className="self-start font-semibold text-xl">
                        {props.producto.nombre}
                    </div>
                    <div className="flex flex-col h-full w-full">
                        <span>
                            ID: {props.producto._id}
                        </span>
                        <span>
                            Familia: {props.producto.familia || "No definido"}
                        </span>
                        <span>
                            Cantidad: {isNaN(props.producto.cantidad) ? 'No definido' : props.producto.cantidad}
                        </span>
                        <span>
                            Cantidad de reestock: {isNaN(props.producto.cantidadRestock) ? 'No definido' : props.producto.cantidadRestock}
                        </span>
                        <span>
                            EAN: {props.producto.ean}
                        </span>
                        <span>
                            IVA: {isNaN(props.producto.iva) ? 'No definido' : props.producto.iva + '%'}
                        </span>
                        <span>
                            Margen de beneficio: {isNaN(props.producto.margen) ? 'No definido' : props.producto.margen + '%'}
                        </span>
                        <span>
                            Precio de compra: {props.producto.precioCompra || 0}€
                        </span>
                        <span>
                            Precio de venta al público: {props.producto.precioVenta || 0}€
                        </span>
                        <span>
                            Proveedor: {props.producto.proveedor || 'No definido'}
                        </span>
                    </div>
                    <div className="flex w-full h-full gap-10 text-white self-end items-end justify-around">
                        <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                            Cerrar
                        </button>
                        <button className="h-12 w-full rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg">
                            Actualizar
                        </button>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default EditarProducto;