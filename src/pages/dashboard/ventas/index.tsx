import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import DevolucionesPage from '../../../components/sidebar/Ventas/devolucionesTab';
import SalesPage from '../../../components/sidebar/Ventas/ventasTab'
import DashboardLayout from '../../../layout';
import { Cliente } from '../../../tipos/Cliente';
import { Venta } from '../../../tipos/Venta';
import { FetchVentas } from '../../../utils/fetches';

const Ventas = () => {
    const [Ventas, setVentas] = useState<Venta[]>([]);
    const [Devoluciones, setDevoluciones] = useState<Venta[]>([]); // ---> Una devolución no es más que una venta con precioTotal en negativo
    const [Clientes,] = useState<Cliente[]>([]);

    useEffect(() => {
        const GetAllData = async () => {
            const ventas = await FetchVentas();
            const reembolsos = ventas.filter((venta) => { return venta.precioVentaTotal < 0 });
            setVentas(ventas);
            setDevoluciones(reembolsos);
        }

        GetAllData();
    }, []);

    return (
        <Tab.Group as="div" className="flex flex-col w-full h-full pt-3 pr-2">
            <Tab.List className="flex gap-1 h-10">
                <Tab
                    key={"Ventas"}
                    className={({ selected }) =>
                        classNames(
                            'w-1/4 h-full text-sm rounded-t-2xl border-t border-x',
                            'focus:outline-none ring-white ring-opacity-60',
                            selected
                                ? 'bg-white shadow-lg'
                                : 'bg-gray-200 hover:bg-blue-400 hover:text-white'
                        )
                    }
                >
                    <span className='text-xl'>
                        Ventas
                    </span>
                </Tab>
                <Tab
                    key={"Devoluciones"}
                    className={({ selected }) =>
                        classNames(
                            'w-1/4 h-full text-sm rounded-t-2xl border-t border-x',
                            'focus:outline-none  ring-white ring-opacity-60',
                            selected
                                ? 'bg-white shadow-md'
                                : 'bg-gray-200 hover:bg-blue-400 hover:text-white'
                        )
                    }
                >
                    <span className='text-xl'>
                        Devoluciones
                    </span>
                </Tab>
            </Tab.List>
            <Tab.Panels className="flex flex-col h-90v w-full pr-2">
                <Tab.Panel
                    key={"Ventas"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <SalesPage ventas={Ventas} clientes={Clientes} />
                </Tab.Panel>

                <Tab.Panel
                    key={"Devoluciones"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <DevolucionesPage ventas={Devoluciones} clientes={Clientes} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group >
    );
}

Ventas.PageLayout = DashboardLayout;

export default Ventas;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}