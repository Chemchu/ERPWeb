import { useEffect, useState } from "react";
import { ProductPage } from "../../../components/sidebar/Productos/productosTab";
import useProductContext from "../../../context/productContext";
import DashboardLayout from "../../../layout";
import { Producto } from "../../../tipos/Producto";
import { CreateProductList } from "../../../utils/typeCreator";

const Productos = () => {
    const { Productos, SetProductos } = useProductContext();
    const [serverUp, setServerUp] = useState<boolean>(true)

    useEffect(() => {
        async function GetAllData() {
            try {
                let prodRes = [] as Producto[];

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

                if (pResponse.status > 200) {
                    setServerUp(false);
                    SetProductos([]);

                    return;
                }
                const pJson = await pResponse.json();

                prodRes = CreateProductList(pJson.productos);
                if (prodRes.length > 0) SetProductos(prodRes);
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