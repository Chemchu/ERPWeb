import { useEffect, useState } from 'react';
import SalesPage from '../../../components/sidebar/Ventas/ventasTabs'
import DashboardLayout from '../../../layout';
import { Cliente } from '../../../tipos/Cliente';
import { Venta } from '../../../tipos/Venta';
import { CreateSalesList } from '../../../utils/typeCreator';

const Ventas = () => {
    useEffect(() => {
        const GetAllData = async () => {
            const vRes = await fetch('/api/ventas', {
                headers: { 'Content-type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(
                    {
                        limit: 3000,
                        neededValues: `_id
                                        productos {
                                        _id
                                        nombre
                                        precioVenta
                                        ean
                                        cantidadVendida
                                        createdAt
                                        updatedAt
                                        familia
                                        }
                                        dineroEntregadoEfectivo
                                        dineroEntregadoTarjeta
                                        precioVentaTotal
                                        cambio
                                        cliente {
                                        _id
                                        nombre
                                        }
                                        vendidoPor {
                                        _id
                                        nombre
                                        apellidos
                                        }
                                        tipo
                                        descuentoEfectivo
                                        descuentoPorcentaje
                                        createdAt
                                        updatedAt`
                    }
                )
            });

            const ventas = await vRes.json();
            setVentas(CreateSalesList(JSON.parse(ventas.data)));
        }

        GetAllData();
    }, []);

    const [Ventas, setVentas] = useState<Venta[]>([]);
    const [Clientes, setClientes] = useState<Cliente[]>([]);

    return (
        <SalesPage ventas={Ventas} clientes={Clientes} />
    );
}

Ventas.PageLayout = DashboardLayout;

export default Ventas;