import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import EnDesarrolloPage from "../../../components/enDesarrollo";
import EmpleadosPage from "../../../components/sidebar/Empleados";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { Cierre } from "../../../tipos/Cierre";
import { Empleado, SesionEmpleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";
import { ITPV } from "../../../tipos/TPV";
import { FetchEmpleados } from "../../../utils/fetches/empleadoFetches";
import { FetchTPVs } from "../../../utils/fetches/tpvFetches";

const Empleados = (props: { EmpleadoSesion: SesionEmpleado }) => {
    const { Empleado, SetEmpleado } = useEmpleadoContext();

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(props.EmpleadoSesion)
        }
    }, []);

    return (
        <Tab.Group as="div" className="flex flex-col w-full h-full pt-3 pr-2">
            <Tab.List className="flex gap-1 h-10 pr-10">
                <Tab
                    key={"Empleados"}
                    className={(props: { selected: any }) =>
                        classNames(
                            'w-1/4 h-full text-sm rounded-t-2xl border-t border-x',
                            'focus:outline-none ring-white ring-opacity-60',
                            props.selected
                                ? 'bg-white shadow-lg'
                                : 'bg-gray-200 hover:bg-blue-400 hover:text-white'
                        )
                    }
                >
                    <span className='text-xl'>
                        Empleados
                    </span>
                </Tab>
                <Tab
                    key={"Turnos"}
                    className={(props: { selected: any }) =>
                        classNames(
                            'w-1/4 h-full text-sm rounded-t-2xl border-t border-x',
                            'focus:outline-none ring-white ring-opacity-60',
                            props.selected
                                ? 'bg-white shadow-lg'
                                : 'bg-gray-200 hover:bg-blue-400 hover:text-white'
                        )
                    }
                >
                    <span className='text-xl'>
                        Turnos
                    </span>
                </Tab>
            </Tab.List >
            <Tab.Panels className="flex flex-col h-90v w-full pr-2">
                <Tab.Panel
                    key={"Empleados"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <EmpleadosPage />
                </Tab.Panel>
                <Tab.Panel
                    key={"EnDesarrollo"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <EnDesarrolloPage />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group >
    );
}

Empleados.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const [jwt, isValidCookie] = getJwtFromString(context.req.cookies.authorization);

    if (!isValidCookie) {
        return {
            redirect: {
                permanent: false,
                destination: `/login`
            },
        };
    }
    let emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
    }
    if (jwt.TPV) {
        emp.TPV = jwt.TPV
    }

    return {
        props: {
            EmpleadoSesion: emp
        }
    }
}

export default Empleados;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}