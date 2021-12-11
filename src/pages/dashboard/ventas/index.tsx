import { GetServerSideProps } from 'next'
import SalesPage from '../../../components/Tabs/Ventas/ventasTabs'
import { Cliente } from '../../../tipos/Cliente';
import { Venta } from '../../../tipos/Venta';
import { envInformation } from '../../api/envInfo';
import { CreateClientList, CreateSalesList } from '../../api/typeCreator';

const Ventas = (props: { ventas: Venta[], clientes: Cliente[] }) => {
    return (
        <SalesPage ventas={props.ventas} clientes={props.clientes} />
    );
}

// TODO: terminar de ajustarlo con el back
export const getServerSideProps: GetServerSideProps = async (context) => {
    const v = await (await fetch(`${envInformation.ERPBACK_URL}api/ventas`)).json();
    const c = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();

    console.log("Request a DB hecho! - Ventas");
    console.log(c);


    const ventas = CreateSalesList(v.message);
    const clientes = CreateClientList(c.message);

    return {
        props: {
            ventas: ventas,
            clientes: clientes
        }
    }
}


export default Ventas;