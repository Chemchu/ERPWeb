import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import EstadisticasPage from "../../../components/content/Estadisticas";
import SimpleListBox from "../../../components/elementos/Forms/simpleListBox";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";

const renderTabPages = (currentElemento: string) => {
  switch (currentElemento) {
    case "Resumen":
      return (
        <div key={"Resumen"} className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}>
          <EstadisticasPage />
        </div>
      );

    default:
      return <span>Tab no encontrado!</span>;
  }
};

const Stats = (props: { EmpleadoSesion: SesionEmpleado }) => {
  const { Empleado, SetEmpleado } = useEmpleadoContext();
  const [currentElemento, setElemento] = useState<string>("Resumen");

  useEffect(() => {
    if (Object.keys(Empleado).length === 0) {
      SetEmpleado(props.EmpleadoSesion);
    }
  }, []);
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full h-full sm:hidden">
        <div>
          <SimpleListBox
            elementos={["Resumen"]}
            defaultValue={"Resumen"}
            setElemento={setElemento}
            disabled
            className="w-full h-full p-2 border-b text-xl bg-blue-500 text-white"
          />
        </div>
        <div className="w-full h-10 grow bg-white">{renderTabPages(currentElemento)}</div>
      </div>
      <Tab.Group as="div" className="hidden sm:flex sm:flex-col w-full h-full">
        <Tab.List className="flex sm:gap-1 h-10 grow-0 sm:pr-10">
          <Tab
            key={"Ventas"}
            className={(props: { selected: any }) =>
              classNames(
                "w-2/5 sm:w-1/4 h-full text-sm sm:rounded-t-3xl border-t border-x border-gray-300 px-1",
                "focus:outline-none ring-white ring-opacity-60",
                props.selected ? "bg-white shadow-lg" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
              )
            }
          >
            <span className="text-xl">Resumen</span>
          </Tab>
        </Tab.List>
        <Tab.Panels className="flex flex-col h-10 grow w-full">
          <Tab.Panel
            key={"Resumen"}
            className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
          >
            <EstadisticasPage />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

Stats.PageLayout = DashboardLayout;

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
    rol: Roles[jwt.rol as keyof typeof Roles],
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

export default Stats;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
