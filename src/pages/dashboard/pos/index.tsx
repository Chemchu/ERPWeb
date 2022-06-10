import React, { useEffect, useState } from "react";
import TPV from "../../../components/sidebar/pointOfSale/tpv";
import DashboardLayout from "../../../layout";
import { AnimatePresence, motion } from "framer-motion";
import { Producto } from "../../../tipos/Producto";
import AbrirCaja from "../../../components/modal/abrirCaja";
import CerrarCaja from "../../../components/modal/cerrarCaja";
import { GetServerSideProps } from "next";
import getJwtFromString from "../../../hooks/jwt";
import { SesionEmpleado } from "../../../tipos/Empleado";
import useEmpleadoContext from "../../../context/empleadoContext";
import { Roles } from "../../../tipos/Enums/Roles";
import { FetchProductos } from "../../../utils/fetches/productosFetches";

const PuntoDeVenta = (props: { isEmpleadoUsingTPV: boolean, EmpleadoSesion: SesionEmpleado }) => {
    const [Productos, SetProductos] = useState<Producto[]>([]);
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
            <TPV productos={Productos} empleadoUsandoTPV={empleadoUsandoTpv} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} setShowModalAbrir={setAbrirCajaModal} setShowModalCerrar={setCerrarCajaModal} />
            <AnimatePresence exitBeforeEnter>
                {showModalCerrarCaja ? <CerrarCaja setModalOpen={setCerrarCajaModal} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} /> : <></>}
                {showModalAbrirCaja && !empleadoUsandoTpv && <AbrirCaja setShowModal={setAbrirCajaModal} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} />}
            </AnimatePresence>
        </motion.div>
    );
}

PuntoDeVenta.PageLayout = DashboardLayout;

// No se está actualizando el EmpleadoSesion al cambiar el header de la cookie cuando abres la caja

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const jwt = getJwtFromString(ctx.req.cookies.authorization);
    let emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
    }
    jwt.TPV ? emp.TPV = jwt.TPV : null;

    return {
        props: {
            isEmpleadoUsingTPV: Boolean(jwt.TPV),
            EmpleadoSesion: emp
        }
    }
}

export default PuntoDeVenta;
