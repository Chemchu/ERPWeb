import { motion } from "framer-motion";

const FloatingLabel = (props: { texto: string, color: string }) => {
    if (props.color === "green") {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center">
                    <div className={`relative left-0.5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-solid border-b-transparent border-t-transparent border-r-green-600`}>
                    </div>
                    <div className={`border-y border-r border-green-600 bg-green-600 rounded-lg text-sm font-normal px-2 text-white`}>
                        {props.texto}
                    </div>
                </div>
            </motion.div>
        )
    }

    if (props.color === "orange") {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center">
                    <div className={`relative left-0.5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-solid border-b-transparent border-t-transparent border-r-orange-600`}>
                    </div>
                    <div className={`border-y border-r border-orange-600 bg-orange-600 rounded-lg text-sm font-normal px-2 text-white`}>
                        {props.texto}
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center">
                <div className={`relative left-0.5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-solid border-b-transparent border-t-transparent border-r-blue-600`}>
                </div>
                <div className={`border-y border-r border-blue-600 bg-blue-600 rounded-lg text-sm font-normal px-2 text-white`}>
                    {props.texto}
                </div>
            </div>
        </motion.div>
    )
}

export default FloatingLabel;