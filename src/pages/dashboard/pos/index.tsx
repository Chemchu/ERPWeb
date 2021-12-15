import { motion } from "framer-motion";
import { AppContext } from "next/app";
import React from "react";
import TPV from "../../../components/Tabs/pointOfSale/tpv";
import { Cliente } from "../../../tipos/Cliente";
import { Producto } from "../../../tipos/Producto";
import { envInformation } from "../../../utils/envInfo";
import { CreateClientList, CreateProductList } from "../../../utils/typeCreator";
import { GetServerSideProps } from 'next'
import useProductContext from "../../../context/productContext";
import useClientContext from "../../../context/clientContext";


const PuntoDeVenta = (props: { productos: Producto[], clientes: Cliente[] }) => {
    return (
        <TPV clientes={props.clientes} productos={props.productos} />
    );
}

export const getServerSideProps: GetServerSideProps = async () => {

    try {
        const r = await (await fetch('http://localhost:3000/api/productos')).json();
        console.log(r.productos);


        // const { Productos, SetProductos, StateIdentifierProduct, SetStateIdentifierProduct } = useProductContext();
        // const { Clientes, SetClientes, StateIdentifierClientes, SetStateIdentifierClientes } = useClientContext();

        // const productStateJson = await (await fetch(`${envInformation.ERPBACK_URL}api/productos/estado`)).json();
        // const clientStateJson = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes/estado`)).json();

        // // Comprueba si la base de datos ha cambiado para actualizar su información
        // if (productStateJson.message.databaseState !== StateIdentifierProduct) {
        //     const prodJson = await (await fetch(`${envInformation.ERPBACK_URL}api/productos`)).json();
        //     const prods: Producto[] = CreateProductList(prodJson.message);

        //     SetProductos(prods);
        //     SetStateIdentifierProduct(productStateJson.message.databaseState)
        // }

        // // Comprueba si la base de datos ha cambiado para actualizar su información
        // if (clientStateJson.message.databaseState !== StateIdentifierClientes) {
        //     const clientJson = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();
        //     const clients: Cliente[] = CreateClientList(clientJson.message);

        //     SetClientes(clients);
        //     SetStateIdentifierClientes(clientStateJson.message.databaseState)
        // }

        // return {
        //     props: {
        //         productos: Productos,
        //         clientes: Clientes
        //     }
        // }

        return {
            props: {
                productos: [] as Producto[],
                clientes: [] as Cliente[]
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