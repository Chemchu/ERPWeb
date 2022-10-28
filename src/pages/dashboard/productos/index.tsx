import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import EnDesarrolloPage from "../../../components/enDesarrollo";
import MermaPage from "../../../components/content/Mermas";
import ProductPage from "../../../components/content/Productos/productosTab";
import useEmpleadoContext from "../../../context/empleadoContext";
import getJwtFromString from "../../../hooks/jwt";
import DashboardLayout from "../../../layout";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";
import SimpleListBox from "../../../components/elementos/Forms/simpleListBox";

const renderTabPages = (currentElemento: string) => {
  switch (currentElemento) {
    case "Productos":
      return (
        <div key={"Productos"} className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}>
          <ProductPage />
        </div>
      );
    case "Mermas":
      return (
        <div key={"Mermas"} className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}>
          <MermaPage />
        </div>
      );
    case "Inventario":
      return (
        <div
          key={"Inventario"}
          className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
        >
          <EnDesarrolloPage />
        </div>
      );
    case "Pedidos":
      return (
        <div key={"Pedidos"} className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}>
          <EnDesarrolloPage />
        </div>
      );

    default:
      return <span>Tab no encontrado!</span>;
  }
};

const Productos = (props: { EmpleadoSesion: SesionEmpleado }) => {
  const { Empleado, SetEmpleado } = useEmpleadoContext();
  const [currentElemento, setElemento] = useState<string>("Productos");

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
            elementos={["Productos", "Mermas", "Inventario", "Pedidos"]}
            defaultValue={"Productos"}
            setElemento={setElemento}
            className="w-full h-full p-2 border-b text-xl bg-blue-500 text-white"
          />
        </div>
        <div className="w-full h-10 grow bg-white">{renderTabPages(currentElemento)}</div>
      </div>

      <Tab.Group as="div" className="hidden sm:flex sm:flex-col w-full h-full">
        <Tab.List className="flex grow-0 sm:gap-1 h-10 sm:pr-10">
          <Tab
            key={"Productos"}
            className={(props: { selected: boolean }) =>
              classNames(
                "hidden sm:block w-2/5 sm:w-1/4 h-full text-sm sm:rounded-t-3xl border-t border-x border-gray-300 px-1",
                "focus:outline-none ring-white ring-opacity-60",
                props.selected ? "bg-white shadow-lg" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
              )
            }
          >
            <span className="text-sm sm:text-xl">Productos</span>
          </Tab>
          <Tab
            key={"Mermas"}
            className={(props: { selected: boolean }) =>
              classNames(
                "hidden sm:block w-2/5 sm:w-1/4 h-full text-sm sm:rounded-t-3xl border-t border-x border-gray-300 px-1",
                "focus:outline-none  ring-white ring-opacity-60",
                props.selected ? "bg-white shadow-md" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
              )
            }
          >
            <span className="text-sm sm:text-xl">Mermas</span>
          </Tab>
          <Tab
            key={"Inventario"}
            className={(props: { selected: boolean }) =>
              classNames(
                "hidden sm:block w-2/5 sm:w-1/4 h-full text-sm sm:rounded-t-3xl border-t border-x border-gray-300 px-1",
                "focus:outline-none  ring-white ring-opacity-60",
                props.selected ? "bg-white shadow-md" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
              )
            }
          >
            <span className="text-sm sm:text-xl">Inventario</span>
          </Tab>
          <Tab
            key={"Pedidos"}
            className={(props: { selected: boolean }) =>
              classNames(
                "hidden sm:block w-2/5 sm:w-1/4 h-full text-sm sm:rounded-t-3xl border-t border-x border-gray-300 px-1",
                "focus:outline-none  ring-white ring-opacity-60",
                props.selected ? "bg-white shadow-md" : "bg-gray-200 hover:bg-blue-400 hover:text-white"
              )
            }
          >
            <span className="text-sm sm:text-xl">Pedidos</span>
          </Tab>
        </Tab.List>
        <Tab.Panels className="flex flex-col grow h-full w-full">
          <Tab.Panel
            key={"Productos"}
            className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
          >
            <ProductPage />
          </Tab.Panel>
          <Tab.Panel
            key={"Mermas"}
            className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
          >
            <MermaPage />
          </Tab.Panel>
          <Tab.Panel
            key={"Inventario"}
            className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
          >
            <EnDesarrolloPage />
          </Tab.Panel>
          <Tab.Panel
            key={"Pedidos"}
            className={classNames("h-full w-full", "focus:outline-none ring-white ring-opacity-60")}
          >
            <EnDesarrolloPage />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

Productos.PageLayout = DashboardLayout;

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

export default Productos;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
