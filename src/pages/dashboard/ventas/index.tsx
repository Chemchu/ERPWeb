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
    try {
        const v = await (await fetch(`${envInformation.ERPBACK_URL}api/ventas`)).json();
        const c = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();

        console.log("Request a DB hecho! - Ventas");
        console.log(c);


        const ventas: Venta[] = CreateSalesList(v.message);
        const clientes: Cliente[] = CreateClientList(c.message);

        return {
            props: {
                ventas: ventas,
                clientes: clientes
            }
        }
    }
    catch (e) {
        console.log(e);

        return {
            props: {
                ventas: [] as Venta[],
                clientes: [] as Cliente[]
            }
        }

    }
}


export default Ventas;