import { motion } from "framer-motion";
import { Cliente } from "../../../tipos/Cliente";

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
    exitFadeOut: {
        opacity: 0,
        transition: {
            ease: "easeInOut",
            duration: 1
        }
    },
}

const ClientesPage = (props: { Clientes: Cliente[] }) => {
    return (
        <motion.div className="flex flex-col h-screen w-full antialiased px-8 py-8" >
            <h2 className="text-2xl leading-tight">
                Clientes
            </h2>
            <div className="flex mb-1 sm:mb-0 justify-between w-full pt-4">
                <div className="flex gap-4 self-center">
                    <button className="flex flex-shrink-0 gap-2 px-4 py-2 text-base font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-blue-200">
                        Añadir
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                </div>
                <div className="text-end">
                    <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                        <input type="text" id="form-subscribe-Filter" className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Clientes a buscar..." />
                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200">
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full w-full bg-white mt-4 pb-20 justify-center items-center rounded-xl shadow-lg">

            </div>
        </motion.div>
    );
}

export default ClientesPage;