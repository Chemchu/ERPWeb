import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";
import Cookies from 'js-cookie'
import { notifyError, notifySuccess } from "../../../utils/toastify";

const StoreDataModal = (props: { showModal: Function }) => {
    const [nombreTienda, setNombreTienda] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [cif, setCif] = useState<string>("");
    const [validData, setValidData] = useState<boolean>(false);

    useEffect(() => {
        if (!nombreTienda) { setValidData(false); return; }
        if (!direccion) { setValidData(false); return; }
        if (!cif) { setValidData(false); return; }

        setValidData(true)
    }, [nombreTienda, direccion, cif])


    const Aceptar = () => {
        if (!nombreTienda) {
            notifyError("Campo vacío inválido: Nombre de la tienda")
            return;
        }
        if (!direccion) {
            notifyError("Campo vacío inválido: Dirección")
            return;
        }
        if (!cif) {
            notifyError("Campo vacío inválido: CIF")
            return;
        }

        Cookies.set("storeData", JSON.stringify({ nombre: nombreTienda, direccion: direccion, cif: cif }), { expires: 365 * 3 })
        props.showModal(false)
        notifySuccess("Datos guardados correctamente")
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.showModal(false) }} >
                <motion.div className="flex flex-col xl:h-2/5 xl:w-2/5 h-2/4 w-2/4 gap-8 items-center bg-white rounded-2xl p-6"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <span className="w-full text-3xl text-left">
                        Datos de la tienda
                    </span>
                    <div className="flex gap-2 w-full h-full items-center">
                        <label className="w-full block tracking-wide text-gray-700 font-bold">
                            Nombre de la tienda
                        </label>
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Nombre de la tienda"
                            onKeyUp={(e) => { if (e.key === "Enter") { Aceptar() } }}
                            value={nombreTienda} onChange={(e) => {
                                setNombreTienda(e.target.value)
                            }} />
                    </div>
                    <div className="flex gap-2 w-full h-full items-center">
                        <label className="w-full block tracking-wide text-gray-700 font-bold">
                            Dirección
                        </label>
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Dirección postal de la tienda"
                            onKeyUp={(e) => { if (e.key === "Enter") { Aceptar() } }}
                            value={direccion} onChange={(e) => {
                                setDireccion(e.target.value)
                            }} />
                    </div>
                    <div className="flex gap-2 w-full h-full items-center">
                        <label className="w-full block tracking-wide text-gray-700 font-bold">
                            CIF
                        </label>
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Número de CIF"
                            onKeyUp={(e) => { if (e.key === "Enter") { Aceptar() } }}
                            value={cif} onChange={(e) => {
                                setCif(e.target.value)
                            }} />
                    </div>

                    <div className="flex items-end gap-4 text-white w-full">
                        <button className="h-10 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                            onClick={() => props.showModal(false)}>
                            Cancelar
                        </button>
                        <button className={`${validData ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 cursor-default"} h-10 w-full rounded-xl shadow-lg`}
                            onClick={Aceptar}>
                            Aceptar
                        </button>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default StoreDataModal;