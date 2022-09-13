import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { In } from "../../../utils/animations"
import FloatingLabel from "../../floatingLabel"
import { Backdrop } from "../backdrop"

const Ofertar = (props: { setModal: Function }) => {
    const [infoOpen, setInfoOpen] = useState<boolean>(false);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full ">
            <Backdrop onClick={() => { props.setModal(false) }}>
                <motion.div className="flex flex-col h-1/2 w-1/2 xl:h-1/3 xl:w-1/3 gap-2 items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex gap-1 w-full font-semibold text-xl items-center">
                        Ofertas disponibles
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-6 h-6 text-blue-500 cursor-pointer"
                            onClick={() => setInfoOpen(!infoOpen)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        <AnimatePresence>
                            {infoOpen && <FloatingLabel texto="Oferta basada en la compra actual" />}
                        </AnimatePresence>
                    </div>

                    <div className="w-full h-full">
                        Para este cliente
                    </div>

                </motion.div>
            </Backdrop>
        </motion.div>
    )
}

export default Ofertar;