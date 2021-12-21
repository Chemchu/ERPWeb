import React from "react";
import TPV from "../../../components/Tabs/pointOfSale/tpv";
import { Cliente } from "../../../tipos/Cliente";
import { Producto } from "../../../tipos/Producto";
import { CreateClientList, CreateProductList } from "../../../utils/typeCreator";
import { GetServerSideProps } from 'next'
import useProductContext from "../../../context/productContext";
import useClientContext from "../../../context/clientContext";
import Layout from "../../../layout";
import { motion } from "framer-motion";


const PuntoDeVenta = (props: { productos: Producto[], clientes: Cliente[] }) => {
    // const { Productos, SetProductos, StateIdentifierProduct, SetStateIdentifierProduct } = useProductContext();
    // const { Clientes, SetClientes, StateIdentifierClientes, SetStateIdentifierClientes } = useClientContext();
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TPV clientes={props.clientes} productos={props.productos} />
        </motion.div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    try {

        // // Comprueba si la base de datos ha cambiado para actualizar su información
        // if (productStateJson.message.databaseState !== StateIdentifierProduct) {
        //     const prodJson = await (await fetch(`${envInformation.ERPBACK_URL}api/productos`)).json();
        //     SetProductos(prods);
        //     SetStateIdentifierProduct(productStateJson.message.databaseState)
        // }

        // // Comprueba si la base de datos ha cambiado para actualizar su información
        // if (clientStateJson.message.databaseState !== StateIdentifierClientes) {
        //     const clientJson = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();


        //     SetClientes(clients);
        //     SetStateIdentifierClientes(clientStateJson.message.databaseState)
        // }

        const prodRes = await fetch('http://localhost:3000/api/productos');
        const cliRes = await fetch('http://localhost:3000/api/clientes');

        return {
            props: {
                productos: CreateProductList(await prodRes.json()),
                //productoStateIdentifier: ,
                clientes: CreateClientList(await cliRes.json()),
                //clienteStateIdentifier: ,
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

PuntoDeVenta.PageLayout = Layout;

export default PuntoDeVenta;