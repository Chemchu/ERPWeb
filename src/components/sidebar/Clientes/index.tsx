import { AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { notifyWarn } from "../../../utils/toastify";
import { Paginador } from "../../elementos/Forms/paginador";
import UploadFile from "../../elementos/botones/uploadFile";
import SkeletonCard from "../../Skeletons/skeletonCard";
import NuevoBoton from "../../elementos/botones/nuevoBoton";
import DownloadFile from "../../elementos/botones/downloadFile";
import VerCliente from "../../modal/verCliente";
import AddCliente from "../../modal/addCliente";
import { FetchClientes, FetchClientesByQuery } from "../../../utils/fetches/clienteFetches";

const arrayNum = [...Array(8)];

const ClientesPage = () => {
    const [Clientes, setClientes] = useState<Cliente[]>([]);
    const [filtro, setFiltro] = useState<string>("");
    const [ClientesFiltrados, setClientesFiltrados] = useState<Cliente[] | undefined>();
    const [showModal, setModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const GetAllData = async () => {
            setClientes((await FetchClientes()).filter((c) => { return c.nif !== "General" }));
            setLoading(false);
        }
        GetAllData();
    }, []);

    useEffect(() => {
        if (filtro === "") { setClientesFiltrados(undefined); return; }
    }, [filtro])

    const Filtrar = async (f: string) => {
        if (f === "") {
            return;
        }

        const clientes = await FetchClientesByQuery(f);
        setClientesFiltrados(clientes.filter((c) => c.nif !== "General"));
    }

    if (isLoading) {
        return (<div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full h-auto py-4 gap-10 justify-end">
                <div className="flex gap-4 w-full h-full">
                    <NuevoBoton accionEvent={() => setModal(true)} />
                    <UploadFile tipoDocumento={TipoDocumento.Clientes} />
                    <DownloadFile tipoDocumento={TipoDocumento.Clientes} />
                </div>
                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Cliente a buscar"
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
            </div>
            <div className="flex justify-between border-t border-x rounded-t-2xl px-5 py-2">
                <div className="text-left text-sm font-semibold w-1/3">
                    Nombre
                </div>
                <div className="text-left text-sm font-semibold w-1/3">
                    CIF
                </div>
                <div className="text-left text-sm font-semibold w-1/3">
                    Dirección
                </div>
            </div>
            <TablaClientes clientes={[]} />
            <AnimatePresence>
                {showModal && <AddCliente showModal={setModal} setClientes={setClientes} />}
            </AnimatePresence>
        </div>)
    }

    if (Clientes.length <= 0) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
                <div className="flex w-full h-auto py-4 gap-10 justify-end">
                    <div className="flex gap-4 w-full h-full">
                        <NuevoBoton accionEvent={() => setModal(true)} />
                        <UploadFile tipoDocumento={TipoDocumento.Clientes} />
                        <DownloadFile tipoDocumento={TipoDocumento.Clientes} />
                    </div>
                    <div className="flex gap-2">
                        <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Cliente a buscar"
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
                </div>
                <div className="flex justify-between border-t border-x rounded-t-2xl px-5 py-2">
                    <div className="text-left text-sm font-semibold w-1/3">
                        Nombre
                    </div>
                    <div className="text-left text-sm font-semibold w-1/3">
                        CIF
                    </div>
                    <div className="text-left text-sm font-semibold w-1/3">
                        Dirección
                    </div>
                </div>
                <div className="flex justify-center items-center h-full w-full border-2 rounded-b text-xl">
                    No hay registros de clientes en la base de datos
                </div>
                <AnimatePresence>
                    {showModal && <AddCliente showModal={setModal} setClientes={setClientes} />}
                </AnimatePresence>
            </div>
        )

    }

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full h-auto py-4 gap-10 justify-end">
                <div className="flex gap-4 w-full h-full">
                    <NuevoBoton accionEvent={() => setModal(true)} />
                    <UploadFile tipoDocumento={TipoDocumento.Clientes} />
                    <DownloadFile tipoDocumento={TipoDocumento.Clientes} />
                </div>
                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Cliente a buscar"
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
            </div>
            <div className="flex justify-between border-t border-x rounded-t-2xl px-5 py-2">
                <div className="text-left text-sm font-semibold w-1/3">
                    Nombre
                </div>
                <div className="text-left text-sm font-semibold w-1/3">
                    CIF
                </div>
                <div className="text-left text-sm font-semibold w-1/3">
                    Dirección
                </div>
            </div>
            {
                ClientesFiltrados ?
                    <TablaClientes clientes={ClientesFiltrados} />
                    :
                    <TablaClientes clientes={Clientes} />
            }
            <AnimatePresence>
                {showModal && <AddCliente showModal={setModal} setClientes={setClientes} />}
            </AnimatePresence>
        </div>
    );
}

const TablaClientes = (props: { clientes: Cliente[] }) => {
    const [Clientes, setClientes] = useState(props.clientes);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        setClientes(props.clientes);
    }, [props.clientes]);

    const elementsPerPage = 50;
    const numPages = Math.ceil(Clientes.length / elementsPerPage);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    return (
        <>
            <div className="h-full w-full border overflow-y-scroll">
                {

                    Clientes.length <= 0 ?
                        arrayNum.map((n, i) => {
                            return (
                                <SkeletonCard key={`SkeletonProdList-${i}`} />
                            );
                        })
                        :
                        Clientes.slice((elementsPerPage * (currentPage - 1)), currentPage * elementsPerPage).map((c: Cliente, index) => {
                            return (
                                <div key={`FilaProdTable${c._id}`}>
                                    <FilaCliente cliente={c} setClientes={setClientes} />
                                </div>
                            );
                        })
                }
            </div>
            <div className="flex pt-2 items-center justify-center">
                <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
            </div>
        </>
    )
}

const FilaCliente = (props: { cliente: Cliente, setClientes: Dispatch<SetStateAction<Cliente[]>> }) => {
    const [showModal, setModal] = useState<boolean>(false);
    const [cliente, setCliente] = useState<Cliente>(props.cliente);

    return (
        <div className="hover:bg-gray-200">
            <div className="flex justify-between border-b px-5 py-2 cursor-pointer" onClick={() => { setModal(true) }}>
                <div className="w-1/3 text-sm text-left">
                    {cliente.nombre}
                </div>
                <div className="w-1/3 text-sm text-left">
                    {cliente.nif}
                </div>
                <div className="w-1/3 text-base text-left">
                    {cliente.calle}
                </div>
            </div>
            <AnimatePresence>
                {showModal && <VerCliente showModal={setModal} cliente={cliente} setCliente={setCliente} setClientes={props.setClientes} />}
            </AnimatePresence>
        </div>

    );
}

export default ClientesPage;