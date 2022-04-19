import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { Empleado } from "../../../tipos/Empleado";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { notifyWarn } from "../../../utils/toastify";
import { Paginador } from "../../Forms/paginador";
import UploadFile from "../../Forms/uploadFile";
import SkeletonCard from "../../Skeletons/skeletonCard";

const arrayNum = [...Array(8)];

const EmpleadosPage = (props: { Empleados: Empleado[] }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filtro, setFiltro] = useState<string>("");
    const [EmpleadosFiltrados, setEmpleadosFiltrados] = useState<Empleado[] | undefined>();

    const elementsPerPage = 50;
    const numPages = Math.ceil(props.Empleados.length / elementsPerPage);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    const Filtrar = async (f: string) => {
        if (f === "") { setEmpleadosFiltrados(undefined); return; }
        if (!f.match('^[0-9a-fA-F]{24}$')) { notifyWarn("Cliente inválido"); return; }

        // setClientesFiltrados(/* Fetch clientes */);
    }

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full h-auto py-4 gap-10 justify-end">
                <div className="flex gap-4 w-full h-full">
                    <button className="flex flex-shrink-0 gap-2 px-4 py-2 text-base font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-blue-200">
                        Nuevo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <UploadFile tipoDocumento={TipoDocumento.Clientes} />
                </div>
                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Cliente a buscar"
                        onChange={(e) => { setFiltro(e.target.value); }} onKeyPress={async (e) => { }} />

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
            <div className="h-full w-full border overflow-y-scroll">
                {
                    props.Empleados.length <= 0 ?
                        arrayNum.map((n, i) => {
                            return (
                                <SkeletonCard key={`SkeletonProdList-${i}`} />
                            );
                        })
                        :
                        props.Empleados.slice((elementsPerPage * (currentPage - 1)), currentPage * elementsPerPage).map((emp: Empleado, index) => {
                            return (
                                <div key={`FilaProdTable${emp._id}`}>
                                    <FilaEmpleado empleado={emp} />
                                </div>
                            );
                        })
                }
            </div>
            <div className="flex pt-2 items-center justify-center">
                <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
            </div>
        </div>
    );
}

const FilaEmpleado = (props: { empleado: Empleado }) => {
    const [showModal, setModal] = useState<boolean>(false);

    return (
        <div className="hover:bg-gray-200">
            <div className="flex justify-between border-b px-5 py-2 cursor-pointer" onClick={() => { setModal(true) }}>
                <div className="w-1/3 text-sm text-left">
                    {props.empleado.nombre}
                </div>
                <div className="w-1/3 text-sm text-left">
                    {props.empleado.email}
                </div>
                <div className="w-1/3 text-base text-left">
                    {props.empleado.rol}
                </div>
            </div>
            <AnimatePresence>
                {/* {showModal && <EditarProducto showModal={setModal} product={props.cliente} />} */}
            </AnimatePresence>
        </div>

    );
}


export default EmpleadosPage;