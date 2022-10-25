import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import ClientesPage from "../../../components/content/Clientes";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";

const Clientes = (props: { EmpleadoSesion: SesionEmpleado }) => {
  const { Empleado, SetEmpleado } = useEmpleadoContext();

  useEffect(() => {
    if (Object.keys(Empleado).length === 0) {
      SetEmpleado(props.EmpleadoSesion);
    }
  }, []);

  return (
    <Tab.Group as="div" className="flex flex-col w-full h-full">
      <Tab.List className="flex sm:gap-1 grow-0 h-10">
        <Tab
          key={"Clientes"}
          className={(props: { selected: any }) =>
            classNames(
              "w-2/5 sm:w-1/4 h-full text-sm sm:rounded-t-3xl border-t border-x border-gray-300 px-1",
              "focus:outline-none ring-white ring-opacity-60",
              props.selected ? "bg-white shadow-lg" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
            )
          }
        >
          <span className="text-xl">Clientes</span>
        </Tab>
      </Tab.List>
      <Tab.Panels className="flex flex-col h-10 grow w-full">
        <Tab.Panel
          key={"Configuracion"}
          className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
        >
          <ClientesPage />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

Clientes.PageLayout = DashboardLayout;

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

export default Clientes;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
