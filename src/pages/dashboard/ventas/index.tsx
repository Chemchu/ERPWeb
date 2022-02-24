import { useEffect, useState } from 'react';
import SalesPage from '../../../components/sidebar/Ventas/ventasTabs'
import DashboardLayout from '../../../layout';
import { Cliente } from '../../../tipos/Cliente';
import { Venta } from '../../../tipos/Venta';
import { FetchVentas } from '../../../utils/fetches';

const Ventas = () => {
    const [Ventas, setVentas] = useState<Venta[]>([]);
    const [Clientes,] = useState<Cliente[]>([]);

    useEffect(() => {
        const GetAllData = async () => {
            setVentas(await FetchVentas());
        }

        GetAllData();
    }, []);

    return (
        <SalesPage ventas={Ventas} clientes={Clientes} />
    );
}

Ventas.PageLayout = DashboardLayout;

export default Ventas;