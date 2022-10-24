import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import DevolucionesPage from "../../../components/sidebar/Ventas/devolucionesTab";
import SalesPage from "../../../components/sidebar/Ventas/ventasTab";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";

const Ventas = (props: { EmpleadoSesion: SesionEmpleado }) => {
  const { Empleado, SetEmpleado } = useEmpleadoContext();

  useEffect(() => {
    if (Object.keys(Empleado).length === 0) {
      SetEmpleado(props.EmpleadoSesion);
    }
  }, []);

  return (
    <Tab.Group as="div" className="flex flex-col w-full h-screen p-2">
      <Tab.List className="flex gap-1 grow-0 h-10">
        <Tab
          key={"Ventas"}
          className={(props: { selected: any }) =>
            classNames(
              "w-1/4 h-full text-sm rounded-t-2xl border-t border-x",
              "focus:outline-none ring-white ring-opacity-60",
              props.selected ? "bg-white shadow-lg" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
            )
          }
        >
          <span className="text-xl">Ventas</span>
        </Tab>
        <Tab
          key={"Devoluciones"}
          className={(props: { selected: any }) =>
            classNames(
              "w-1/4 h-full text-sm rounded-t-2xl border-t border-x",
              "focus:outline-none  ring-white ring-opacity-60",
              props.selected ? "bg-white shadow-md" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
            )
          }
        >
          <span className="text-xl">Devoluciones</span>
        </Tab>
      </Tab.List>
      <Tab.Panels className="flex flex-col h-10 grow w-full">
        <Tab.Panel
          key={"Ventas"}
          className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
        >
          <SalesPage />
        </Tab.Panel>

        <Tab.Panel
          key={"Devoluciones"}
          className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
        >
          <DevolucionesPage />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [jwt, isValidCookie] = getJwtFromString(context.req.cookies.authorization);

  if (!isValidCookie) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }
  let emp: SesionEmpleado = {
    _id: jwt._id,
    apellidos: jwt.apellidos,
    email: jwt.email,
    nombre: jwt.nombre,
    rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
  };
  if (jwt.TPV) {
    emp.TPV = jwt.TPV;
  }

  return {
    props: {
      EmpleadoSesion: emp,
    },
  };
};

Ventas.PageLayout = DashboardLayout;

export default Ventas;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
