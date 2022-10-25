import { motion } from "framer-motion";
import Link from "next/dist/client/link";
import React from "react";
import { SidebarOption } from "../../tipos/Enums/SidebarOption";
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

        <Link href="/dashboard/pos">
          <div
            className={`${
              props.IndexSeleccionado === SidebarOption.TPV && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
            onClick={(e) => {
              props.setIndex(SidebarOption.TPV);
              e.stopPropagation();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
        </Link>

        <Link href="/dashboard/productos">
          <div
            onClick={(e) => {
              props.setIndex(SidebarOption.Productos);
              e.stopPropagation();
            }}
            className={`${
              props.IndexSeleccionado === SidebarOption.Productos && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>

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

        <Link href="/dashboard/ventas">
          <div
            onClick={(e) => {
              props.setIndex(SidebarOption.Ventas);
              e.stopPropagation();
            }}
            className={`${
              props.IndexSeleccionado === SidebarOption.Ventas && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z"
                clipRule="evenodd"
              />
              <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z" />
            </svg>
          </div>
        </Link>

        <Link href="/dashboard/cierres">
          <div
            onClick={(e) => {
              props.setIndex(SidebarOption.Cierres);
              e.stopPropagation();
            }}
            className={`${
              props.IndexSeleccionado === SidebarOption.Cierres && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
            </svg>
          </div>
        </Link>

        <Link href="/dashboard/clientes">
          <div
            onClick={(e) => {
              props.setIndex(SidebarOption.Clientes);
              e.stopPropagation();
            }}
            className={`${
              props.IndexSeleccionado === SidebarOption.Clientes && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
            </svg>
          </div>
        </Link>

        <RequireHigherAuth>
          <Link href="/dashboard/empleados">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Empleados);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Empleados && "bg-blue-700 text-blue-500 p-2"
              } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
              </svg>
            </div>
          </Link>
        </RequireHigherAuth>

        <RequireHigherAuth>
          <Link href="/dashboard/proveedores">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Proveedores);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Proveedores && "bg-blue-700 text-blue-500 p-2"
              } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z" />
                <path d="M6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.25 5a.75.75 0 00-.75.75v8.514a3.001 3.001 0 014.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 00-1.784-8.549A1.486 1.486 0 0014.823 5H13.25zM14.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
          </Link>
        </RequireHigherAuth>
      </div>

      <div className="flex w-1/4 gap-2 justify-end items-center">
        <Link href="/dashboard/configuracion">
          <div
            onClick={(e) => {
              props.setIndex(SidebarOption.Ajustes);
              e.stopPropagation();
            }}
            className={`${
              props.IndexSeleccionado === SidebarOption.Ajustes && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>

        <Link href="/">
          <div
            onClick={async (e) => {
              props.setIndex(SidebarOption.Salir);
              e.stopPropagation();
              await fetch("/api/logout");
            }}
            className={`${
              props.IndexSeleccionado === SidebarOption.Salir && "bg-blue-700 text-blue-500 p-2"
            } hover:bg-blue-800 hover:p-2 cursor-pointer duration-75 rounded-lg`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

Navbar.displayName = "Navbar";
export default Navbar;
