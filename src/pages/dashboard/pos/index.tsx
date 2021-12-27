import React, { useEffect } from "react";
import TPV from "../../../components/Tabs/pointOfSale/tpv";
import { Cliente } from "../../../tipos/Cliente";
import { Producto } from "../../../tipos/Producto";
import { CreateClientList, CreateProductList } from "../../../utils/typeCreator";
import { GetServerSideProps } from 'next/types'
import useProductContext from "../../../context/productContext";
import useClientContext from "../../../context/clientContext";
import Layout from "../../../layout";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const PuntoDeVenta = (props: { productos: Producto[], clientes: Cliente[], prodStateCookie: string, clientStateCookie: string }) => {
    const { Productos, SetProductos } = useProductContext();
    const { Clientes, SetClientes } = useClientContext();

    useEffect(() => {
        Cookies.set('StateIdentifierProduct', props.prodStateCookie);
        Cookies.set('StateIdentifierClientes', props.clientStateCookie);

        if (props.productos.length > 0) SetProductos(props.productos);
        if (props.clientes.length > 0) SetClientes(props.clientes);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TPV clientes={props.clientes.length > 0 ? props.clientes : Clientes} productos={props.productos.length > 0 ? props.productos : Productos} />
        </motion.div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let prodRes = [] as Producto[];
        let cliRes = [] as Cliente[];

        const pResponse = await (await fetch('http://localhost:3000/api/productos/estado')).json();
        const cResponse = await (await fetch('http://localhost:3000/api/clientes/estado')).json();

        const pState = pResponse.message.databaseState || 'NoStateSavedInServer';
        const cState = cResponse.message.databaseState || 'NoStateSavedInServer';

        if (context.req.cookies.StateIdentifierProduct !== pState || pState === 'NoStateSavedInServer') {
            const pRes = await (await fetch('http://localhost:3000/api/productos')).json();
            prodRes = CreateProductList(pRes);
        }

        if (context.req.cookies.StateIdentifierClientes !== cState || cState === 'NoStateSavedInServer') {
            const cRes = await (await fetch('http://localhost:3000/api/clientes')).json();
            cliRes = CreateClientList(cRes);
        }

        return {
            props: {
                productos: prodRes,
                clientes: cliRes,
                prodStateCookie: pState,
                clientStateCookie: cState
            }
        }

    }
    catch (e) {
        console.log(e);

        return {
            props: {
                productos: [] as Producto[],
                clientes: [] as Cliente[],
            }
        }
    }

}

PuntoDeVenta.PageLayout = Layout;

export default PuntoDeVenta;