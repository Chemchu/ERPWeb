import Cookies from "js-cookie";
import { GetServerSideProps } from "next/types";
import { ProductPage } from "../../../components/Tabs/Productos/productosTab";
import useProductContext from "../../../context/productContext";
import Layout from "../../../layout";
import { Producto } from "../../../tipos/Producto";
import { CreateProductList } from "../../../utils/typeCreator";

const Productos = (props: { productos: Producto[], prodStateCookie: string }) => {
    const { Productos, SetProductos } = useProductContext();

    Cookies.set('StateIdentifierProduct', props.prodStateCookie);

    if (props.productos.length > 0) SetProductos(props.productos);

    return (
        <ProductPage productos={props.productos.length > 0 ? props.productos : Productos} />
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let prodRes = [] as Producto[];

        const pResponse = await (await fetch('http://localhost:3000/api/productos/estado')).json();

        const pState = pResponse.message.databaseState || 'NoStateSavedInServer';

        if (context.req.cookies.StateIdentifierProduct !== pState || pState === 'NoStateSavedInServer') {
            const pRes = await (await fetch('http://localhost:3000/api/productos')).json();
            prodRes = CreateProductList(pRes);
        }

        return {
            props: {
                productos: prodRes,
                prodStateCookie: pState
            }
        }
    }
    catch (e) {
        console.log(e);
        return {
            props: {
                productos: [] as Producto[],
            }
        }
    }
}

Productos.PageLayout = Layout;

export default Productos;