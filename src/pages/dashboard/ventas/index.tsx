import { GetServerSideProps } from 'next'
import SalesPage from '../../../components/Tabs/Ventas/ventasTabs'
import { Cliente } from '../../../tipos/Cliente';
import { Venta } from '../../../tipos/Venta';
import { CreateClientList, CreateSalesList } from '../../../utils/typeCreator';

const Ventas = (props: { ventas: Venta[], clientes: Cliente[] }) => {
    return (
        <SalesPage ventas={props.ventas} clientes={props.clientes} />
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const v = await fetch(`http://localhost:3000/api/ventas`);
        const c = await fetch(`http://localhost:3000/api/clientes`);

        const ventas: Venta[] = CreateSalesList(await v.json());
        const clientes: Cliente[] = CreateClientList(await c.json());

        return {
            props: {
                ventas: ventas,
                clientes: clientes
            }
        }

    }
    catch (e) {
        return {
            props: {
                ventas: [] as Venta[],
                clientes: [] as Cliente[]
            }
        }

    }
}


export default Ventas;