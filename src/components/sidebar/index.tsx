import { motion } from "framer-motion";
import Link from "next/dist/client/link";
import React from "react";
import { SidebarOption } from "../../tipos/Enums/SidebarOption";
import RequireHigherAuthorization from "./RequireHigherAuth";

const Sidebar = React.memo(
  (props: {
    isCollapsed: boolean;
    setCollapsed: Function;
    IndexSeleccionado: SidebarOption;
    setIndex: React.Dispatch<React.SetStateAction<SidebarOption>>;
  }) => {
    return props.isCollapsed ? (
      <CollapsedSidebar
        setCollapsed={props.setCollapsed}
        IndexSeleccionado={props.IndexSeleccionado}
        setIndex={props.setIndex}
      />
    ) : (
      <OpenedSidebar
        setCollapsed={props.setCollapsed}
        IndexSeleccionado={props.IndexSeleccionado}
        setIndex={props.setIndex}
      />
    );
  }
);

const OpenedSidebar = (props: { setCollapsed: Function; IndexSeleccionado: SidebarOption; setIndex: Function }) => {
  return (
    <motion.div
      initial={{ x: "-10vh", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-10vh", opacity: 0 }}
      className="h-screen p-2"
    >
      <div className="flex flex-col w-full h-full justify-between bg-white border shadow-lg rounded-3xl">
        <div
          className="flex justify-center items-end gap-2 w-full h-1/6 cursor-pointer"
          onClick={() => {
            props.setCollapsed(true);
          }}
        >
          <span className="text-gray-600 dark:text-gray-300 hover:text-blue-500 text-2xl font-bold">ERPWeb</span>
        </div>

        <div className="flex flex-col w-full h-full xl:gap-6 gap-4  justify-center items-stretch px-6">
          <Link href="/dashboard">
            <div
              className={`${
                props.IndexSeleccionado === SidebarOption.Inicio && "bg-gray-100 text-blue-500"
              } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
              onClick={(e) => {
                props.setIndex(SidebarOption.Inicio);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Inicio</span>
            </div>
          </Link>

          <Link href="/dashboard/pos">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.TPV);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.TPV && "bg-gray-100 text-blue-500"
              } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>TPV</span>
            </div>
          </Link>

          <Link href="/dashboard/productos">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Productos);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Productos && "bg-gray-100 text-blue-500"
              } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span>Productos</span>
            </div>
          </Link>

          <RequireHigherAuthorization>
            <Link href="/dashboard/estadisticas">
              <div
                onClick={(e) => {
                  props.setIndex(SidebarOption.Estadisticas);
                  e.stopPropagation();
                }}
                className={`${
                  props.IndexSeleccionado === SidebarOption.Estadisticas && "bg-gray-100 text-blue-500"
                } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
                <span>Estadísticas</span>
              </div>
            </Link>
          </RequireHigherAuthorization>

          <Link href="/dashboard/ventas">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Ventas);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Ventas && "bg-gray-100 text-blue-500"
              } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span>Ventas</span>
            </div>
          </Link>

          <Link href="/dashboard/cierres">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Cierres);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Cierres && "bg-gray-100 text-blue-500"
              } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>Cierres</span>
            </div>
          </Link>

          <Link href="/dashboard/clientes">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Clientes);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Clientes && "bg-gray-100 text-blue-500"
              } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>Clientes</span>
            </div>
          </Link>

          <RequireHigherAuthorization>
            <Link href="/dashboard/empleados">
              <div
                onClick={(e) => {
                  props.setIndex(SidebarOption.Empleados);
                  e.stopPropagation();
                }}
                className={`${
                  props.IndexSeleccionado === SidebarOption.Empleados && "bg-gray-100 text-blue-500"
                } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Empleados</span>
              </div>
            </Link>
          </RequireHigherAuthorization>

          <RequireHigherAuthorization>
            <Link href="/dashboard/proveedores">
              <div
                onClick={(e) => {
                  props.setIndex(SidebarOption.Proveedores);
                  e.stopPropagation();
                }}
                className={`${
                  props.IndexSeleccionado === SidebarOption.Proveedores && "bg-gray-100 text-blue-500"
                } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <span>Proveedores</span>
              </div>
            </Link>
          </RequireHigherAuthorization>
        </div>

        <div className="flex flex-col w-full h-1/6 xl:gap-6 gap-4  justify-center px-5 pb-10">
          <Link href="/dashboard/configuracion">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Ajustes);
                e.stopPropagation();
              }}
              className={`${props.IndexSeleccionado === SidebarOption.Ajustes && "bg-gray-100 text-blue-500"} 
                        hover:text-blue-500 hover:bg-gray-100 flex gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Ajustes</span>
            </div>
          </Link>

          <Link href="/">
            <div
              onClick={async (e) => {
                props.setIndex(SidebarOption.Ajustes);
                e.stopPropagation();
                await fetch("/api/logout");
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Salir && "bg-gray-100 text-blue-500"
              } hover:text-blue-500 hover:bg-gray-100 gap-4 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Salir</span>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const CollapsedSidebar = (props: { setCollapsed: Function; IndexSeleccionado: SidebarOption; setIndex: Function }) => {
  return (
    <motion.div
      initial={{ x: "-10vh", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-10vh", opacity: 0 }}
      className="w-auto h-screen p-2"
    >
      <div className="flex flex-col h-full justify-between bg-white border shadow-lg rounded-3xl">
        <div
          className="flex justify-center items-end w-full h-1/6 cursor-pointer hover:text-blue-500"
          onClick={() => {
            props.setCollapsed(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:stroke-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        <div className="flex flex-col w-full h-full xl:gap-6 gap-4 justify-center items-stretch px-5 ">
          <Link href="/dashboard">
            <div
              className={`${
                props.IndexSeleccionado === SidebarOption.Inicio && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
              onClick={(e) => {
                props.setIndex(SidebarOption.Inicio);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          </Link>

          <Link href="/dashboard/pos">
            <div
              className={`${
                props.IndexSeleccionado === SidebarOption.TPV && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
              onClick={(e) => {
                props.setIndex(SidebarOption.TPV);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
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
                props.IndexSeleccionado === SidebarOption.Productos && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </Link>

          <RequireHigherAuthorization>
            <Link href="/dashboard/estadisticas">
              <div
                onClick={(e) => {
                  props.setIndex(SidebarOption.Estadisticas);
                  e.stopPropagation();
                }}
                className={`${
                  props.IndexSeleccionado === SidebarOption.Estadisticas && "bg-gray-100 text-blue-500"
                } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:stroke-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
            </Link>
          </RequireHigherAuthorization>

          <Link href="/dashboard/ventas">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Ventas);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Ventas && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
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
                props.IndexSeleccionado === SidebarOption.Cierres && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
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
                props.IndexSeleccionado === SidebarOption.Clientes && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </Link>

          <RequireHigherAuthorization>
            <Link href="/dashboard/empleados">
              <div
                onClick={(e) => {
                  props.setIndex(SidebarOption.Empleados);
                  e.stopPropagation();
                }}
                className={`${
                  props.IndexSeleccionado === SidebarOption.Empleados && "bg-gray-100 text-blue-500"
                } hover:text-gray-800 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:stroke-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </Link>
          </RequireHigherAuthorization>

          <RequireHigherAuthorization>
            <Link href="/dashboard/proveedores">
              <div
                onClick={(e) => {
                  props.setIndex(SidebarOption.Proveedores);
                  e.stopPropagation();
                }}
                className={`${
                  props.IndexSeleccionado === SidebarOption.Proveedores && "bg-gray-100 text-blue-500"
                } hover:text-blue-500 hover:bg-gray-100 flex items-center gap-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
            </Link>
          </RequireHigherAuthorization>
        </div>

        <div className="flex flex-col w-full h-1/6 xl:gap-6 gap-4 justify-center px-5 pb-10">
          <Link href="/dashboard/configuracion">
            <div
              onClick={(e) => {
                props.setIndex(SidebarOption.Ajustes);
                e.stopPropagation();
              }}
              className={`${
                props.IndexSeleccionado === SidebarOption.Ajustes && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
                props.IndexSeleccionado === SidebarOption.Salir && "bg-gray-100 text-blue-500"
              } hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:stroke-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

Sidebar.displayName = "Sidebar";
export default Sidebar;
