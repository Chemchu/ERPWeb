import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SideBar = React.memo((props:{isCollapsed: boolean, setCollapsed: Function}) => {        
    return(
        props.isCollapsed ? <CollapsedSidebar setCollapsed={props.setCollapsed} /> : <OpenedSidebar setCollapsed={props.setCollapsed}/>
    );
})

const OpenedSidebar = (props: {setCollapsed: Function}) => {
    return(
        <motion.div initial={{x: "-10vh", opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: "-10vh", opacity: 0}} className="w-auto h-screen bg-white ml-2 border-2 rounded-xl" onClick={() => {props.setCollapsed(true);}}>
            <div className="flex items-center justify-start mx-6 mt-10">
                <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
                    ERPWeb
                </span>
            </div>
            <div className="flex flex-col gap-10 mt-10 p-6">

                <Link to="/dashboard" className="hover:text-gray-800 hover:bg-gray-100 flex items-center
                    transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                    text-gray-600 dark:text-gray-400 rounded-lg " onClick={(e) => {e.stopPropagation();} }>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="mx-4 font-normal">
                        Inicio
                    </span>
                    <span className="flex-grow text-right">
                    </span>
                </Link>

                <Link to="/dashboard/pos" onClick={(e) => e.stopPropagation() } className="hover:text-gray-800 hover:bg-gray-100 flex 
                    items-center transition-colors dark:hover:text-white 
                    dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                        <span className="mx-4 font-normal">
                            TPV
                        </span>
                </Link>

                <Link to="/dashboard/productos" onClick={(e) => e.stopPropagation() } className="hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-100 rounded-lg dark:bg-gray-600" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="mx-4">
                        Productos
                    </span>
                    <span className="flex-grow text-right">
                    </span>
                </Link>

                <Link to="/dashboard/stats" onClick={(e) => e.stopPropagation() } className="hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-100 rounded-lg dark:bg-gray-600" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <span className="mx-4">
                        Estadísticas
                    </span>
                    <span className="flex-grow text-right">
                    </span>
                </Link>
                
                <Link to="/dashboard/sales" onClick={(e) => e.stopPropagation() } className="hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="mx-4">
                        Ventas
                    </span>
                    <span className="flex-grow text-right">
                    </span>
                </Link>
            </div>
            <div className="absolute bottom-0 my-10">
                <Link to="/dashboard/help" onClick={(e) => e.stopPropagation() } className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8" href="#">
                    <svg width="20" fill="currentColor" height="20" className="h-5 w-5" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
                        </path>
                    </svg>
                    <span className="mx-4">
                        Ayuda
                    </span>
                </Link>
            </div>
        </motion.div>);
}

const CollapsedSidebar = (props: {setCollapsed: Function}) => {
    return(
        <motion.div initial={{x: "-10vh", opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: "-10vh", opacity: 0}} className="ml-2 w-auto h-screen bg-white border-2 rounded-xl" onClick={() => {props.setCollapsed(false);} }>
            <div className="flex items-center justify-start mx-6 mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            <div className="flex flex-col gap-10 mt-10 p-6" >

                <Link to="/dashboard" className="hover:text-gray-800 hover:bg-gray-100 flex items-center
                    transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200
                    text-gray-600 dark:text-gray-400 rounded-lg " onClick={(e) => e.stopPropagation() }>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>

                <Link to="/dashboard/pos" className="hover:text-gray-800 hover:bg-gray-100 flex 
                    items-center transition-colors dark:hover:text-white 
                    dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg" onClick={(e) => e.stopPropagation() }>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </Link>

                <Link to="/dashboard/productos" onClick={(e) => e.stopPropagation() } className="hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-100 rounded-lg dark:bg-gray-600" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </Link>

                <Link to="/dashboard/stats" onClick={(e) => e.stopPropagation() } className="hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-100 rounded-lg dark:bg-gray-600" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                </Link>
                
                <Link to="/dashboard/sales" onClick={(e) => e.stopPropagation() } className="hover:text-gray-800 hover:bg-gray-100 flex items-center transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </Link>
            </div>
            <div className="absolute bottom-0 my-10">
                <Link to="/dashboard/help" onClick={(e) => e.stopPropagation() } className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8" href="#">
                    <svg width="20" fill="currentColor" height="20" className="h-5 w-5" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
                        </path>
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}

export default SideBar;