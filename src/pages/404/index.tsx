import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function NotFound() {
    const router = useRouter()
    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center h-full p-16">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Página no encontrada :/</p>
                    <p className="mt-4 mb-8">No te preocupes, te ayudamos a volver a páginas que sí se pueden encontrar</p>
                    <button onClick={() => router.back()}
                        className="px-8 py-3 font-semibold rounded bg-violet-600 text-white">Volver, por favor</button>
                </div>
            </div>
        </motion.section>
    );
}
