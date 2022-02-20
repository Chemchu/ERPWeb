import React, { useEffect, useState } from "react";
import TPV from "../../../components/sidebar/pointOfSale/tpv";
import useProductContext from "../../../context/productContext";
import useClientContext from "../../../context/clientContext";
import DashboardLayout from "../../../layout";
import { motion } from "framer-motion";
import { Producto } from "../../../tipos/Producto";
import { Cliente } from "../../../tipos/Cliente";
import { CreateClientList, CreateProductList } from "../../../utils/typeCreator";
import TpvOpenModal from "../../../components/modal/tpvOpen";
import { parseJwt } from "../../../utils/parseJwt";
import Cookies from "js-cookie";

const PuntoDeVenta = () => {
    const { Productos, SetProductos } = useProductContext();
    const { SetClientes } = useClientContext();
    const [ServerUp, setServerUp] = useState<boolean>(true);
    const authCookie = Cookies.get("authorization");

    useEffect(() => {
        async function GetAllData() {
            try {
                let prodRes = [] as Producto[];
                let cliRes = [] as Cliente[];

                const pResponse = await fetch('/api/productos', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        find: {},
                        limit: 3000,
                        neededValues: ["_id", "nombre", "proveedor", "familia",
                            "precioVenta", "precioCompra", "iva", "margen",
                            "ean", "promociones", "cantidad", "cantidadRestock", "alta"]
                    })
                });

                const cResponse = await fetch('/api/clientes', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        find: {},
                        limit: 50,
                        neededValues: ["_id", "nombre", "nif", "calle", "cp"]
                    })
                });

                if (pResponse.status > 200 || cResponse.status > 200) {
                    setServerUp(false);
                    SetProductos([]);
                    SetClientes([]);

                    return;
                }

                const pJson = await pResponse.json();
                const cJson = await cResponse.json();

                prodRes = CreateProductList(pJson.productos);
                if (prodRes.length > 0) SetProductos(prodRes.filter((p) => { return p.alta === true }));

                cliRes = CreateClientList(cJson.clientes);
                if (cliRes.length > 0) SetClientes(cliRes.filter((c) => { return c.nif !== null }));
            }
            catch (e) {
                console.log(e);
                SetProductos([]);
                SetClientes([]);
            }
        }

        GetAllData();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {
                authCookie && !parseJwt(authCookie).TPV && <TpvOpenModal />
            }
            <TPV productos={Productos} serverOperativo={ServerUp} />
        </motion.div>
    );
}

PuntoDeVenta.PageLayout = DashboardLayout;

export default PuntoDeVenta;
