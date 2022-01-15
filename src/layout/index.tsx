import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import NextNProgress from "nextjs-progressbar";
import { VentasContextProvider } from "../context/ventasContext";
import { ProductContextProvider } from "../context/productContext";
import { ClienteContextProvider } from "../context/clientContext";
import { SpinnerCircular, SpinnerDotted } from "spinners-react";
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
    const [IndexSidebar, setSidebarIndex] = useState<number>(0);

    {/* router.route es lo que hace que funcione el exit del AnimatePresence */ }
    const router = useRouter();

    // if (status === "loading") {
    //     return (
    //         <div className="flex flex-col w-screen h-screen justify-center items-center gap-6">
    //             {/* <SpinnerCircular size={90} thickness={180} speed={100} color="rgba(57, 150, 172, 1)" secondaryColor="rgba(0, 0, 0, 0)" /> */}
    //             <SpinnerDotted size={90} thickness={180} speed={100} color="rgba(57, 141, 172, 1)" />
    //             {/* <h1 className="text-xl">
    //                 Cargando..
    //             </h1> */}
    //         </div>
    //     );
    // }

    return (
        <VentasContextProvider>
            <ProductContextProvider>
                <ProductCarritoContextProvider>
                    <ClienteContextProvider>
                        {
                            <main className="bg-gray-100 dark:bg-gray-800 h-full w-full overflow-hidden" >
                                <NextNProgress />
                                <div className="flex items-start justify-start">
                                    <SideBar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} IndexSeleccionado={IndexSidebar} />
                                    <AnimatePresence exitBeforeEnter>
                                        <motion.div key={router.route} className="w-screen h-screen" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
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