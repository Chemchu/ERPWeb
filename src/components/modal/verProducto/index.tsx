import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Producto } from "../../../tipos/Producto";
import { UpdateProducto } from "../../../utils/fetches";
import { notifyError } from "../../../utils/toastify";
import Etiqueta from "../../etiqueta";
import EditableLabel from "../../Forms/editableLabel";
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

export const VerProducto = (props: { producto: Producto, setProducto: Function, showModal: Function }) => {
    const [Nombre, setNombre] = useState<string>(props.producto.nombre || "");
    const [ProductoAux, setProductoAux] = useState<Producto>();
    const [hayCambios, setHayCambios] = useState<boolean>(false);
    const [imprimible, setImprimible] = useState<boolean>(true);

    useEffect(() => {
        if (!ProductoAux) { setHayCambios(false); return; }
        if (!ProductoAux.precioVenta) { setHayCambios(false); setImprimible(false); return; }
        if (!ProductoAux.nombre) { setHayCambios(false); setImprimible(false); return; }
        if (!ProductoAux.ean) { setHayCambios(false); setImprimible(false); return; }
        setImprimible(true);

        if (!ProductoAux.precioCompra) { setHayCambios(false); return; }
        if (!ProductoAux.iva) { setHayCambios(false); return; }
        if (!ProductoAux.margen) { setHayCambios(false); return; }
        if (!ProductoAux.alta) { setHayCambios(false); return; }
        setHayCambios(true);
    }, [ProductoAux]);

    const componentRef = useRef(null);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Etiqueta de producto",
        content: reactToPrintContent,
    })

    const Print = () => {
        try {
            handlePrint()
        }
        catch (e) {
            notifyError("Rellene los campos necesarios para imprimir la etiqueta");
            console.log(e);
        }
    };

    const GuardarCambios = async () => {
        if (!ProductoAux) { return; }

        const p: Producto = {
            _id: props.producto._id,
            alta: ProductoAux.alta,
            cantidad: Number(ProductoAux.cantidad),
            cantidadRestock: Number(ProductoAux.cantidadRestock),
            ean: String(ProductoAux.ean),
            familia: ProductoAux.familia,
            iva: Number(ProductoAux.iva),
            margen: Number(ProductoAux.margen),
            nombre: Nombre,
            precioCompra: Number(ProductoAux.precioCompra),
            precioVenta: Number(ProductoAux.precioVenta),
            proveedor: ProductoAux.proveedor
        }

        const updatedCorrectly = await UpdateProducto(p);
        if (updatedCorrectly) {
            props.setProducto(p);
        }
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
                    <div className="flex flex-col w-full h-full">
                        <div className="self-start font-semibold text-2xl w-1/2 h-auto xl:text-3xl">
                            <EditableLabel
                                text={Nombre}
                                setText={setNombre}
                                cambiosHandler={setHayCambios}
                                placeholder="Nombre del producto"
                                type="input"
                            />
                        </div>
                        <ProductoForm setProducto={setProductoAux} producto={props.producto} />
                        <div className="flex w-full h-full gap-10 text-white self-end items-end justify-around">
                            <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                                Cerrar
                            </button>
                            <button disabled={!imprimible} className={`${imprimible ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-400'} h-12 w-full rounded-xl shadow-lg`}
                                onClick={Print}>
                                Imprimir etiqueta
                            </button>
                            <button disabled={!hayCambios} className={`${hayCambios ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400'} h-12 w-full rounded-xl shadow-lg`}
                                onClick={async () => { await GuardarCambios() }}>
                                Guardar cambios
                            </button>
                        </div>

                    </div>
                    {
                        ProductoAux?.ean &&
                        ProductoAux?.precioVenta > 0 &&
                        imprimible &&
                        <div style={{ display: "none" }}>
                            <Etiqueta
                                ref={componentRef}
                                nombre={Nombre}
                                ean={ProductoAux?.ean}
                                precio={Number(ProductoAux?.precioVenta)}
                            />
                        </div>
                    }
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default VerProducto;