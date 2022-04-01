import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import NextNProgress from "nextjs-progressbar";
import { ProductCarritoContextProvider } from "../context/productosEnCarritoContext";
import { EmpleadoContextProvider } from "../context/empleadoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    const [IndexSidebar, setSidebarIndex] = useState<number>(0);

    {/* router.route es lo que hace que funcione el exit del AnimatePresence */ }
    const router = useRouter();

    return (
        <EmpleadoContextProvider>
            <ProductCarritoContextProvider>
                {
                    <main className="dark:bg-gray-800 h-full w-full overflow-hidden bg_food" >
                        <NextNProgress />
                        <div className="flex items-start w-full h-full justify-start">
                            <Sidebar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} IndexSeleccionado={IndexSidebar} setIndex={setSidebarIndex} />
                            <AnimatePresence exitBeforeEnter>
                                <motion.div key={router.route} className="w-full h-full" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
                                    {children}
                                </motion.div>
                            </AnimatePresence>
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
                        </div>
                    </main >
                }
            </ProductCarritoContextProvider>
        </EmpleadoContextProvider>

    );
});

export default DashboardLayout;