import { useEffect, useState } from "react";
import ProductPage from "../../../components/sidebar/Productos/productosTab";
import DashboardLayout from "../../../layout";
import { Producto } from "../../../tipos/Producto";
import { FetchProductos } from "../../../utils/fetches";

const Productos = () => {
    const [Productos, SetProductos] = useState<Producto[]>([]);
    const [serverUp, setServerUp] = useState<boolean>(true)

    useEffect(() => {
        const GetAllData = async () => {
            SetProductos(await FetchProductos());
        }
        GetAllData();
    }, []);

    return (
        <ProductPage productos={Productos} serverUp={serverUp} />
    );
}

Productos.PageLayout = DashboardLayout;

export default Productos;