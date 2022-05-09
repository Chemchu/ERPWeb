import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import CierrePage from "../../../components/sidebar/Cierres";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { Cierre } from "../../../tipos/Cierre";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";
import { TPVType } from "../../../tipos/TPV";
import { FetchCierres } from "../../../utils/fetches/cierresFetches";
import { FetchTPVs } from "../../../utils/fetches/tpvFetches";

const Cierres = (props: { EmpleadoSesion: SesionEmpleado }) => {
    const [CierresList, SetCierres] = useState<Cierre[]>([]);
    const [tpvs, SetTpvs] = useState<TPVType[]>([]);
    const { Empleado, SetEmpleado } = useEmpleadoContext();

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(props.EmpleadoSesion)
        }
        const GetAllData = async () => {
            SetCierres(await FetchCierres());
            SetTpvs(await FetchTPVs());
        }
        GetAllData();
    }, []);

    if (CierresList.length <= 0) {
        return (
            <div>
                Cargando..
            </div>
        )
    }

    return (
        <Tab.Group as="div" className="flex flex-col w-full h-full pt-3 pr-2">
            <Tab.List className="flex gap-1 h-10 pr-10">
                <Tab
                    key={"Cierres"}
                    className={({ selected }) =>
                        classNames(
                            'w-1/4 h-full text-sm rounded-t-2xl border-t border-x',
                            'focus:outline-none ring-white ring-opacity-60',
                            selected
                                ? 'bg-white shadow-lg'
                                : 'hover:bg-blue-400 hover:text-white'
                        )
                    }
                >
                    <span className='text-xl'>
                        Cierres
                    </span>
                </Tab>
            </Tab.List>
            <Tab.Panels className="flex flex-col h-90v w-full pr-2">
                <Tab.Panel
                    key={"Cierres"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <CierrePage cierres={CierresList} tpvs={tpvs} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group >
    );
}

Cierres.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const jwt = getJwtFromString(context.req.cookies.authorization);
    let emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
    }
    jwt.TPV ? emp.TPV = jwt.TPV : null;

    return {
        props: {
            EmpleadoSesion: emp
        }
    }
}

export default Cierres;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}