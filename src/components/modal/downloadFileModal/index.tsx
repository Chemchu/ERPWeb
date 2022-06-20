import { motion } from "framer-motion";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";

const DownloadFileModal = (props: { setModal: Function, tipoDocumento: TipoDocumento }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full z-20">
            <Backdrop onClick={(e) => { e.stopPropagation(); props.setModal(false) }} >
                <motion.div className="h-2/6 w-3/6 m-auto py-2 flex flex-col items-center justify-center bg-white rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Meter skeletons */}
                    <span className="pt-2 font-semibold">
                        Seleccione una opción
                    </span>
                    <div className="flex gap-4 justify-center items-center w-full h-full p-4 text-white">
                        <button className="bg-amber-500 hover:bg-amber-600 border rounded-lg h-1/2 w-1/2 font-semibold">
                            {props.tipoDocumento}
                        </button>
                        <button className="bg-cyan-500 hover:bg-cyan-600 border rounded-lg h-1/2 w-1/2 font-semibold">
                            Plantilla
                        </button>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default DownloadFileModal;