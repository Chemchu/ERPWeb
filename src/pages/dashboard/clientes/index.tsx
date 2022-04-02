import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import ClientesPage from "../../../components/sidebar/Clientes";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { Cliente } from "../../../tipos/Cliente";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { FetchClientes } from "../../../utils/fetches";

const Clientes = (props: { EmpleadoSesion: SesionEmpleado }) => {
    const [Clientes, SetClientes] = useState<Cliente[]>([]);
    const { Empleado, SetEmpleado } = useEmpleadoContext();

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(props.EmpleadoSesion)
        }
        const GetAllData = async () => {
            SetClientes(await FetchClientes());
        }
        GetAllData();
    }, []);

    return (
        <Tab.Group as="div" className="flex flex-col w-full h-full pt-3 pr-2">
            <Tab.List className="flex gap-1 h-10">
                <Tab
                    key={"Clientes"}
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
                        Clientes
                    </span>
                </Tab>
                <Tab
                    key={"TPV"}
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
                        Proveedores
                    </span>
                </Tab>

            </Tab.List>
            <Tab.Panels className="flex flex-col h-90v w-full pr-2">
                <Tab.Panel
                    key={"Configuracion"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <ClientesPage Clientes={Clientes} />
                </Tab.Panel>

                <Tab.Panel
                    key={"TPV"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <div>
                        Proveedores page
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group >
    );
}

Clientes.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const jwt = getJwtFromString(context.req.cookies.authorization);
    const emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: jwt.rol,
        TPV: jwt.TPV
    }

    return {
        props: {
            EmpleadoSesion: emp
        }
    }
}

export default Clientes;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}