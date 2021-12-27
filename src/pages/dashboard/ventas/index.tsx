import { useEffect } from 'react';
import SalesPage from '../../../components/Tabs/Ventas/ventasTabs'
import useClientContext from '../../../context/clientContext';
import useVentaContext from '../../../context/ventasContext';
import Layout from '../../../layout';
import { Cliente } from '../../../tipos/Cliente';
import { Venta } from '../../../tipos/Venta';
import { CreateClientList, CreateSalesList } from '../../../utils/typeCreator';

const Ventas = () => {
    const { Ventas, SetVentas, VentasState, SetVentasState } = useVentaContext();
    const { Clientes, SetClientes, ClientesState, SetClientesState } = useClientContext();

    useEffect(() => {
        async function GetAllData() {
            try {
                let cliRes: Cliente[];
                let ventasRes: Venta[];

                const vResponse = await (await fetch('/api/ventas/estado')).json();
                const cResponse = await (await fetch('/api/clientes/estado')).json();

                const vState = vResponse.message.databaseState;
                const cState = cResponse.message.databaseState;

                if (VentasState !== vState || Ventas.length <= 0) {
                    SetVentasState(vState);

                    const vRes = await (await fetch(`/api/ventas`)).json();
                    ventasRes = CreateSalesList(vRes);

                    if (ventasRes.length > 0) SetVentas(ventasRes);
                }

                if (ClientesState !== cState || Clientes.length <= 0) {
                    SetClientesState(cState);

                    const cRes = await (await fetch('/api/clientes')).json();
                    cliRes = CreateClientList(cRes);

                    if (cliRes.length > 0) SetClientes(cliRes);
                }

            }
            catch (e) {
                SetVentas([]);
                SetClientes([]);
            }
        }
        GetAllData();
    }, [])

    return (
        <SalesPage ventas={Ventas} clientes={Clientes} />
    );
}

Ventas.PageLayout = Layout;

export default Ventas;