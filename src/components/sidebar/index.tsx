import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';

const Sidebar = React.memo((props: { isCollapsed: boolean, setCollapsed: Function, IndexSeleccionado: number, setIndex: Function }) => {
    return (
        props.isCollapsed ?
            <CollapsedSidebar setCollapsed={props.setCollapsed} IndexSeleccionado={props.IndexSeleccionado} setIndex={props.setIndex} />
            :
            <OpenedSidebar setCollapsed={props.setCollapsed} IndexSeleccionado={props.IndexSeleccionado} setIndex={props.setIndex} />
    );
})

const OpenedSidebar = (props: { setCollapsed: Function, IndexSeleccionado: number, setIndex: Function }) => {
    return (
        <motion.div initial={{ x: "-10vh", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-10vh", opacity: 0 }}
            className='w-1/4 h-screen p-2'>
            <div className="flex flex-col w-full h-full justify-between bg-white border shadow-lg rounded-3xl" onClick={() => { props.setCollapsed(true); }}>

                <div className="flex justify-center items-end w-full h-1/6 cursor-default">
                    <span className="text-gray-600 dark:text-gray-300 text-2xl font-bold">
                        ERPWeb
                    </span>
                </div>

                <div className="flex flex-col w-full h-full gap-10 justify-center px-5">
                    <Link href="/dashboard">
                        <div className={`${props.IndexSeleccionado === 0 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`} onClick={(e) => { props.setIndex(0); e.stopPropagation(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="mx-4 font-normal">
                                Inicio
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard/pos" >
                        <div onClick={(e) => { props.setIndex(1); e.stopPropagation(); }} className={`${props.IndexSeleccionado === 1 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="mx-4 font-normal">
                                TPV
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard/productos">
                        <div onClick={(e) => { props.setIndex(2); e.stopPropagation(); }} className={`${props.IndexSeleccionado === 2 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="mx-4">
                                Productos
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard/estadisticas">
                        <div onClick={(e) => { props.setIndex(3); e.stopPropagation(); }} className={`${props.IndexSeleccionado === 3 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                            <span className="mx-4">
                                Estadísticas
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard/ventas">
                        <div onClick={(e) => { props.setIndex(4); e.stopPropagation(); }} className={`${props.IndexSeleccionado === 4 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <span className="mx-4">
                                Ventas
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard/cierres">
                        <div onClick={(e) => { props.setIndex(5); e.stopPropagation(); }} className={`${props.IndexSeleccionado === 5 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="mx-4">
                                Cierres
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard/clientes">
                        <div onClick={(e) => { props.setIndex(6); e.stopPropagation(); }} className={`${props.IndexSeleccionado === 6 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="mx-4">
                                Clientes
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </div>
                    </Link>


                </div>

                <div className='flex flex-col w-full h-1/6 gap-10 justify-center px-5 pb-10'>
                    <Link href="/dashboard/configuracion">
                        <div onClick={(e) => { props.setIndex(7); e.stopPropagation(); }} className={`${props.IndexSeleccionado === 7 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="mx-4">
                                Configuración
                            </span>
                        </div>
                    </Link>

                    <Link href="/">
                        <div onClick={(e) => { props.setIndex(0); e.stopPropagation(); Cookies.remove("authorization"); }} className={`${props.IndexSeleccionado === 8 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                        text-gray-600 dark:text-gray-400 rounded-lg cursor-pointer`} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="mx-4">
                                Cerrar sesión
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div >
    );
}

const CollapsedSidebar = (props: { setCollapsed: Function, IndexSeleccionado: number, setIndex: Function }) => {
    return (
        <motion.div initial={{ x: "-10vh", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-10vh", opacity: 0 }}
            className='w-auto h-screen p-2'>
            <div className="flex flex-col w-full h-full justify-between bg-white border shadow-lg rounded-3xl" onClick={() => { props.setCollapsed(false); }}>

                <div className="flex justify-center items-end w-full h-1/6 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                <div className="flex flex-col w-full h-full gap-10 justify-center px-5">
                    <Link href="/dashboard">
                        <div className={`${props.IndexSeleccionado === 0 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
                            onClick={(e) => { props.setIndex(0); e.stopPropagation(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                    </Link>

                    <Link href="/dashboard/pos">
                        <div className={`${props.IndexSeleccionado === 1 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}
                            onClick={(e) => { props.setIndex(1); e.stopPropagation() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </Link>

                    <Link href="/dashboard/productos">
                        <div onClick={(e) => { props.setIndex(2); e.stopPropagation() }} className={`${props.IndexSeleccionado === 2 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </Link>

                    <Link href="/dashboard/estadisticas">
                        <div onClick={(e) => { props.setIndex(3); e.stopPropagation() }} className={`${props.IndexSeleccionado === 3 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                        </div>

                    </Link>

                    <Link href="/dashboard/ventas">
                        <div onClick={(e) => { props.setIndex(4); e.stopPropagation() }} className={`${props.IndexSeleccionado === 4 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    </Link>

                    <Link href="/dashboard/cierres">
                        <div onClick={(e) => { props.setIndex(5); e.stopPropagation() }} className={`${props.IndexSeleccionado === 5 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </Link>

                    <Link href="/dashboard/clientes">
                        <div onClick={(e) => { props.setIndex(6); e.stopPropagation() }} className={`${props.IndexSeleccionado === 6 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </Link>
                </div>

                <div className='flex flex-col w-full h-1/6 gap-10 justify-center px-5 pb-10'>
                    <Link href="/dashboard/configuracion">
                        <div onClick={(e) => { props.setIndex(7); e.stopPropagation() }} className={`${props.IndexSeleccionado === 7 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </Link>

                    <Link href="/">
                        <div onClick={(e) => { props.setIndex(0); e.stopPropagation(); Cookies.remove("authorization"); }} className={`${props.IndexSeleccionado === 8 && "bg-gray-100"} hover:text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg `} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

Sidebar.displayName = 'Sidebar';
export default Sidebar;