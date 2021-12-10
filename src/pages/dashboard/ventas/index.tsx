import { AppContext } from 'next/app';
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
// export async function getServerSideProps(context: AppContext) {
//     const v = await (await fetch(`${envInformation.ERPBACK_URL}api/ventas`)).json();
//     const c = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();

//     console.log("Request a DB hecho! - Ventas");

//     console.log(v.message[0].productos);


//     const ventas = CreateSalesList(v.message);
//     const clientes = CreateClientList(c.message);

//     return {
//         props: {
//             ventas: ventas,
//             clientes: clientes
//         }
//     }
// }

export default Ventas;