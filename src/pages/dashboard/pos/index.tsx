import { AppContext } from "next/app";
import React from "react";
import TPV from "../../../components/Tabs/pointOfSale/tpv";
import { Client } from "../../../tipos/Client";
import { Producto } from "../../../tipos/Producto";
import { envInformation } from "../../api/envInfo";
import { CreateClientList, CreateProductList } from "../../api/typeCreator";

const PuntoDeVenta = (props: { productos: Producto[], clientes: Client[] }) => {
    return (
        <TPV clientes={props.clientes} productos={props.productos} />
    );
}

export async function getServerSideProps(context: AppContext) {
    const prod = await (await fetch(`${envInformation.ERPBACK_URL}api/productos`)).json();
    const clients = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();

    console.log("Request a DB hecho!");

    const p = CreateProductList(prod.message);
    const c = CreateClientList(clients.message);

    return {
        props: {
            productos: p,
            clientes: c
        }
    }
}

export default PuntoDeVenta;