import React, { useEffect, useState } from "react";
import TPV from "../../../components/sidebar/pointOfSale/tpv";
import DashboardLayout from "../../../layout";
import { AnimatePresence, motion } from "framer-motion";
import { Producto } from "../../../tipos/Producto";
import AbrirCaja from "../../../components/modal/abrirCaja";
import { FetchProductos } from "../../../utils/fetches";
import CerrarCaja from "../../../components/modal/cerrarCaja";
import { GetServerSideProps } from "next";
import getJwtFromString from "../../../hooks/jwt";
import { SesionEmpleado } from "../../../tipos/Empleado";
import useEmpleadoContext from "../../../context/empleadoContext";


const PuntoDeVenta = (props: { isEmpleadoUsingTPV: boolean, EmpleadoSesion: SesionEmpleado }) => {
    const [Productos, SetProductos] = useState<Producto[]>([]);
    const [ServerUp, setServerUp] = useState<boolean>(true);
    const [showModalCerrarCaja, setCerrarCajaModal] = useState<boolean>(false);

    const [empleadoUsandoTpv, setEmpleadoUsandoTPV] = useState<boolean>(props.isEmpleadoUsingTPV);
    const [showModalAbrirCaja, setAbrirCajaModal] = useState<boolean>(!props.isEmpleadoUsingTPV);
    const { Empleado, SetEmpleado } = useEmpleadoContext();

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(props.EmpleadoSesion)
        }
        const GetProd = async () => {
            SetProductos(await FetchProductos());
        }
        GetProd();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TPV productos={Productos} serverOperativo={ServerUp} empleadoUsandoTPV={empleadoUsandoTpv} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} setShowModalAbrir={setAbrirCajaModal} setShowModalCerrar={setCerrarCajaModal} />
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {showModalCerrarCaja && <CerrarCaja setModalOpen={setCerrarCajaModal} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} />}
                {showModalAbrirCaja && !empleadoUsandoTpv && <AbrirCaja setShowModal={setAbrirCajaModal} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} />}
            </AnimatePresence>
        </motion.div>
    );
}

PuntoDeVenta.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const jwt = getJwtFromString(ctx.req.cookies.authorization);
    const emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: jwt.rol,
        TPV: jwt.TPV
    }
    return {
        props: {
            isEmpleadoUsingTPV: Boolean(jwt.TPV),
            EmpleadoSesion: emp
        }
    }
}

export default PuntoDeVenta;
