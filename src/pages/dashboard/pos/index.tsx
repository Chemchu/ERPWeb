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
import { envInformation } from "../../../utils/envInfo";
import cookie from "cookie";


const PuntoDeVenta = (props: { productos: Producto[], clientes: Cliente[] }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TPV clientes={props.clientes} productos={props.productos} />
        </motion.div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    try {
        console.log(context.req.cookies);

        let prodRes = [] as Producto[];
        let cliRes = [] as Cliente[];

        const productStateResponse = await (await fetch('http://localhost:3000/api/productos/estado')).json();
        const clientStateResponse = await (await fetch('http://localhost:3000/api/clientes/estado')).json();

        console.log(productStateResponse);


        if (context.req.cookies.StateIdentifierProduct !== productStateResponse.databaseState) {
            const pRes = await fetch('http://localhost:3000/api/productos');
            prodRes = CreateProductList(await pRes.json());

            context.res.setHeader("Set-Cookie", cookie.serialize('StateIdentifierProduct', productStateResponse.databaseState, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: 'strict',
                maxAge: 4 * 60 * 60,
                path: '/'
            }));
        }

        if (context.req.cookies.StateIdentifierClientes !== clientStateResponse.databaseState) {
            const cRes = await fetch('http://localhost:3000/api/clientes');
            cliRes = CreateClientList(await cRes.json());

            context.res.setHeader("Set-Cookie", cookie.serialize('StateIdentifierClient', clientStateResponse.databaseState, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: 'strict',
                maxAge: 4 * 60 * 60,
                path: '/'
            }));
        }

        return {
            props: {
                productos: prodRes,
                clientes: cliRes
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