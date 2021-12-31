import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import NextNProgress from "nextjs-progressbar";
import { VentasContextProvider } from "../context/ventasContext";
import { ProductContextProvider } from "../context/productContext";
import { ClienteContextProvider } from "../context/clientContext";
import { ProductCarritoContextProvider } from "../context/productosEnCarritoContext";
import { useSession } from "next-auth/react";
import { SpinnerCircular } from "spinners-react";

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
    const { status, data: session } = useSession();

    {/* router.route es lo que hace que funcione el exit del AnimatePresence */ }
    const router = useRouter();
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login');
        }
    }, [status]);

    if (status === "loading") {
        return (
            <div className="flex flex-col w-screen h-screen justify-center items-center gap-6">
                <SpinnerCircular size={90} thickness={180} speed={100} color="rgba(57, 150, 172, 1)" secondaryColor="rgba(0, 0, 0, 0)" />
                <h1 className="text-xl">
                    Cargando..
                </h1>
            </div>
        );
    }

    return (
        <VentasContextProvider>
            <ProductContextProvider>
                <ProductCarritoContextProvider>
                    <ClienteContextProvider>
                        {
                            <main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative" >
                                <NextNProgress />
                                <div className="flex items-start justify-start">
                                    <div className="px-1">
                                        <SideBar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} />
                                    </div>
                                    <AnimatePresence exitBeforeEnter>
                                        <motion.div key={router.route} className="w-full h-full" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
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
        // <>
        //     {
        //         status === "authenticated" ?
        //             <VentasContextProvider>
        //                 <ProductContextProvider>
        //                     <ProductCarritoContextProvider>
        //                         <ClienteContextProvider>
        //                             {
        //                                 <main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative" >
        //                                     <NextNProgress />
        //                                     <div className="flex items-start justify-start">
        //                                         <div className="px-1">
        //                                             <SideBar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        //                                         </div>
        //                                         <AnimatePresence exitBeforeEnter>
        //                                             <motion.div key={router.route} className="w-full h-full" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
        //                                                 {children}
        //                                             </motion.div>
        //                                         </AnimatePresence>
        //                                     </div>
        //                                 </main >
        //                             }
        //                         </ClienteContextProvider>
        //                     </ProductCarritoContextProvider>
        //                 </ProductContextProvider>
        //             </VentasContextProvider>
        //             :
        //             <div className="flex flex-col w-screen h-screen justify-center items-center gap-6">
        //                 <SpinnerCircular size={90} thickness={180} speed={100} color="rgba(57, 150, 172, 1)" secondaryColor="rgba(0, 0, 0, 0)" />
        //                 <h1 className="text-xl">
        //                     Cargando..
        //                 </h1>
        //             </div>
        //     }
        // </>
    );
});

export default DashboardLayout;