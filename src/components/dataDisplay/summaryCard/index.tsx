const SummaryCard = (props: { titulo: string, valorEfectivo: number, valorTarjeta: number }) => {
    // Incremento porcentual: ((valorFinal - valorInicial) / valorInicial ) * 100

    return (
        <div className="md:p-6 p-4 bg-white shadow-lg hover:shadow-xl rounded-lg flex justify-between dark:bg-gray-800 md:items-center md:flex-row flex-col gap-12">
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
            <div>Hola</div>
            <div className="flex gap-10 self-end">
                <div>
                    <span className="md:text-right text-left md:block">
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
                    <span className="md:text-right text-left md:block">
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