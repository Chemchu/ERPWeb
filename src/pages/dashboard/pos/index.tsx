import React, { useEffect } from "react";
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

    useEffect(() => {
        async function GetAllData() {
            try {
                let prodRes = [] as Producto[];
                let cliRes = [] as Cliente[];

                const pResponse = await (await fetch('/api/productos/estado')).json();
                const cResponse = await (await fetch('/api/clientes/estado')).json();

                const pState = pResponse.message.databaseState;
                const cState = cResponse.message.databaseState;

                if (ProductState !== pState || Productos.length <= 0) {
                    SetProductState(pState);

                    const pRes = await (await fetch('/api/productos')).json();
                    prodRes = CreateProductList(pRes);

                    if (prodRes.length > 0) SetProductos(prodRes);
                }

                if (ClientesState !== cState || Clientes.length <= 0) {
                    SetClientesState(cState);

                    const cRes = await (await fetch('/api/clientes')).json();
                    cliRes = CreateClientList(cRes);

                    if (cliRes.length > 0) SetClientes(cliRes);
                }
            }
            catch (e) {
                console.log(e);

                SetProductos([]);
                SetClientes([]);
            }
        }

        GetAllData().catch(console.error);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TPV clientes={Clientes} productos={Productos} />
        </motion.div>
    );
}


PuntoDeVenta.PageLayout = DashboardLayout;

export default PuntoDeVenta;
