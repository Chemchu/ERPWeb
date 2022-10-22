import { motion } from "framer-motion";
import { Roles } from "../../../tipos/Enums/Roles";
import { Merma } from "../../../tipos/Merma";
import { In } from "../../../utils/animations";
import { DeleteMerma } from "../../../utils/fetches/mermasFetches";
import { notifyError, notifySuccess } from "../../../utils/toastify";
import AuthorizationWrapper from "../../authorizationWrapper";
import { Backdrop } from "../backdrop";
import BorrarButton from "../borrarModal";

const VerMerma = (props: { showModal: Function, merma: Merma, updateMermasCallback: Function }) => {
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
                            {
                                AuthorizationWrapper([Roles.Administrador, Roles.Gerente])(() => {
                                    return (
                                        <BorrarButton
                                            title={`¿Borrar esta merma?`}
                                            subtitle="Las cantidades mermadas se ajustarán automáticamente 😉"
                                            acceptCallback={DeleteCurrentMerma} />
                                    )
                                })({})
                            }
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
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default VerMerma