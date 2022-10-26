import { motion } from "framer-motion";
import Link from "next/dist/client/link";
import React from "react";
import { Roles } from "../../tipos/Enums/Roles";
import { SidebarOption } from "../../tipos/Enums/SidebarOption";
import PopOver from "../elementos/popover";
import RequireHigherAuth from "../RequireHigherAuth";

const Navbar = React.memo(
  (props: {
    setCollapsed: Function;
    IndexSeleccionado: SidebarOption;
    setIndex: React.Dispatch<React.SetStateAction<SidebarOption>>;
  }) => {
    return <BottomNavbar IndexSeleccionado={props.IndexSeleccionado} setIndex={props.setIndex} />;
  }
);

const BottomNavbar = (props: { IndexSeleccionado: SidebarOption; setIndex: Function }) => {
  return (
    <motion.div
      initial={{ y: "10vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "10vh", opacity: 0 }}
      className="w-full bg-blue-600 flex justify-between border p-2 z-50 h-12 sm:hidden"
    >
      <div className="flex grow h-full justify-evenly items-center">
        <Link href="/dashboard">
          <div
            className={`${
              props.IndexSeleccionado === SidebarOption.Inicio && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
            onClick={(e) => {
              props.setIndex(SidebarOption.Inicio);
              e.stopPropagation();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>

        <PopOver
          CurrentIndex={props.IndexSeleccionado}
          ButtonIndex={SidebarOption.TPV}
          className="flex flex-col absolute bottom-11 -left-14 cursor-pointer border rounded-lg text-center bg-blue-600 text-white p-2 w-36"
          rutas={[
            {
              nombre: "TPV",
              ruta: "/dashboard/pos",
              callback: (e: any) => {
                props.setIndex(SidebarOption.TPV);
                e.stopPropagation();
              },
            },
            {
              nombre: "Productos",
              ruta: "/dashboard/productos",
              callback: (e: any) => {
                props.setIndex(SidebarOption.TPV);
                e.stopPropagation();
              },
            },
          ]}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
              clipRule="evenodd"
            />
          </svg>
        </PopOver>

        <RequireHigherAuth>
          <Link href="/dashboard/estadisticas">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Estadisticas);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Estadisticas && "bg-blue-700 text-blue-500 p-2"
              } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zM13.25 5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zm-6.5 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016.75 9zm4-1.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        </RequireHigherAuth>

        <PopOver
          ButtonIndex={SidebarOption.Ventas}
          CurrentIndex={props.IndexSeleccionado}
          className="flex flex-col absolute bottom-11 -left-14 cursor-pointer text-center border rounded-lg bg-blue-600 text-white p-2 w-36"
          rutas={[
            {
              nombre: "Ventas",
              ruta: "/dashboard/ventas",
              callback: (e: any) => {
                props.setIndex(SidebarOption.Ventas);
                e.stopPropagation();
              },
            },
            {
              nombre: "Cierres",
              ruta: "/dashboard/cierres",
              callback: (e: any) => {
                props.setIndex(SidebarOption.Ventas);
                e.stopPropagation();
              },
            },
          ]}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z"
              clipRule="evenodd"
            />
            <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z" />
          </svg>
        </PopOver>

        <PopOver
          ButtonIndex={SidebarOption.Clientes}
          CurrentIndex={props.IndexSeleccionado}
          className="flex flex-col absolute bottom-11 -left-14 cursor-pointer text-center border rounded-lg bg-blue-600 text-white p-2 w-36"
          rutas={[
            {
              nombre: "Clientes",
              ruta: "/dashboard/clientes",
              callback: (e: any) => {
                props.setIndex(SidebarOption.Clientes);
                e.stopPropagation();
              },
            },
            {
              nombre: "Empleados",
              ruta: "/dashboard/empleados",
              callback: (e: any) => {
                props.setIndex(SidebarOption.Clientes);
                e.stopPropagation();
              },
              roles: [Roles.Administrador, Roles.Gerente],
            },
            {
              nombre: "Proveedores",
              ruta: "/dashboard/proveedores",
              callback: (e: any) => {
                props.setIndex(SidebarOption.Clientes);
                e.stopPropagation();
              },
              roles: [Roles.Administrador, Roles.Gerente],
            },
          ]}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
          </svg>
        </PopOver>

        <PopOver
          ButtonIndex={SidebarOption.Ajustes}
          CurrentIndex={props.IndexSeleccionado}
          className="flex flex-col absolute bottom-11 -left-16 cursor-pointer text-center border border-blue-500 rounded-lg bg-white text-blue-500 p-2 w-36"
          rutas={[
            {
              nombre: "Ajustes",
              ruta: "/dashboard/configuracion",
              callback: (e: any) => {
                props.setIndex(SidebarOption.Ajustes);
                e.stopPropagation();
              },
            },
            {
              nombre: "Cerrar sesión",
              ruta: "/",
              callback: async (e: any) => {
                props.setIndex(SidebarOption.Salir);
                e.stopPropagation();
                await fetch("/api/logout");
              },
            },
          ]}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </PopOver>
      </div>
    </motion.div>
  );
};

Navbar.displayName = "Navbar";
export default Navbar;
