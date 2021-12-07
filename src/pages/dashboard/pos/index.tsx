import { AppContext } from "next/app";
import React from "react";
import TPV from "../../../components/Tabs/pointOfSale/tpv";
import { config } from "../../api/config";

const PuntoDeVenta = (props: { productos: any, clientes: any }) => {
    return (
        <TPV clientes={props.clientes} productos={props.productos} />
    );
}

export async function getServerSideProps(context: AppContext) {
    const prod = await (await fetch(`${config.ERPBACK_URL}api/productos`)).json();
    const clients = await (await fetch(`${config.ERPBACK_URL}api/clientes`)).json();

    console.log("Request a DB hecho!");

    return {
        props: {
            productos: prod.message,
            clientes: clients.message
        }
    }
}

export default PuntoDeVenta;