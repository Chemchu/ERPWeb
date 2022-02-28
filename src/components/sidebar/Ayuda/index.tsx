
const AyudaPage = () => {
    return (
        <div className="flex flex-col h-screen w-full antialiased px-8 py-8" >
            <h2 className="text-2xl leading-tight">
                Ayuda
            </h2>
            <div className="flex flex-col h-full bg-white w-full mt-4 pb-20 rounded-xl shadow-lg p-4">
                <span>
                    ¡Buenas! ERPSolution es un trabajo final de máster, desarrollado por solo una persona cuyo tiempo es bastante escaso.

                </span>
                <span>
                    Este proyecto se encuentra en fase de desarrollo. No es perfecto, no es compacto y no está testeado, pero es gratis.
                </span><br />

                <span>
                    Todas las dudas, sugerencias e indicaciones lo podéis dejar como un issue en el GitHub de este repositorio

                </span><br />
                <a className="text-blue-500 italic" href="https://github.com/Chemchu/ERPWeb">
                    https://github.com/Chemchu/ERPWeb
                </a><br />
                <a className="text-blue-500 italic" href="https://github.com/Chemchu/ERPBack">
                    https://github.com/Chemchu/ERPBack
                </a>
            </div>
        </div>
    );
}

export default AyudaPage;