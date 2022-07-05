import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import { Cierre } from "../../../tipos/Cierre";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { ITPV } from "../../../tipos/TPV";
import { FetchCierres, FetchCierresByQuery } from "../../../utils/fetches/cierresFetches";
import DownloadFile from "../../elementos/botones/downloadFile";
import UploadFileRestricted from "../../elementos/botones/uploadFileRestricted";
import DateRange from "../../elementos/Forms/dateRange";
import { Paginador } from "../../elementos/Forms/paginador";
import VerCierre from "../../modal/verCierre";
import SkeletonCard from "../../Skeletons/skeletonCard";
import { FetchTPVs } from "../../../utils/fetches/tpvFetches";

const arrayNum = [...Array(8)];
const elementsPerPage = 50;

const CierrePage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filtro, setFiltro] = useState<string>("");
    const [CierresFiltrados, setCierresFiltradas] = useState<Cierre[] | undefined>();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [CierresList, SetCierres] = useState<Cierre[]>([]);
    const [Tpvs, SetTpvs] = useState<ITPV[]>([]);
    const { Empleado, SetEmpleado } = useEmpleadoContext();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (Object.keys(Empleado).length === 0) {
            SetEmpleado(Empleado)
        }
        const GetAllData = async () => {
            SetCierres(await FetchCierres());
            SetTpvs(await FetchTPVs());
            setLoading(false);
        }
        GetAllData();
    });

    const numPages = Math.ceil(CierresList.length / elementsPerPage);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    const Filtrar = async (f: string) => {
        if (f === "") { setCierresFiltradas(undefined); return; }

        setCierresFiltradas(await FetchCierresByQuery(f));
    }

    if (isLoading) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
                <div className="flex w-full h-auto py-4 gap-2 justify-end ">
                    <UploadFileRestricted tipoDocumento={TipoDocumento.Cierres} />
                    <DownloadFile tipoDocumento={TipoDocumento.Cierres} />
                    <DateRange dateRange={dateRange} setDateRange={setDateRange} endDate={endDate} startDate={startDate} />
                    <input disabled autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-max-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="ID del cierre" />
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
                <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl px-5 py-2">
                    <div className="text-left text-sm font-semibold w-1/4">
                        TPV
                    </div>

                    <div className="text-left text-sm font-semibold w-1/4">
                        Fecha
                    </div>
                    <div className="text-right text-sm font-semibold w-1/4 ">
                        Trabajador
                    </div>
                    <div className="text-right text-sm font-semibold w-1/4">
                        Ventas totales
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
                <div className="flex pt-2 items-center justify-center">
                    <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
                </div>
            </div>
        )
    }

    if (CierresList.length <= 0) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
                <div className="flex w-full h-auto py-4 gap-2 justify-end">
                    <UploadFileRestricted tipoDocumento={TipoDocumento.Cierres} />
                    <DownloadFile tipoDocumento={TipoDocumento.Cierres} />
                    <DateRange disabled dateRange={dateRange} setDateRange={setDateRange} endDate={endDate} startDate={startDate} />
                    <input disabled autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-max-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="ID del cierre"
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
                <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl px-5 py-2">
                    <div className="text-left text-sm font-semibold w-1/4">
                        TPV
                    </div>

                    <div className="text-left text-sm font-semibold w-1/4">
                        Fecha
                    </div>
                    <div className="text-right text-sm font-semibold w-1/4 ">
                        Trabajador
                    </div>
                    <div className="text-right text-sm font-semibold w-1/4">
                        Ventas totales
                    </div>
                </div>
                <div className="flex justify-center items-center h-full w-full border-2 rounded-b text-xl overflow-y-scroll">
                    No hay registros de cierres en la base de datos
                </div>
                <div className="flex pt-2 items-center justify-center">
                    <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
                </div>
            </div>
        )
    }

    return (
        // <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">ey</div>
        <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full h-auto py-4 gap-2 justify-end">
                <div className="flex gap-2 justify-start w-full">
                    <UploadFileRestricted tipoDocumento={TipoDocumento.Cierres} />
                    <DownloadFile tipoDocumento={TipoDocumento.Cierres} />
                </div>
                <DateRange dateRange={dateRange} setDateRange={setDateRange} endDate={endDate} startDate={startDate} />
                <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-max-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="ID del cierre"
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
            <div className="flex flex-col w-full h-4/5 ">
                <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl px-5 py-2">
                    <div className="text-left text-sm font-semibold w-1/4">
                        TPV
                    </div>

                    <div className="text-left text-sm font-semibold w-1/4">
                        Fecha
                    </div>
                    <div className="text-right text-sm font-semibold w-1/4 ">
                        Trabajador
                    </div>
                    <div className="text-right text-sm font-semibold w-1/4">
                        Ventas totales
                    </div>
                </div>
                <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
                    <TablaCierre CierresList={CierresList} currentPage={currentPage} Tpvs={Tpvs} />
                </div>
            </div>
            <div className="flex pt-2 items-center justify-center">
                <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
            </div>
        </div>
    );
}

export default CierrePage;

const TablaCierre = (props: { CierresList: Cierre[], currentPage: number, Tpvs: ITPV[] }) => {
    return (
        <>
            {
                props.CierresList.length <= 0 ?
                    arrayNum.map((n, i) => {
                        return (
                            <div key={`SkeletonProdList-${i}`} >
                                <SkeletonCard />
                            </div>
                        );
                    })
                    :
                    props.CierresList.slice((elementsPerPage * (props.currentPage - 1)), props.currentPage * elementsPerPage).map((p, index) => {
                        return (
                            <div className="w-full h-10" key={`FilaProdTable${p._id}`}>
                                <FilaCierre cierre={p} tpvs={props.Tpvs} />
                            </div>
                        );
                    })
            }
        </>
    )
}

const FilaCierre = (props: { cierre: Cierre, tpvs: ITPV[] }) => {
    const [showModal, setModal] = useState<boolean>(false);
    const tpv = props.tpvs.find((t) => { return t._id === props.cierre.tpv })?.nombre || 'Cargando...';

    return (
        <div className="hover:bg-blue-200">
            <div className="flex justify-between border-b px-5 py-2 cursor-pointer" onClick={() => { setModal(true) }}>
                <div className="w-1/4 text-sm text-left">
                    {tpv}
                </div>
                <div className="w-1/4 text-sm text-left">
                    {new Date(Number(props.cierre.cierre)).toLocaleString()}
                </div>
                <div className="w-1/4 text-base text-right">
                    {props.cierre.cerradoPor.nombre}
                </div>
                <div className="w-1/4 text-sm text-right">
                    {props.cierre.ventasTotales.toFixed(2)}€
                </div>
            </div>
            <AnimatePresence>
                {showModal && <VerCierre showModal={setModal} cierre={props.cierre} tpv={tpv} />}
            </AnimatePresence>
        </div>
    );
}