import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Merma } from "../../../tipos/Merma";
import { In } from "../../../utils/animations";
import { DeleteMerma } from "../../../utils/fetches/mermasFetches";
import { notifyError, notifySuccess } from "../../../utils/toastify";
import RequireHigherAuth from "../../sidebar/RequireHigherAuth";
import { Backdrop } from "../backdrop";
import BorrarMermaModal from "../borrarMermaModal";

const VerMerma = (props: { showModal: Function, merma: Merma, updateMermasCallback: Function }) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const DeleteCurrentMerma = async () => {
        const { message, successful } = await DeleteMerma(props.merma._id);
        await props.updateMermasCallback();

        if (successful) { notifySuccess(message) }
        else { notifyError(message) }
        props.showModal(false);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.showModal(false) }} >
                <motion.div className="h-5/6 w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col w-full h-full gap-4">
                        <div className="flex self-start text-2xl w-full h-auto xl:text-3xl justify-between">
                            <span>Merma de: {new Date(Number(props.merma.createdAt)).toLocaleString()}</span>
                            <RequireHigherAuth>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setShowDeleteModal(true)}
                                    className="self-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </motion.button>
                            </RequireHigherAuth>
                        </div>
                        <section className="flex gap-4 h-full">
                            <div className="flex flex-col gap-1 w-1/2 h-full">
                                <span>ID: {props.merma._id}</span>
                                <span>Creado por: {props.merma.creadoPor.nombre} ({props.merma.creadoPor.email})</span>
                                <span>Coste de los productos: {props.merma.costeProductos}€</span>
                                <span>Venta perdida: {props.merma.ventasPerdidas}€</span>
                                <span>Beneficio perdido: {props.merma.beneficioPerdido}€</span>
                            </div>
                            <div className="flex flex-col gap-1 h-full w-1/2 border rounded-lg">
                                <div className="flex justify-between gap-2 w-full h-auto hover:bg-gray-300 p-2 border-b font-semibold">
                                    <span className="w-2/4">Nombre</span>
                                    <span className="w-1/4 text-right">Cantidad</span>
                                    <span className="w-1/4 text-right">Motivo</span>
                                </div>
                                <ul>
                                    {
                                        props.merma.productos.map((prod, index) => {
                                            return (
                                                <li key={index}
                                                    className="flex justify-between items-center gap-2 w-full h-auto hover:bg-gray-300 p-2 text-sm cursor-default">
                                                    <span className="w-2/4">{prod.nombre}</span>
                                                    <span className="w-1/4 text-right">{prod.cantidad}</span>
                                                    <span className="w-1/4 text-right">{prod.motivo}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </section>
                        <div className="flex w-full h-auto gap-10 text-white self-end items-end justify-around">
                            <button className="h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.showModal(false) }}>
                                Cerrar
                            </button>
                            {/* <button disabled={!imprimible} className={`${imprimible ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-400'} h-12 w-full rounded-xl shadow-lg`}
                                onClick={Print}>
                                Imprimir etiqueta
                            </button> */}
                            {/* {
                                hayCambios ?
                                    <button className={`flex bg-blue-500 hover:bg-blue-600 h-12 w-full rounded-xl shadow-lg justify-center items-center`}
                                        onClick={async () => { await GuardarCambios(ProductoAux, props.producto._id) }}>
                                        <p>
                                            Guardar cambios
                                        </p>
                                    </button>
                                    :
                                    <div className={`flex bg-blue-400 h-12 w-full rounded-xl shadow-lg justify-center items-center `}>
                                        <p>
                                            Guardar cambios
                                        </p>
                                    </div>
                            } */}
                        </div>
                        <AnimatePresence>
                            {
                                showDeleteModal &&
                                <BorrarMermaModal showModal={setShowDeleteModal} acceptCallback={DeleteCurrentMerma} />
                            }
                        </AnimatePresence>
                        {
                            // ProductoAux?.ean &&
                            // ProductoAux?.precioVenta > 0 &&
                            // imprimible &&
                            // <div style={{ display: "none" }}>
                            //     <Etiqueta
                            //         ref={componentRef}
                            //         nombre={Nombre}
                            //         ean={ProductoAux?.ean}
                            //         precio={Number(ProductoAux?.precioVenta)}
                            //     />
                            // </div>
                        }
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default VerMerma