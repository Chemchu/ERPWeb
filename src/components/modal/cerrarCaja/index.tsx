import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import useJwt from "../../../hooks/jwt";
import { Venta } from "../../../tipos/Venta";
import { FetchSalesByTPV, FetchTPV } from "../../../utils/fetches";
import { GetTotalEnCaja, GetTotalEnEfectivo, GetTotalEnTarjeta } from "../../../utils/preciosUtils";
import { CreateSalesList, CreateTPV } from "../../../utils/typeCreator";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import StatsCard from "../../dataDisplay/estadisticas";
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
    const [TotalEfectivo, setTotalEfectivo] = useState<number>();
    const [TotalTarjeta, setTotalTarjeta] = useState<number>();
    const [TotalPrevistoEnCaja, setTotalPrevistoEnCaja] = useState<number>();
    const [TotalRealEnCaja, setTotalRealEnCaja] = useState<number>();

    const jwt = useJwt();

    useEffect(() => {
        const GetVentas = async () => {
            const ventas = await FetchSalesByTPV(jwt.TPV);
            const tpv = await FetchTPV(jwt.TPV);

            setVentas(ventas);
            setTotalEfectivo(GetTotalEnEfectivo(ventas));
            setTotalTarjeta(GetTotalEnTarjeta(ventas));
            setTotalPrevistoEnCaja(GetTotalEnCaja(ventas, tpv));
        }
        GetVentas();

    }, [])

    if (!Ventas) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full w-full ">
                <Backdrop onClick={(e) => { e.stopPropagation(); props.handleClose(false) }} >
                    <motion.div className="h-4/5 w-4/5 m-auto py-2 flex flex-col items-center justify-center bg-white rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                        variants={In}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <SpinnerCircular size={"30%"} />
                    </motion.div>
                </Backdrop>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full ">
            <Backdrop onClick={(e) => { e.stopPropagation(); props.handleClose(false) }} >
                <motion.div className="h-4/5 w-4/5 flex flex-col items-center bg-white rounded-2xl p-4"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex flex-col gap-4 h-full w-full rounded justify-center content-center">
                        <div className="text-lg text-center font-bold">
                            Ventana de cierre de TPV
                        </div>
                        <hr />
                        <div className="flex w-full h-full">
                            <div className="flex flex-col gap-4 w-full h-full">
                                <div className="flex gap-2">
                                    <p>Número de ventas: </p>
                                    <p>{Ventas.length}</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Ventas en efectivo: </p>
                                    <p>{TotalEfectivo}€</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Ventas en tarjeta: </p>
                                    <p>{TotalTarjeta}€</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Dinero total esperado en caja: </p>
                                    <p>{TotalPrevistoEnCaja}€</p>
                                </div>

                                <div className="flex gap-2">
                                    <p>Dinero total real en caja: </p>
                                    <input className="rounded-lg border"
                                        onChange={(e) => { setTotalRealEnCaja(Number(ValidatePositiveFloatingNumber(e.target.value))) }} value={TotalRealEnCaja} />
                                    €
                                </div>


                            </div>

                        </div>
                        <div className="flex gap-10 h-auto w-full mb-auto justify-center text-white items-center">
                            <div className="h-10 w-2/6 rounded-lg bg-red-500 cursor-pointer text-center"
                                onClick={() => props.handleClose(false)}>
                                <div className="h-full w-full">
                                    Cancelar
                                </div>
                            </div>
                            <div className="h-10 w-2/6 rounded-lg bg-blue-500 text-center">
                                <span className="inline-block h-full w-full self-center">
                                    Cerrar caja
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default CerrarCaja;