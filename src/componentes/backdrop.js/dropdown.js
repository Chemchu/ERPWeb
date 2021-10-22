import { motion } from "framer-motion";

export const Backdrop = ({children, onClick}) => {
    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity:0 }} 
            className="absolute top-0 left-0 h-full w-full bg-opacity-90 bg-black flex items-center justify-center"
            onClick={onClick}>
            {children}
        </motion.div>
    );

}