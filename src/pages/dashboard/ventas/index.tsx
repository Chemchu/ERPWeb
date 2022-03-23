import { Tab } from '@headlessui/react';
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
        <Tab.Group as="div" className="h-screen w-full bg-red-500 p-2">
            <Tab.List className="flex p-1 rounded-2xl">
                <Tab
                    key={"Ventas"}
                    className={({ selected }) =>
                        classNames(
                            'w-full py-2 text-sm leading-5 font-medium rounded-lg',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                            selected
                                ? 'bg-white shadow-md'
                                : ' hover:bg-blue-300 hover:text-white'
                        )
                    }
                >
                    {"Ventas"}
                </Tab>
                <Tab
                    key={"Reembolsos"}
                    className={({ selected }) =>
                        classNames(
                            'w-full text-sm leading-5 font-medium rounded-lg',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                            selected
                                ? 'bg-white shadow-md'
                                : 'hover:bg-blue-300 hover:text-white'
                        )
                    }
                >
                    {"Reembolsos"}
                </Tab>
            </Tab.List>
            <Tab.Panels className="flex flex-col h-full w-full p-2 bg-blue-500">
                <Tab.Panel
                    key={"Ventas"}
                    className={classNames(
                        'bg-white rounded-2xl p-3 shadow-md',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                    )}
                >
                    <SalesPage ventas={Ventas} clientes={Clientes} />
                </Tab.Panel>

                <Tab.Panel
                    key={"Reembolsos"}
                    className={classNames(
                        'bg-white rounded-2xl p-3 shadow-md',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                    )}
                >
                    Reembolsos Page
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