import Cookies from "js-cookie";
import { GetServerSideProps } from "next/types";
import { useEffect } from "react";
import { ProductPage } from "../../../components/Tabs/Productos/productosTab";
import useProductContext from "../../../context/productContext";
import DashboardLayout from "../../../layout";
import { Producto } from "../../../tipos/Producto";
import { CreateProductList } from "../../../utils/typeCreator";

const Productos = () => {
    const { Productos, SetProductos, ProductState, SetProductState } = useProductContext();

    useEffect(() => {
        async function GetAllData() {
            try {
                let prodRes = [] as Producto[];

                const pResponse = await (await fetch('http://localhost:3000/api/productos/estado')).json();
                const pState = pResponse.message.databaseState;

                if (ProductState !== pState || Productos.length <= 0) {
                    SetProductState(pState);

                    const pRes = await (await fetch('/api/productos')).json();
                    prodRes = CreateProductList(pRes);

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
        <ProductPage productos={Productos} />
    );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {
//         let prodRes = [] as Producto[];

//         const pResponse = await (await fetch('http://localhost:3000/api/productos/estado')).json();

//         const pState = pResponse.message.databaseState || 'NoStateSavedInServer';

//         if (context.req.cookies.StateIdentifierProduct !== pState || pState === 'NoStateSavedInServer') {
//             const pRes = await (await fetch('http://localhost:3000/api/productos')).json();
//             prodRes = CreateProductList(pRes);
//         }

//         return {
//             props: {
//                 productos: prodRes,
//                 prodStateCookie: pState
//             }
//         }
//     }
//     catch (e) {
//         console.log(e);
//         return {
//             props: {
//                 productos: [] as Producto[],
//             }
//         }
//     }
// }

Productos.PageLayout = DashboardLayout;

export default Productos;