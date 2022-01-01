import { useEffect, useState } from "react";
import { ProductPage } from "../../../components/Tabs/Productos/productosTab";
import useProductContext from "../../../context/productContext";
import DashboardLayout from "../../../layout";
import { Producto } from "../../../tipos/Producto";
import { CreateProductList } from "../../../utils/typeCreator";

const Productos = () => {
    const { Productos, SetProductos, ProductState, SetProductState } = useProductContext();
    const [serverUp, setServerUp] = useState<boolean>(true)

    useEffect(() => {
        async function GetAllData() {
            try {
                let prodRes = [] as Producto[];

                const pResponse = await fetch('/api/productos/estado');

                if (pResponse.status > 200) {
                    setServerUp(false);

                    return;
                }

                const pState = await pResponse.json();

                if (ProductState !== pState.message?.databaseState || Productos.length <= 0) {
                    SetProductState(pState.message?.databaseState);

                    const pRes = await fetch('/api/productos');

                    if (pRes.status > 200) {
                        SetProductos([]);
                        setServerUp(false);

                        return;
                    }
                    prodRes = CreateProductList(await pRes.json());

                    if (prodRes.length > 0) SetProductos(prodRes);
                }
            }
            catch (e) {
                console.log(e);
                SetProductos([]);
            }
        }
        GetAllData();
    }, []);

    return (
        <ProductPage productos={Productos} serverUp={serverUp} />
    );
}

Productos.PageLayout = DashboardLayout;

export default Productos;