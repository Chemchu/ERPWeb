import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import ProductPage from "../../../components/sidebar/Productos/productosTab";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { Producto } from "../../../tipos/Producto";
import { FetchProductos } from "../../../utils/fetches";

const Productos = (props: { EmpleadoSesion: SesionEmpleado }) => {
    const [Productos, SetProductos] = useState<Producto[]>([]);
    const [serverUp, setServerUp] = useState<boolean>(true)

    const { Empleado, SetEmpleado } = useEmpleadoContext();

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(props.EmpleadoSesion)
        }

        const GetAllData = async () => {
            SetProductos(await FetchProductos());
        }
        GetAllData();
    }, []);

    return (
        <Tab.Group as="div" className="flex flex-col w-full h-full pt-3 pr-2">
            <Tab.List className="flex gap-1 h-10 pr-10">
                <Tab
                    key={"Productos"}
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
                        Productos
                    </span>
                </Tab>
                <Tab
                    key={"Mermas"}
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
                        Mermas
                    </span>
                </Tab>
                <Tab
                    key={"Inventario"}
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
                        Inventario
                    </span>
                </Tab>
                <Tab
                    key={"Pedidos"}
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
                        Pedidos
                    </span>
                </Tab>
            </Tab.List>
            <Tab.Panels className="flex flex-col h-90v w-full pr-2">
                <Tab.Panel
                    key={"Productos"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <ProductPage Productos={Productos} SetProductos={SetProductos} serverUp={serverUp} />
                </Tab.Panel>
                <Tab.Panel
                    key={"Mermas"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <div>
                        Mermas page
                    </div>
                </Tab.Panel>
                <Tab.Panel
                    key={"Inventario"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <div>
                        Inventario page
                    </div>
                </Tab.Panel>
                <Tab.Panel
                    key={"Pedidos"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <div>
                        Pedidos page
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group >
    );
}

Productos.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const jwt = getJwtFromString(context.req.cookies.authorization);
    let emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: jwt.rol,
    }
    jwt.TPV ? emp.TPV = jwt.TPV : null;

    return {
        props: {
            EmpleadoSesion: emp
        }
    }
}

export default Productos;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}