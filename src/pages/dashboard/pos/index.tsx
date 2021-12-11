import { motion } from "framer-motion";
import { AppContext } from "next/app";
import React from "react";
import TPV from "../../../components/Tabs/pointOfSale/tpv";
import { Cliente } from "../../../tipos/Cliente";
import { Producto } from "../../../tipos/Producto";
import { envInformation } from "../../api/envInfo";
import { CreateClientList, CreateProductList } from "../../api/typeCreator";
import { GetServerSideProps } from 'next'

const PuntoDeVenta = (props: { productos: Producto[], clientes: Cliente[] }) => {
    return (
        <TPV clientes={props.clientes} productos={props.productos} />
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const p = await (await fetch(`${envInformation.ERPBACK_URL}api/productos`)).json();
        const c = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();

        console.log("Request a DB hecho!");

        const prods: Producto[] = CreateProductList(p.message);
        const clients: Cliente[] = CreateClientList(c.message);

        return {
            props: {
                productos: prods,
                clientes: clients
            }
        }
    }
    catch (e) {
        console.log(e);

        return {
            props: {
                productos: [] as Producto[],
                clientes: [] as Cliente[]
            }
        }
    }

}

export default PuntoDeVenta;