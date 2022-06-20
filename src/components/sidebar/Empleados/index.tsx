import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Empleado } from "../../../tipos/Empleado";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { notifyWarn } from "../../../utils/toastify";
import { Paginador } from "../../elementos/Forms/paginador";
import UploadFile from "../../elementos/botones/uploadFile";
import AddEmpleado from "../../modal/addEmpleado";
import VerEmpleado from "../../modal/verEmpleado";
import SkeletonCard from "../../Skeletons/skeletonCard";
import NuevoBoton from "../../elementos/botones/nuevoBoton";
import DownloadFile from "../../elementos/botones/downloadFile";
import useEmpleadoContext from "../../../context/empleadoContext";
import { FetchEmpleados, FetchEmpleadosByQuery } from "../../../utils/fetches/empleadoFetches";
import AuthorizationWrapper from "../../authorizationWrapper";
import { Roles } from "../../../tipos/Enums/Roles";

const arrayNum = [...Array(8)];

const EmpleadosPage = () => {
    const [EmpleadosList, SetEmpleados] = useState<Empleado[]>([]);
    const [filtro, setFiltro] = useState<string>("");
    const [EmpleadosFiltrados, setEmpleadosFiltrados] = useState<Empleado[] | undefined>();
    const [showModal, setModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const GetAllData = async () => {
            SetEmpleados(await FetchEmpleados());
            setLoading(false);
        }
        GetAllData();
    }, []);

    useEffect(() => {
        if (filtro === "") { setEmpleadosFiltrados(undefined); }
    }, [filtro])

    const Filtrar = async (f: string) => {
        if (f === "") { return; }

        setEmpleadosFiltrados(await FetchEmpleadosByQuery(f));
    }

    if (isLoading) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
                <div className="flex w-full h-auto py-4 gap-10 justify-end">
                    <div className="flex gap-4 w-full h-full">
                        <NuevoBoton accionEvent={() => setModal(true)} />
                        <UploadFile tipoDocumento={TipoDocumento.Clientes} />
                        <DownloadFile tipoDocumento={TipoDocumento.Empleado} />
                    </div>
                    <div className="flex gap-2">
                        <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Empleado a buscar"
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
                        Correo
                    </div>
                    <div className="text-left text-sm font-semibold w-1/3">
                        Rol
                    </div>
                </div>
                <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
                    {
                        arrayNum.map((n, i) => {
                            return (
                                <SkeletonCard key={`SkeletonProdList-${i}`} />
                            );
                        })
                    }
                </div>
                <AnimatePresence>
                    {showModal && <AddEmpleado showModal={setModal} />}
                </AnimatePresence>
            </div>
        )
    }

    if (EmpleadosList.length <= 0) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
                <div className="flex w-full h-auto py-4 gap-10 justify-end">
                    <div className="flex gap-4 w-full h-full">
                        <NuevoBoton accionEvent={() => setModal(true)} />
                        <UploadFile tipoDocumento={TipoDocumento.Clientes} />
                        <DownloadFile tipoDocumento={TipoDocumento.Empleado} />
                    </div>
                    <div className="flex gap-2">
                        <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Empleado a buscar"
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
                        Correo
                    </div>
                    <div className="text-left text-sm font-semibold w-1/3">
                        Rol
                    </div>
                </div>
                <div className="flex justify-center items-center text-xl h-full w-full border">
                    No se ha encontrado registros de empleados en el sistema
                </div>
                <AnimatePresence>
                    {showModal && <AddEmpleado showModal={setModal} />}
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
                    <DownloadFile tipoDocumento={TipoDocumento.Empleado} />
                </div>
                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Empleado a buscar"
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
                    Correo
                </div>
                <div className="text-left text-sm font-semibold w-1/3">
                    Rol
                </div>
            </div>
            <TablaEmpleado Empleados={EmpleadosFiltrados || EmpleadosList} />
            <AnimatePresence>
                {showModal && <AddEmpleado showModal={setModal} />}
            </AnimatePresence>
        </div>
    );
}

const TablaEmpleado = (props: { Empleados?: Empleado[] }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [empleados, setEmpleados] = useState<Empleado[]>(props.Empleados || [])

    const elementsPerPage = 50;
    const numPages = Math.ceil(props.Empleados ? (props.Empleados.length / elementsPerPage) : 30);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    return (
        <>
            <div className="h-full w-full border overflow-y-scroll">
                {
                    empleados.slice((elementsPerPage * (currentPage - 1)), currentPage * elementsPerPage).map((emp: Empleado, index) => {
                        return (
                            <div key={`FilaProdTable${emp._id}`}>
                                <FilaEmpleado empleado={emp} setEmpleados={setEmpleados} />
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

const FilaEmpleado = (props: { empleado: Empleado, setEmpleados: Function }) => {
    const [showModal, setModal] = useState<boolean>(false);
    const [empleado, setEmpleado] = useState<Empleado>(props.empleado);

    return (
        <div className="hover:bg-gray-200">
            <div className="flex justify-between border-b px-5 py-2 cursor-pointer" onClick={() => { setModal(true) }}>
                <div className="w-1/3 text-sm text-left">
                    {empleado.nombre}
                </div>
                <div className="w-1/3 text-sm text-left">
                    {empleado.email}
                </div>
                <div className="w-1/3 text-base text-left">
                    {empleado.rol}
                </div>
            </div>
            <AnimatePresence>
                {showModal && <VerEmpleado showModal={setModal} empleado={empleado} setEmpleado={setEmpleado} setEmpleados={props.setEmpleados} />}
            </AnimatePresence>
        </div>

    );
}

export default AuthorizationWrapper([Roles.Administrador, Roles.Gerente], true)(EmpleadosPage);