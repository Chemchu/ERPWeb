import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Venta } from "../../../tipos/Venta";
import { QUERY_TPV_SALES } from "../../../utils/querys";
import { Backdrop } from "../backdrop";

const In = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 15,
            stifness: 500
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition: {
            duration: 0.25,
        }
    }
}


export const CerrarCaja = (props: { handleClose: Function }) => {
    const [Ventas, setVentas] = useState<Venta[]>();
    const { data, loading, error } = useQuery(QUERY_TPV_SALES, {
        variables: {
            find: {
                tpv: null
            }
        }
    });

    // useEffect(() => {
    //     const GetVentas = async () => {
    //         const fetchResult = fetch('/api/ventas')
    //     }
    //     GetVentas();
    // }, [])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={(e) => { e.stopPropagation(); props.handleClose(false) }} >
                <motion.div className="m-auto py-2 flex flex-col items-center bg-white rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col h-4/5 w-full rounded justify-center content-center">
                        <div className="text-lg font-bold">
                            Cerrar TPV
                        </div>
                        <div className="flex w-full h-full">
                            <div className="flex gap-2">
                                <p>Ventas totales: </p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default CerrarCaja;