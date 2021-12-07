import { AppContext } from "next/app";
import { POS } from "../../../components/Tabs/pointOfSale/pos";
import { config } from "../../api/config";

const TPV = (props: { productos: any, clientes: any }) => {
    return (
        <POS productos={props.productos} clientes={props.clientes} />
    );
}

export async function getServerSideProps(context: AppContext) {
    const prod = await (await fetch(`${config.ERPBACK_URL}api/productos`)).json();
    const clients = await (await fetch(`${config.ERPBACK_URL}api/clientes`)).json();

    console.log("Request a DB hecho!");

    return {
        props: {
            productos: prod.message,
            clientes: clients.message
        }
    }
}

export default TPV;