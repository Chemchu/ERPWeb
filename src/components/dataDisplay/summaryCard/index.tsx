const SummaryCard = (props: { titulo: string, valorEfectivo: number | undefined, valorTarjeta: number | undefined }) => {
    // Incremento porcentual: ((valorFinal - valorInicial) / valorInicial ) * 100

    if (!props.valorEfectivo) {
        return <></>
    }
    if (!props.valorTarjeta) {
        return <></>
    }

    return (
        <div className="md:p-6 p-4 bg-white shadow-lg hover:shadow-xl rounded-lg flex justify-between dark:bg-gray-800 md:items-center md:flex-row flex-col gap-12">
            <div className="flex justify-between w-full">
                <div>
                    <span className="text-bold text-gray-700 dark:text-gray-400 block">
                        {props.titulo}
                    </span>
                    <span className="text-black text-4xl md:text-5xl mt-2 font-black block">
                        {(props.valorEfectivo + props.valorTarjeta).toFixed(2)}
                        <span className="text-xl">
                            €
                        </span>
                    </span>
                </div>
                <div>
                    <span className="text-left md:block">
                        Efectivo
                    </span>
                    <span className="text-black text-4xl md:text-5xl mt-2 font-black block">
                        {(props.valorEfectivo).toFixed(2)}
                        <span className="text-xl">
                            €
                        </span>
                    </span>
                </div>
                <div>
                    <span className="text-left md:block">
                        Tarjeta
                    </span>
                    <span className="text-black text-4xl md:text-5xl mt-2 font-black block">
                        {(props.valorTarjeta).toFixed(2)}
                        <span className="text-xl">
                            €
                        </span>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default SummaryCard;