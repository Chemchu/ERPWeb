import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { Component, useState } from "react";
import SideBar from "../components/sidebar";
import NextNProgress from "nextjs-progressbar";
import { VentasContextProvider } from "../context/ventasContext";
import { ProductContextProvider } from "../context/productContext";
import { ClienteContextProvider } from "../context/clientContext";
import { ProductCarritoContextProvider } from "../context/productosEnCarritoContext";

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

    {/* router.route es lo que hace que funcione el exit del AnimatePresence */ }
    const route = useRouter().route;

    return (
        <VentasContextProvider>
            <ProductContextProvider>
                <ProductCarritoContextProvider>
                    <ClienteContextProvider>
                        {
                            <main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative" >
                                <NextNProgress />
                                <div className="flex items-start justify-start">
                                    <div className="m-2">
                                        <SideBar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} />
                                    </div>
                                    <AnimatePresence exitBeforeEnter>
                                        <motion.div key={route} className="w-full h-full" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
                                            {children}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </main >
                        }
                    </ClienteContextProvider>
                </ProductCarritoContextProvider>
            </ProductContextProvider>
        </VentasContextProvider>
    );
});

export default DashboardLayout;