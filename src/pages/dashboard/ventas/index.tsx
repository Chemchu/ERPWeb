import { useEffect, useState } from 'react';
import SalesPage from '../../../components/sidebar/Ventas/ventasTabs'
import DashboardLayout from '../../../layout';
import { Cliente } from '../../../tipos/Cliente';
import { Venta } from '../../../tipos/Venta';
import { CreateSalesList } from '../../../utils/typeCreator';

const Ventas = () => {
    const [Ventas, setVentas] = useState<Venta[]>([]);
    const [Clientes,] = useState<Cliente[]>([]);

    useEffect(() => {
        const GetAllData = async () => {
            const vRes = await fetch('/api/ventas', {
                headers: { 'Content-type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({ limit: 3000 })
            });

            const ventas = await vRes.json();
            setVentas(CreateSalesList(JSON.parse(ventas.data)));
        }

        GetAllData();
    }, []);

    return (
        <SalesPage ventas={Ventas} clientes={Clientes} />
    );
}

Ventas.PageLayout = DashboardLayout;

export default Ventas;