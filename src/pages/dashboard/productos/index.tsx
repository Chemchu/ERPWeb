import { AppContext } from "next/app";
import { ProductPage } from "../../../components/Tabs/Productos/productosTab";
import { Producto } from "../../../tipos/Producto";
import { envInformation } from "../../api/envInfo";
import { CreateProductList } from "../../api/typeCreator";

const Productos = (props: { productos: Producto[] }) => {
    return (
        <ProductPage productos={props.productos} />
    );
}

export async function getServerSideProps(context: AppContext) {
    try {
        const res = await fetch(`${envInformation.ERPBACK_URL}api/productos`);
        const prodData = await res.json();

        console.log("Request a DB hecho!");

        const p: Producto[] = CreateProductList(prodData.message);

        return {
            props: {
                productos: p,
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

export default Productos;