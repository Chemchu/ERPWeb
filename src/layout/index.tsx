import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import NextProgress from "next-progress";
import { ProductCarritoContextProvider } from "../context/productosEnCarritoContext";
import { EmpleadoContextProvider } from "../context/empleadoContext";
import { ToastContainer } from "react-toastify";
import { SidebarOption } from "../tipos/Enums/SidebarOption";
import { ComprasAparcadasContextProvider } from "../context/comprasAparcadas";
import { DatosTiendaContextProvider } from "../context/datosTienda";
import Cookies from 'js-cookie'
import { notifyError } from "../utils/toastify";

const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeInOut",
        },
    },
    exit: {
        y: '-100vh',
        opacity: 0,
        transition: {
            ease: [0.87, 0, 0.13, 1],
            duration: 1
        }
    },
}

const DashboardLayout = React.memo(({ children }: { children: React.ReactNode }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [IndexSidebar, setSidebarIndex] = useState<SidebarOption>(SidebarOption.Inicio);

    useEffect(() => {
        const tiendaInfo = Cookies.get("storeData")
        if (!tiendaInfo) {
            notifyError("No hay datos acerca de la tienda")
        }

    }, [IndexSidebar])

    {/* router.route es lo que hace que funcione el exit del AnimatePresence */ }
    const router = useRouter();
    return (
        <DatosTiendaContextProvider >
            <EmpleadoContextProvider>
                <ProductCarritoContextProvider>
                    <ComprasAparcadasContextProvider>
                        {
                            <div className="dark:bg-gray-800 h-screen w-screen overflow-hidden bg_food">
                                <NextProgress />
                                <div className="flex items-start w-full h-full justify-start">
                                    <Sidebar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} IndexSeleccionado={IndexSidebar} setIndex={setSidebarIndex} />
                                    <motion.div key={router.route} className="w-full h-full" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
                                        {children}
                                    </motion.div>
                                </div>
                                <ToastContainer
                                    position="bottom-right"
                                    autoClose={3000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    draggable
                                    pauseOnHover={false}
                                />
                            </div >
                        }
                    </ComprasAparcadasContextProvider>
                </ProductCarritoContextProvider>
            </EmpleadoContextProvider>
        </DatosTiendaContextProvider>
    );
});

export default DashboardLayout;