import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { Venta } from "../../../tipos/Venta";
import { FetchVenta } from "../../../utils/fetches";
import { notifyWarn } from "../../../utils/toastify";
import DateRange from "../../Forms/dateRange";
import { Paginador } from "../../Forms/paginador";
import Reembolso from "../../modal/reembolso";
import SkeletonCard from "../../Skeletons/skeletonCard";

const ReembolsoPage = (props: { ventas: Venta[], clientes: Cliente[] }) => {
    if (props.ventas == undefined) throw new Error("Props de ventas en ventasTabs.tsx es undefined");
    if (props.clientes == undefined) throw new Error("Props de clientes en ventasTabs.tsx es undefined");

    const [CurrentPage, setCurrentPage] = useState<number>(1);
    const [CurrentVenta, setCurrentVenta] = useState<Venta>();
    const [showModalEditarVenta, setShowModal] = useState<boolean>();
    const [VentasFiltradas, setVentasFiltradas] = useState<Venta[] | undefined>();
    const [filtro, setFiltro] = useState<string>("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        if (!filtro) {
            setVentasFiltradas(undefined);
        }
    }, [filtro])


    const elementsPerPage = 20;
    const numPages = props.ventas.length <= 0 ? 1 : Math.ceil(props.ventas.length / elementsPerPage);
    const arrayNum = [...Array(8)];

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    const Filtrar = async (f: string) => {
        if (f === "") { setVentasFiltradas(undefined); return; }
        if (!f.match('^[0-9a-fA-F]{24}$')) { notifyWarn("Introduce un ID de venta válido"); return; }

        setVentasFiltradas(await FetchVenta(f));
    }

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full pb-4 gap-10 justify-end">
                <DateRange dateRange={dateRange} setDateRange={setDateRange} endDate={endDate} startDate={startDate} />

                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="ID del reembolso..."
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
            <div className="grid grid-cols-4 justify-evenly border-t border-x rounded-t-2xl">
                <div className="px-5 py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                    Cliente
                </div>
                <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                    Fecha de compra
                </div>
                <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                    Fecha de reembolso
                </div>
                <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                    Dinero devuelto
                </div>
            </div>
            <div className="h-full w-full pb-4 border overflow-y-scroll">
                {
                    props.ventas.length <= 0 ?
                        arrayNum.map((e, i) => <SkeletonCard key={`skeletonprops.ventas-${i}`} />)
                        :
                        VentasFiltradas && filtro ?
                            VentasFiltradas.slice((elementsPerPage * (CurrentPage - 1)), CurrentPage * elementsPerPage).map((v) => {
                                return (
                                    <div key={`FilaProdTable${v._id}`} onClick={() => { setCurrentVenta(v); setShowModal(true) }}>
                                        <FilaReembolso key={`FilaReembolso${v._id}`} venta={v} />
                                    </div>
                                );
                            })
                            :
                            props.ventas.slice((elementsPerPage * (CurrentPage - 1)), CurrentPage * elementsPerPage).map((v) => {
                                return (
                                    <div className="hover:bg-gray-200 cursor-pointer"
                                        key={`FilaProdTable${v._id}`} onClick={() => { setCurrentVenta(v); setShowModal(true) }}>
                                        <FilaReembolso key={`FilaReembolso${v._id}`} venta={v} />
                                    </div>
                                );
                            })
                }
            </div>
            <div className="flex pt-2 items-center justify-center">
                <Paginador numPages={numPages} paginaActual={CurrentPage} maxPages={elementsPerPage} cambiarPaginaActual={setPaginaActual} />
            </div>
            <AnimatePresence initial={false}>
                {showModalEditarVenta &&
                    <div>
                        <Reembolso venta={CurrentVenta} setModal={setShowModal} />
                    </div>
                }
            </AnimatePresence>
        </div>
    );
}

const FilaReembolso = (props: { venta: Venta }) => {
    const fecha = new Date(Number(props.venta.createdAt));
    const fechaReembolso = new Date(Number(props.venta.updatedAt));

    return (
        <div className="grid grid-cols-4 w-full justify-evenly gap-x-6 border-t">
            <div className="px-5 py-3 border-gray-200 text-sm">
                <p className="text-gray-900">
                    {props.venta.cliente.nombre}
                </p>
            </div>
            <div className="py-3 border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {fecha.toLocaleString()}
                </p>
            </div>
            <div className="py-3 border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {fechaReembolso.toLocaleString()}
                </p>
            </div>
            <div className="py-3 border-gray-200 text-lg">
                <p className="text-red-500 whitespace-no-wrap">
                    {props.venta.precioVentaTotal.toFixed(2)}€
                </p>
            </div>
        </div>
    );
}

export default ReembolsoPage;