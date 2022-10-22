import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Paginador } from "../../elementos/Forms/paginador";
import SkeletonCard from "../../Skeletons/skeletonCard";
import { notifyWarn } from "../../../utils/toastify";
import NuevoBoton from "../../elementos/botones/nuevoBoton";
import { Merma } from "../../../tipos/Merma";
import { FetchMermaByQuery, FetchMermas } from "../../../utils/fetches/mermasFetches";
import VerMerma from "../../modal/verMerma";
import AddMerma from "../../modal/addMerma";

const arrayNum = [...Array(16)];

const MermaPage = () => {
    const [filtro, setFiltro] = useState<string>("");
    const [Mermas, setMermas] = useState<Merma[]>([]);
    const [MermasFiltradas, setMermasFiltradas] = useState<Merma[] | undefined>();
    const [addMermaModal, setAddMermaModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isMounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        const GetData = async () => {
            try {
                setMounted(true)
                setMermas(await FetchMermas())
                setLoading(false)
            }
            catch (err) {
                console.log(err);
            }
        }

        GetData()
    }, [])

    useEffect(() => {
        if (!isMounted) { return; }
        setLoading(false);
    }, [Mermas])

    useEffect(() => {
        if (!isMounted) { return; }
        if (filtro === "") {
            setMermasFiltradas(undefined);
        }
    }, [filtro])


    const Filtrar = async (f: string) => {
        if (f === "") { return; }

        setMermasFiltradas(await FetchMermaByQuery(f));
    }

    const UpdateMermasCallback = async () => {
        setFiltro("")
        setMermas(await FetchMermas())
        setLoading(true);
    }

    return (
        <div className="flex flex-col gap-4 h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full h-auto">
                <div className="flex gap-4 w-full h-full justify-start">
                    <NuevoBoton accionEvent={() => { setAddMermaModal(true); }} />
                </div>
                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-40 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Buscar..."
                        onChange={(e) => { setFiltro(e.target.value); }} onKeyDown={async (e) => { e.key === "Enter" ? await Filtrar(filtro) : null }} />

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
            <TablaMerma Mermas={MermasFiltradas || Mermas} SetMermas={setMermas} isLoading={isLoading} UpdateMermasCallback={UpdateMermasCallback} />
            <AnimatePresence>
                {addMermaModal && <AddMerma showModal={setAddMermaModal} updateCallback={UpdateMermasCallback} />}
            </AnimatePresence>
        </div>
    );
}

const TablaMerma = (props: { Mermas: Merma[], SetMermas: Function, isLoading: boolean, UpdateMermasCallback: Function }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const elementsPerPage = 50;
    const numPages = Math.ceil(props.Mermas.length / elementsPerPage);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center border-t-2 border-x-2 rounded-t-2xl p-2 font-semibold">
                <div className="w-2/5 ">
                    Fecha
                </div>
                <div className="w-1/5 text-left ">
                    Coste
                </div>
                <div className="w-1/5 text-center">
                    Ventas
                </div>
                <div className="w-1/5 text-right ">
                    Beneficios perdidos
                </div>
            </div>
            <div className="flex flex-col w-full h-full">
                {
                    props.isLoading ?
                        <div className="flex flex-col w-full h-10 grow overflow-y-scroll">
                            {
                                arrayNum.map((_, i) => {
                                    return (
                                        <SkeletonCard key={`SkeletonProdList-${i}`} />
                                    );
                                })
                            }
                        </div>
                        :
                        <>
                            <div className="w-full h-10 grow border-2 rounded-b overflow-y-scroll">
                                {
                                    props.Mermas.length <= 0 ?
                                        <div className="flex justify-center items-center h-full w-full text-xl">
                                            No se ha encontrado registros de mermas en el sistema
                                        </div>
                                        :
                                        props.Mermas.slice((elementsPerPage * (currentPage - 1)), currentPage * elementsPerPage).map((p, index) => {
                                            return (
                                                <div key={`FilaProdTable${p._id}`}>
                                                    <FilaMerma merma={p} UpdateMermasCallback={props.UpdateMermasCallback} />
                                                </div>
                                            );
                                        })
                                }
                            </div>
                            <div className="flex pt-2 items-center justify-center">
                                <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

const FilaMerma = (props: { merma: Merma, UpdateMermasCallback: Function }) => {
    const [showModal, setModal] = useState<boolean>(false);

    return (
        <div className="hover:bg-blue-200 w-full">
            <div className="flex items-center border-b p-2 h-12 cursor-pointer" onClick={() => { setModal(true) }}>
                <div className="w-2/5">
                    {new Date(Number(props.merma.createdAt)).toLocaleString()}
                </div>
                <div className="w-1/5 text-left">
                    {props.merma.costeProductos}€
                </div>
                <div className="w-1/5 text-center">
                    {props.merma.ventasPerdidas}€
                </div>
                <div className="w-1/5 text-right ">
                    {props.merma.beneficioPerdido}€
                </div>
            </div>
            <AnimatePresence>
                {showModal && <VerMerma showModal={setModal} merma={props.merma} updateMermasCallback={props.UpdateMermasCallback} />}
            </AnimatePresence>
        </div>

    );
}

export default MermaPage;