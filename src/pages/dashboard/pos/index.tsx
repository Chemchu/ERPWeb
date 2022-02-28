import React, { useEffect, useState } from "react";
import TPV from "../../../components/sidebar/pointOfSale/tpv";
import DashboardLayout from "../../../layout";
import { AnimatePresence, motion } from "framer-motion";
import { Producto } from "../../../tipos/Producto";
import AbrirCaja from "../../../components/modal/abrirCaja";
import useJwt from "../../../hooks/jwt";
import { FetchProductos } from "../../../utils/fetches";
import CerrarCaja from "../../../components/modal/cerrarCaja";

const PuntoDeVenta = () => {
    const jwt = useJwt();
    const [Productos, SetProductos] = useState<Producto[]>([]);
    const [ServerUp, setServerUp] = useState<boolean>(true);
    const [empleadoUsandoTPV, setEmpleadoUsandoTPV] = useState(jwt.TPV);
    const [showModalCerrarCaja, setCerrarCajaModal] = useState<boolean>(false)
    const [showModalAbrirCaja, setAbrirCajaModal] = useState<boolean>(!jwt.TPV)

    useEffect(() => {
        const GetProd = async () => {
            SetProductos(await FetchProductos());
        }
        GetProd();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TPV productos={Productos} serverOperativo={ServerUp} empleadoUsandoTPV={empleadoUsandoTPV} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} setShowModalAbrir={setAbrirCajaModal} setShowModalCerrar={setCerrarCajaModal} />
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {showModalCerrarCaja && <CerrarCaja setModalOpen={setCerrarCajaModal} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} />}
                {showModalAbrirCaja && !empleadoUsandoTPV && <AbrirCaja setShowModal={setAbrirCajaModal} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} />}
            </AnimatePresence>
        </motion.div>
    );
}

PuntoDeVenta.PageLayout = DashboardLayout;

export default PuntoDeVenta;
