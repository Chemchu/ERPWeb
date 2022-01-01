import React, { useEffect, useState } from "react";
import TPV from "../../../components/Tabs/pointOfSale/tpv";
import useProductContext from "../../../context/productContext";
import useClientContext from "../../../context/clientContext";
import DashboardLayout from "../../../layout";
import { motion } from "framer-motion";
import { Producto } from "../../../tipos/Producto";
import { Cliente } from "../../../tipos/Cliente";
import { CreateClientList, CreateProductList } from "../../../utils/typeCreator";

const PuntoDeVenta = () => {
    const { Productos, SetProductos, ProductState, SetProductState } = useProductContext();
    const { Clientes, SetClientes, ClientesState, SetClientesState } = useClientContext();
    const [ServerUp, setServerUp] = useState<boolean>(true);

    useEffect(() => {
        async function GetAllData() {
            let prodRes = [] as Producto[];
            let cliRes = [] as Cliente[];

            const pResponse = await fetch('/api/productos/estado');
            const cResponse = await fetch('/api/clientes/estado');

            if (pResponse.status > 200 || cResponse.status > 200) {
                SetProductos([]);
                SetClientes([]);
                setServerUp(false);

                return;
            }

            const pState = await pResponse.json();
            const cState = await cResponse.json();

            if (ProductState !== pState.message?.databaseState || Productos.length <= 0) {
                SetProductState(pState.message?.databaseState);

                const pRes = await fetch('/api/productos');

                if (pRes.status > 200) {
                    SetProductos([]);
                    SetClientes([]);
                    setServerUp(false);

                    return;
                }
                prodRes = CreateProductList(await pRes.json());

                if (prodRes.length > 0) SetProductos(prodRes);
            }

            if (ClientesState !== cState.message?.databaseState || Clientes.length <= 0) {
                SetClientesState(cState.message?.databaseState);

                const cRes = await fetch('/api/clientes');

                if (cRes.status > 200) {
                    SetProductos([]);
                    SetClientes([]);
                    setServerUp(false);
                }

                cliRes = CreateClientList(await cRes.json());

                if (cliRes.length > 0) SetClientes(cliRes);
            }
        }

        GetAllData();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TPV clientes={Clientes} productos={Productos} serverOperativo={ServerUp} />
        </motion.div>
    );
}

PuntoDeVenta.PageLayout = DashboardLayout;

export default PuntoDeVenta;
