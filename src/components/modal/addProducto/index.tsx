import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
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
    const [Nombre, setNombre] = useState<string>("");
    const [Familia, setFamilia] = useState<string>("");
    const [Proveedor, setProveedor] = useState<string>("");
    const [Ean, setEan] = useState<string>("");
    const [PrecioCompra, setPrecioCompra] = useState<string>("");
    const [PrecioVenta, setPrecioVenta] = useState<string>("");
    const [Iva, setIva] = useState<string>("");
    const [Margen, setMargen] = useState<string>("");

    useEffect(() => {
        const margen = Number(Margen);
        const precioCompra = Number(PrecioCompra);
        const iva = Number(Iva);

        const precioVenta = String(precioCompra + (precioCompra * (iva / 100)) + (precioCompra * (margen / 100)))
        setPrecioVenta(precioVenta);
    }, [PrecioCompra, Iva, Margen])

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

                        <form className="flex gap-10 w-full h-full justify-center py-10">
                            <div className="flex flex-col gap-4 w-1/2">
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold">
                                        Nombre del producto
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Por ejemplo `Bocadillo chorizo`"
                                        value={Nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold">
                                        Familia
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Por ejemplo `Bolleria salada`"
                                        value={Familia} onChange={(e) => setFamilia(e.target.value)} />
                                </div>
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold">
                                        Proveedor
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Nombre del proveedor del producto"
                                        value={Proveedor} onChange={(e) => setProveedor(e.target.value)} />
                                </div>
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold">
                                        Código EAN
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ID numérico de trece dígitos"
                                        value={Ean} onChange={(e) => setEan(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-1/2">
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold">
                                        Precio de compra
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Precio de compra por unidad"
                                        value={PrecioCompra} onChange={(e) => setPrecioCompra(ValidatePositiveFloatingNumber(e.target.value))} />
                                </div>
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold" >
                                        IVA
                                    </label>
                                    <div className="flex gap-2 items-center">
                                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="IVA del producto"
                                            value={Iva} onChange={(e) => setIva(ValidatePositiveFloatingNumber(e.target.value))} />
                                        <span>%</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold">
                                        Margen
                                    </label>
                                    <div className="flex gap-2 items-center">
                                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Margen de beneficio"
                                            value={Margen} onChange={(e) => setMargen(ValidatePositiveFloatingNumber(e.target.value))} />
                                        <span>%</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="block tracking-wide text-gray-700 font-bold">
                                        Precio de venta
                                    </label>
                                    <input disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text"
                                        value={PrecioVenta} />
                                </div>
                            </div>
                        </form>

                        <div className="flex w-full h-auto items-end justify-around text-white gap-10">
                            <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => props.showModal(false)}>
                                Cancelar
                            </button>
                            <button className="h-12 w-full rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg">
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