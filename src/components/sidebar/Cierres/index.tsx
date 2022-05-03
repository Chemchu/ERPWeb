import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Cierre } from "../../../tipos/Cierre";
import { TPVType } from "../../../tipos/TPV";
import { notifyWarn } from "../../../utils/toastify";
import DateRange from "../../elementos/Forms/dateRange";
import { Paginador } from "../../elementos/Forms/paginador";
import VerCierre from "../../modal/verCierre";
import SkeletonCard from "../../Skeletons/skeletonCard";

const arrayNum = [...Array(8)];

const CierrePage = (props: { cierres: Cierre[], tpvs: TPVType[] }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filtro, setFiltro] = useState<string>("");
    const [CierresFiltrados, setCierresFiltradas] = useState<Cierre[] | undefined>();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const elementsPerPage = 50;
    const numPages = Math.ceil(props.cierres.length / elementsPerPage);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    const Filtrar = async (f: string) => {
        if (f === "") { setCierresFiltradas(undefined); return; }
        if (!f.match('^[0-9a-fA-F]{24}$')) { notifyWarn("Cierre inválido"); return; }

        //setCierresFiltradas(await FetchProductoByQuery(f));
    }

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full h-auto py-4 gap-10 justify-end">
                <div className="flex gap-2">
                    <div className="flex gap-4 w-full h-full">
                        <DateRange dateRange={dateRange} setDateRange={setDateRange} endDate={endDate} startDate={startDate} />
                    </div>
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="ID del cierre"
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
                    props.cierres.length <= 0 ?
                        arrayNum.map((n, i) => {
                            return (
                                <SkeletonCard key={`SkeletonProdList-${i}`} />
                            );
                        })
                        :
                        props.cierres.slice((elementsPerPage * (currentPage - 1)), currentPage * elementsPerPage).map((p, index) => {
                            return (
                                <div key={`FilaProdTable${p._id}`}>
                                    <FilaCierre cierre={p} tpvs={props.tpvs} />
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

export default CierrePage;

const FilaCierre = (props: { cierre: Cierre, tpvs: TPVType[] }) => {
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