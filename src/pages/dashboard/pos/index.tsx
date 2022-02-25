import React, { useEffect, useState } from "react";
import TPV from "../../../components/sidebar/pointOfSale/tpv";
import DashboardLayout from "../../../layout";
import { motion } from "framer-motion";
import { Producto } from "../../../tipos/Producto";
import TpvOpenModal from "../../../components/modal/tpvOpen";
import useJwt from "../../../hooks/jwt";
import { FetchProductos } from "../../../utils/fetches";

const PuntoDeVenta = () => {
    const [Productos, SetProductos] = useState<Producto[]>([]);
    const [ServerUp, setServerUp] = useState<boolean>(true);
    const jwt = useJwt();
    const [empleadoUsandoTPV, setEmpleadoUsandoTPV] = useState<boolean>(jwt.TPV !== undefined)

    useEffect(() => {
        const GetProd = async () => {
            SetProductos(await FetchProductos());
        }
        GetProd();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {
                !empleadoUsandoTPV && <TpvOpenModal setEmpleadoUsandoTPV={setEmpleadoUsandoTPV} />
            }
            <TPV productos={Productos} serverOperativo={ServerUp} />
        </motion.div>
    );
}

PuntoDeVenta.PageLayout = DashboardLayout;

export default PuntoDeVenta;
