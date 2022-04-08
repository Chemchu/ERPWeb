import { motion } from "framer-motion";
import React from "react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Producto } from "../../../tipos/Producto";
import { UpdateProducto } from "../../../utils/fetches";
import Etiqueta from "../../etiqueta";
import EditableLabel from "../../Forms/editableLabel";
import EditableIntegerLabel from "../../Forms/editableNumberLabel";
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
    const [Familia, setFamilia] = useState<string>(props.producto.familia || "");
    const [Proveedor, setProveedor] = useState<string>(props.producto.proveedor || "");
    const [Ean, setEan] = useState<string>(props.producto.ean || "");
    const [Cantidad, setCantidad] = useState<string>(String(props.producto.cantidad));
    const [CantidadRestock, setCantidadRestock] = useState<string>(String(props.producto.cantidadRestock));
    const [Iva, setIva] = useState<string>(String(props.producto.iva));
    const [Margen, setMargen] = useState<string>(String(props.producto.margen));
    const [PrecioCompra, setPrecioCompra] = useState<string>(String(props.producto.precioCompra));
    const [PrecioVenta, setPrecioVenta] = useState<string>(String(props.producto.precioVenta));
    const [Alta, setAlta] = useState<boolean>(props.producto.alta);
    const [hayCambios, setHayCambios] = useState<boolean>(false);

    const componentRef = useRef(null);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Etiqueta de producto",
        content: reactToPrintContent,
    });

    const GuardarCambios = async () => {
        const p: Producto = {
            _id: props.producto._id,
            alta: Alta,
            cantidad: Number(Cantidad),
            cantidadRestock: Number(CantidadRestock),
            ean: String(Ean),
            familia: Familia,
            iva: Number(Iva),
            margen: Number(Margen),
            nombre: Nombre,
            precioCompra: Number(PrecioCompra),
            precioVenta: Number(PrecioVenta),
            proveedor: Proveedor
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
                    <div className="self-start font-semibold text-xl w-1/2 xl:text-3xl">
                        <EditableLabel
                            text={Nombre}
                            setText={setNombre}
                            cambiosHandler={setHayCambios}
                            placeholder="Nombre del producto"
                            type="input"
                        />
                    </div>
                    <div className="flex flex-col gap-2 h-full w-1/2 cursor-default self-start xl:text-xl">
                        <span>
                            ID: {props.producto._id}
                        </span>
                        <div className="flex gap-2 items-center">
                            <span>
                                Familia:
                            </span>
                            <EditableLabel
                                text={Familia}
                                setText={setFamilia}
                                cambiosHandler={setHayCambios}
                                placeholder="Familia del producto..."
                                type="input"
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>
                                Cantidad:
                            </span>
                            <EditableIntegerLabel
                                text={Cantidad}
                                setText={setCantidad}
                                cambiosHandler={setHayCambios}
                                placeholder="Cantidad en stock..."
                                type="input"
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>
                                Cantidad de reestock:
                            </span>
                            <EditableIntegerLabel
                                text={CantidadRestock}
                                setText={setCantidadRestock}
                                cambiosHandler={setHayCambios}
                                placeholder="Cantidad de aviso restock..."
                                type="input"
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>
                                EAN:
                            </span>
                            <EditableLabel
                                text={Ean}
                                setText={setEan}
                                cambiosHandler={setHayCambios}
                                placeholder="Código de barras..."
                                type="input"
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>
                                IVA:
                            </span>
                            <EditableIntegerLabel
                                text={Iva}
                                setText={setIva}
                                cambiosHandler={setHayCambios}
                                placeholder="Porcentaje de IVA aplicado..."
                                type="input"
                            />
                            %
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>
                                Margen:
                            </span>
                            <EditableIntegerLabel
                                text={Margen}
                                setText={setMargen}
                                cambiosHandler={setHayCambios}
                                placeholder="Margen de beneficio..."
                                type="input"
                            />
                            %
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>
                                Precio de compra:
                            </span>
                            <EditableIntegerLabel
                                text={PrecioCompra}
                                setText={setPrecioCompra}
                                cambiosHandler={setHayCambios}
                                placeholder="Precio de compra del producto..."
                                type="input"
                            />
                            €
                        </div>

                        {/* Calcular el precio de venta en función del margen, precio de compra e IVA */}
                        <div className="flex gap-2 items-center">
                            <span>
                                Precio de venta al público:
                            </span>
                            <EditableIntegerLabel
                                text={PrecioVenta}
                                setText={setPrecioVenta}
                                cambiosHandler={setHayCambios}
                                placeholder="Precio de venta final del producto..."
                                type="input"
                            />
                            €
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>
                                Proveedor:
                            </span>
                            <EditableLabel
                                text={Proveedor}
                                setText={setProveedor}
                                cambiosHandler={setHayCambios}
                                placeholder="Proveedor del producto..."
                                type="input"
                            />
                        </div>
                    </div>
                    <div className="flex w-full h-full gap-10 text-white self-end items-end justify-around">
                        <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                            Cerrar
                        </button>
                        <button className="h-12 w-full rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg"
                            onClick={handlePrint}>
                            Imprimir etiqueta
                        </button>
                        <button disabled={!hayCambios} className={`${hayCambios ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400'} h-12 w-full rounded-xl  shadow-lg`}
                            onClick={async () => { await GuardarCambios() }}>
                            Guardar cambios
                        </button>
                    </div>
                    {
                        Ean &&
                        PrecioVenta &&
                        <div style={{ display: "none" }}>
                            <Etiqueta
                                ref={componentRef}
                                nombre={Nombre}
                                ean={String(Ean)}
                                precio={Number(PrecioVenta)}
                            />
                        </div>
                    }
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default VerProducto;