import { Backdrop } from "../backdrop.js/dropdown.js";
import { AnimatePresence, motion } from "framer-motion";

const In = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition:{
            duration: 0.1,
            type: "spring",
            damping: 25,
            stifness: 500
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0
    }
}

export const ModalPagar = ({handleClose: cerrarModal, texto}) => {
    return(
        <Backdrop onClick={cerrarModal}>
            <motion.div className="m-auto py-2 flex flex-col items-center bg-white rounded-lg" 
                onClick={(e) => e.stopPropagation()} 
                variants={In} 
                initial="hidden"
                animate="visible"
                exit="exit"
            >    
                            
                <div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200">
                </div>
                <div class="flex flex-col flex-1 gap-5 sm:p-2">
                    <div class="flex flex-1 flex-col gap-3">
                        <div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl">
                        </div>
                        <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
                        </div>
                        <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
                        </div>
                        <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
                        </div>
                        <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
                        </div>
                    </div>
                    <div class="mt-auto flex gap-3">
                        <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
                        </div>
                        <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
                        </div>
                        <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto">
                        </div>
                    </div>
                </div>

                <button onClick={cerrarModal}>Cancelar</button>
            </motion.div>
        </Backdrop>        
    );

}