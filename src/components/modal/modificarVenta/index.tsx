import { motion } from "framer-motion";
import { useEffect } from "react";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";

const EditarVenta = (props: { setShowModal: Function, setVenta: Function }) => {

    useEffect(() => {

    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop onClick={() => props.setShowModal(false)}>
                <motion.div variants={In} initial="hidden" animate="visible" exit="exit"
                    className="flex flex-col h-3/6 w-3/6 max-h-96 max-w-lg bg-white rounded-xl  items-center"
                    onClick={(e) => e.stopPropagation()}>
                    En desarrollo!
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default EditarVenta;