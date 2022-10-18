import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import EstadisticasPage from "../../../components/sidebar/Estadisticas";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";

const Stats = (props: { EmpleadoSesion: SesionEmpleado }) => {
    const { Empleado, SetEmpleado } = useEmpleadoContext();

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(props.EmpleadoSesion)
        }

    }, []);
    return (
        <div className="w-full h-full p-2">
            <Tab.Group as="div" className="flex flex-col w-full h-full">
                <Tab.List className="flex gap-1 h-10 pr-10">
                    <Tab
                        key={"Ventas"}
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
                            Resumen
                        </span>
                    </Tab>
                </Tab.List>
                <Tab.Panels className="flex flex-col h-90v w-full pr-2 ">
                    <Tab.Panel
                        key={"Resumen"}
                        className={classNames(
                            'pb-3 h-full w-full',
                            'focus:outline-none ring-white ring-opacity-60'
                        )}
                    >
                        <EstadisticasPage />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group >
        </div>
    );
}

Stats.PageLayout = DashboardLayout;

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
        rol: Roles[jwt.rol as keyof typeof Roles],
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

export default Stats;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}