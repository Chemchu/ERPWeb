import { useEffect, useState } from "react"
import { notifyWarn } from "../../../utils/toastify"
import { ValidateSearchString } from "../../../utils/validator"
import NuevoBoton from "../../elementos/botones/nuevoBoton"

const ProveedoresPage = () => {
    const [filtro, setFiltro] = useState<string>("")
    const [proveedores, setProveedores] = useState<any[]>([])
    useEffect(() => {

    }, [])

    const Filtrar = async (f: string) => {
        if (f === "") { return; }
        if (!ValidateSearchString(f)) { notifyWarn("Proveedor inválido"); return; }

        // setProductosFiltradas(await FetchProductoByQuery(f, tipoProductos));
    }

    return (
        <main className="flex flex-col w-full h-full max-h-full bg-white border-x border-b rounded-b-3xl rounded-r-3xl shadow-lg p-4">
            <section className="flex justify-between items-start w-full">
                <NuevoBoton accionEvent={() => { }} />
                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-40 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Buscar..."
                        onChange={(e) => { setFiltro(e.target.value); }} onKeyPress={async (e) => { e.key === "Enter" && await Filtrar(filtro) }} />
                    {
                        filtro ?
                            <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-purple-200"
                                onClick={async (e) => { e.preventDefault(); await Filtrar(filtro) }}>
                                Filtrar
                            </button>
                            :
                            <button disabled className="px-4 py-2 font-semibold text-white bg-blue-300 rounded-lg shadow-md cursor-default">
                                Filtrar
                            </button>
                    }
                </div>
            </section>
            <section className="w-full h-full">
                En desarrollo!
            </section>
        </main>
    )
}

export default ProveedoresPage