const FinanceCard = (props: { titulo: string, valor: number, crecimiento: number }) => {

    return (
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center">
                <span className="rounded-xl relative p-4 bg-purple-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-purple-500 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <p className="text-md text-black dark:text-white ml-2">
                    {props.titulo}
                </p>
            </div>
            <div className="flex flex-col justify-start">
                <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                    {props.valor}
                    <span className="text-sm">
                        €
                    </span>
                </p>
                <div className="flex gap-1 items-center text-green-500 text-sm">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                        </path>
                    </svg>
                    <span>
                        {props.crecimiento}%
                    </span>
                    <span className="text-gray-400">
                        vs ayer
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FinanceCard;