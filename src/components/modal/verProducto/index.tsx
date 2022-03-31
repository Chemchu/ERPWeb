import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { Backdrop } from "../backdrop";
import EditarProducto from "../editarProducto";

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

export const VerProducto = (props: { producto: Producto, showModal: Function }) => {
    const [ProductoModificado, setProductoModif] = useState<Producto>(props.producto);
    const [showEditarProducto, setModal] = useState<boolean>(false);

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
                        {ProductoModificado.nombre}
                    </div>
                    <div className="flex flex-col h-full w-full">
                        <span>
                            ID: {ProductoModificado._id}
                        </span>
                        <div>
                            <span>
                                Familia: {ProductoModificado.familia || 'No definido'}
                            </span>
                            {/* <input autoFocus={true} className="rounded-lg border shadow-lg h-full py-2 px-4
                            bg-white focus:outline-none focus:ring-2 focus:ring-blue-600" type="text"
                                onChange={(e) => {
                                    let p = ProductoModificado;
                                    p.familia = e.target.value;
                                    setProductoModif(p);
                                }} /> */}
                        </div>

                        <span>
                            Cantidad: {isNaN(ProductoModificado.cantidad) ? 'No definido' : ProductoModificado.cantidad}
                        </span>
                        <span>
                            Cantidad de reestock: {isNaN(ProductoModificado.cantidadRestock) ? 'No definido' : ProductoModificado.cantidadRestock}
                        </span>
                        <span>
                            EAN: {ProductoModificado.ean}
                        </span>
                        <span>
                            IVA: {isNaN(ProductoModificado.iva) ? 'No definido' : ProductoModificado.iva + '%'}
                        </span>
                        <span>
                            Margen de beneficio: {isNaN(ProductoModificado.margen) ? 'No definido' : ProductoModificado.margen + '%'}
                        </span>
                        <span>
                            Precio de compra: {ProductoModificado.precioCompra || 0}€
                        </span>
                        <span>
                            Precio de venta al público: {ProductoModificado.precioVenta || 0}€
                        </span>
                        <span>
                            Proveedor: {ProductoModificado.proveedor || 'No definido'}
                        </span>
                    </div>
                    <div className="flex w-full h-full gap-10 text-white self-end items-end justify-around">
                        <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                            Cerrar
                        </button>
                        <button className="h-12 w-full rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg"
                            onClick={() => { setModal(true) }}>
                            Modificar
                        </button>
                    </div>
                    <AnimatePresence >
                        {
                            showEditarProducto && <EditarProducto producto={ProductoModificado} showModal={setModal} />
                        }
                    </AnimatePresence>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default VerProducto;