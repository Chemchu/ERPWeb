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
import { TPVStateContextProvider } from "../../../context/tpvContext";
import { POSState } from "../../../tipos/POSState";

const PuntoDeVenta = (props: { isEmpleadoUsingTPV: boolean, EmpleadoSesion: SesionEmpleado }) => {
    const [empleadoUsandoTpv, setEmpleadoUsandoTPV] = useState<boolean>(props.isEmpleadoUsingTPV);
    const [showCerrarCajaModal, setCerrarCajaModal] = useState<boolean>(false);
    const [showModalAbrirCaja, setAbrirCajaModal] = useState<boolean>(!props.isEmpleadoUsingTPV);
    const [showPagarModal, setShowPagarModal] = useState<boolean>(false);
    const [showTransferirTPVModal, setShowTransferirTPVModal] = useState<boolean>(false);
    const { Empleado, SetEmpleado } = useEmpleadoContext();

    const [Productos, SetProductos] = useState<Producto[]>([]);

    const posState: POSState = {
        EmpleadoUsingTPVState: { isEmpleadoUsingTPV: empleadoUsandoTpv, setEmpleadoUsingTPV: setEmpleadoUsandoTPV },
        AbrirCajaState: { showAbrirCajaModal: showModalAbrirCaja, setShowAbrirCajaModal: setAbrirCajaModal },
        CerrarCajaState: { showCerrarCajaModal: showCerrarCajaModal, setShowCerrarCajaModal: setCerrarCajaModal },
        PagarState: { showPagarModal: showPagarModal, setShowPagarModal: setShowPagarModal },
        TransferirTPVState: { showTransferirTPVModal: showTransferirTPVModal, setShowTransferirTPVModal: setShowTransferirTPVModal },
    }

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(props.EmpleadoSesion)
        }
        const GetProd = async () => {
            SetProductos((await FetchProductos()).filter((p) => p.alta));
        }
        GetProd();
    }, []);

    return (
        <TPVStateContextProvider isEmpleadoUsingTPV={empleadoUsandoTpv} setEmpleadoUsingTPV={setEmpleadoUsandoTPV}
            State={posState}
        >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TPV productos={Productos} />
                <AnimatePresence mode="wait">
                    {showCerrarCajaModal && <CerrarCaja />}
                    {showModalAbrirCaja && !empleadoUsandoTpv && <AbrirCaja />}
                    {/* {showModalAbrirCaja && !empleadoUsandoTpv && <AbrirCaja setShowModal={setAbrirCajaModal} setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} />} */}
                </AnimatePresence>
            </motion.div>
        </TPVStateContextProvider>
    );
}

PuntoDeVenta.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const [jwt, isValidCookie] = getJwtFromString(context.req.cookies.authorization);

    if (!isValidCookie) {
        return {
            redirect: {
                permanent: false,
                destination: `/login`
            },
        };
    }
    let emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
    }
    if (jwt.TPV) {
        emp.TPV = jwt.TPV
    }

    return {
        props: {
            isEmpleadoUsingTPV: Boolean(jwt.TPV),
            EmpleadoSesion: emp
        }
    }
}

export default PuntoDeVenta;
