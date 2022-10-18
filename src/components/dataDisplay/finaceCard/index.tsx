import { useEffect, useState } from "react";

const FinanceCard = (props: { titulo: string, unidad?: string, dataActual: string | undefined, dataPrevio: string | undefined }) => {
    // Incremento porcentual: ((valorFinal - valorInicial) / valorInicial ) * 100
    const [crecimiento, setCrecimiento] = useState<string>("0")
    const [isCrecimientoPositivo, setIsCrecimientoPositivo] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        try {
            if (props.dataPrevio && props.dataActual) {
                let crec = 0;
                const dataActual = Number(props.dataActual);
                const dataPrevio = Number(props.dataPrevio)
                if (dataActual >= dataPrevio) {
                    crec = ((dataActual - dataPrevio) / dataActual) * 100;
                    setIsCrecimientoPositivo(true)
                }
                else {
                    crec = ((dataPrevio - dataActual) / dataPrevio) * 100;
                    setIsCrecimientoPositivo(false)
                }
                setCrecimiento(crec.toFixed(2))
            }
        }
        catch (err) {
            setError(true)
        }
    }, [props.dataActual, props.dataPrevio])

    if (!props.dataActual || error || props.dataActual == "undefined") {
        return (
            <div className="w-full border rounded-xl mx-auto">
                <div className="flex animate-pulse items-center h-full px-6 py-3 gap-10">
                    <div className="w-full h-16 bg-gray-300 rounded-lg" />
                </div>
            </div>
        )
    }


    return (
        <div className="shadow-lg hover:shadow-xl rounded-2xl p-4 bg-white dark:bg-gray-800 h-36">
            <div className="flex gap-2 justify-center items-center">
                <span className="rounded-lg relative p-4 bg-purple-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-purple-500 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                    </svg>
                </span>
                <p className="text-lg text-black dark:text-white">
                    {props.titulo}
                </p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                    {props.dataActual}
                    <span className="text-sm">
                        {props.unidad || "€"}
                    </span>
                </p>
            </div>
            {
                !isNaN(Number(crecimiento)) &&
                Number(crecimiento) !== 0 &&
                <div className={`flex justify-center gap-1 items-center ${isCrecimientoPositivo ? "text-green-500" : "text-red-500"} text-sm`}>
                    {
                        isCrecimientoPositivo ?
                            <>
                                {
                                    Number(crecimiento) > 10 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 15l-6-6-6 6" />
                                        </svg>

                                }
                            </>
                            :
                            <>
                                {
                                    Number(crecimiento) > 10 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                }
                            </>
                    }
                    <span>
                        {isCrecimientoPositivo ? crecimiento : "-" + crecimiento}%
                    </span>
                    <span className="text-gray-400 text-xs">
                        vs ayer
                    </span>
                </div>
            }
        </div>
    )
}

export default FinanceCard;