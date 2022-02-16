import { useEffect, useState } from 'react';
import SalesPage from '../../../components/sidebar/Ventas/ventasTabs'
import useClientContext from '../../../context/clientContext';
import useVentaContext from '../../../context/ventasContext';
import DashboardLayout from '../../../layout';
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

                // const vResponse = await fetch('/api/ventas/estado');
                // const cResponse = await fetch('/api/clientes/estado');

                // if (vResponse.status > 200 || cResponse.status > 200) {
                //     SetVentas([]);
                //     SetClientes([]);

                //     return;
                // }
                // const vState = await vResponse.json();
                // const cState = await cResponse.json();

                // if (VentasState !== vState.message?.databaseState || Ventas.length <= 0) {
                //     SetVentasState(vState.message?.databaseState);

                //     const vRes = await (await fetch(`/api/ventas`)).json();
                //     ventasRes = CreateSalesList(vRes);

                //     if (ventasRes.length > 0) SetVentas(ventasRes);
                // }

                // if (ClientesState !== cState.message?.databaseState || Clientes.length <= 0) {
                //     SetClientesState(cState.message?.databaseState);

                //     const cRes = await (await fetch('/api/clientes')).json();
                //     cliRes = CreateClientList(cRes);

                //     if (cliRes.length > 0) SetClientes(cliRes);
                // }

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

Ventas.PageLayout = DashboardLayout;

export default Ventas;