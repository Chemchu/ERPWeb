import { motion } from "framer-motion";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";

const DownloadFileModal = (props: { setModal: Function }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full">
            <Backdrop onClick={(e) => { e.stopPropagation(); props.setModal(false) }} >
                <motion.div className="h-3/6 w-2/6 m-auto py-2 flex flex-col items-center justify-center bg-white rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Meter skeletons */}
                    Cargando...
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default DownloadFileModal;