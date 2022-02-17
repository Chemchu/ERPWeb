import { motion } from "framer-motion";
import React, { useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { CheckBox } from "../../Forms/checkbox";
import { Paginador } from "../../Forms/paginador";
import { ConvertBufferToBase64 } from "../../../utils/validator";
import { ModalEditarProducto } from "../../modal";
import SkeletonCard from "../../Skeletons/skeletonCard";

export const ProductPage = (props: { productos: Producto[], serverUp: boolean }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [allChecked, setAllChecked] = useState<boolean>(false);

    const elementsPerPage = 10;
    const numPages = Math.ceil(props.productos.length / elementsPerPage);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
        setAllBoxesChecked(false);
    }

    function range(start: number, end: number) {
        if (start >= end) return [];

        let res: number[] = [];
        for (var i = start; i <= end; i++) {
            res.push(i);
        }
        return res;
    }

    const setAllBoxesChecked = (checked: boolean) => {
        setAllChecked(checked);

        if (checked) {
            let indexes = range(0, elementsPerPage - 1);
            setSelectedProducts(indexes);
        }
        else {
            setSelectedProducts([]);
        }
    }

    const variants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
        exit: {
            y: '-100vh',
            opacity: 0,
            transition: {
                ease: [0.87, 0, 0.13, 1],
                duration: 1
            }
        },
        exitFadeOut: {
            opacity: 0,
            transition: {
                ease: "easeInOut",
                duration: 1
            }
        },
    }

    const arrayNum = [...Array(8)];

    return (
        <div className="flex flex-col h-screen w-full antialiased px-8 py-8" >
            <h2 className="text-2xl leading-tight">
                Productos
            </h2>
            <div className="flex mb-1 sm:mb-0 justify-between w-full pt-4">
                <div className="flex gap-4 self-center">
                    <button className="flex flex-shrink-0 gap-2 px-4 py-2 text-base font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-blue-200">
                        Añadir
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    {
                        selectedProducts.length > 0 && <motion.button initial={variants.initial} animate={variants.animate} exit={variants.exitFadeOut} className="flex flex-shrink-0 gap-2 px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-200">
                            Borrar
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </motion.button>
                    }
                    {
                        selectedProducts.length > 0 && <motion.button initial={variants.initial} animate={variants.animate} exit={variants.exitFadeOut} className="flex flex-shrink-0 gap-2 px-4 py-2 text-base font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-200"
                            onClick={() => { setAllBoxesChecked(false) }}>
                            Cancelar
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </motion.button>
                    }
                </div>
                <div className="text-end">
                    <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                        <input type="text" id="form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Producto a buscar..." />
                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200">
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full w-full mt-4 pb-20">
                <div className={`bg-white grid ${selectedProducts.length > 0 ? "grid-cols-6" : "grid-cols-5"} justify-evenly rounded-t-xl border-b-2`}>
                    {selectedProducts.length > 0 && <div className="px-5 py-3  text-gray-800 text-left text-sm font-semibold">
                        <CheckBox isChecked={allChecked} setChecked={setAllBoxesChecked} />
                    </div>}
                    <div className={`${selectedProducts.length > 0 ? "" : "px-5"} py-3 text-gray-800 text-left text-sm font-semibold`}>
                        Nombre
                    </div>
                    <div className="py-3  text-gray-800 text-left text-sm font-semibold">
                        Familia
                    </div>
                    <div className="py-3  text-gray-800 text-left text-sm font-semibold">
                        Precio
                    </div>
                    <div className="py-3  text-gray-800 text-left text-sm font-semibold">
                        Cantidad
                    </div>
                </div>
                <div className="bg-white flex flex-col border-b-4 overflow-scroll overflow-x-hidden">
                    {
                        props.productos.length <= 0 ?
                            arrayNum.map((n, i) => {
                                return (
                                    <SkeletonCard key={`SkeletonProdList-${i}`} />
                                );
                            })
                            :
                            props.productos.slice((elementsPerPage * (currentPage - 1)), currentPage * elementsPerPage).map((p, index) => {
                                return (
                                    <div key={`FilaProdTable${p._id}`}>
                                        <FilaProducto listIndex={index} selectedProductos={selectedProducts} setAllChecks={setAllChecked} producto={p} setSelection={setSelectedProducts} />
                                    </div>
                                );
                            })
                    }
                </div>
                <div className="bg-white flex flex-row p-5 items-center justify-center rounded-b-xl shadow-lg">
                    <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
                </div>
            </div>
        </div>
    );
}

const FilaProducto = (props: { listIndex: number, producto: Producto, selectedProductos: number[], setSelection: Function, setAllChecks: Function }) => {
    const [showModal, setModal] = useState<boolean>(false);

    const CloseModalProducto = () => {
        setModal(false);
    }

    const SetCheckBox = (isChecked: boolean) => {
        if (isChecked) {
            props.setSelection([...props.selectedProductos, props.listIndex]);
        }
        else {
            props.setAllChecks(isChecked);
            props.setSelection(props.selectedProductos.filter(p => p != props.listIndex));
        }
    }

    return (
        <div className="hover:bg-gray-200 cursor-pointer">
            <div className="grid grid-cols-5 w-full justify-evenly gap-x-6 border-t"
                onClick={() => { props.selectedProductos.includes(props.listIndex) ? props.setSelection(props.selectedProductos.filter(p => p != props.listIndex)) : props.setSelection([...props.selectedProductos, props.listIndex]) }} >
                <div className="flex px-5 py-5 border-gray-200 text-sm">
                    {
                        props.selectedProductos.length > 0 && <div className="flex pr-2">
                            {
                                props.selectedProductos.includes(props.listIndex) ?
                                    <CheckBox isChecked={true} setChecked={SetCheckBox} />
                                    :
                                    <CheckBox isChecked={false} setChecked={SetCheckBox} />
                            }
                        </div>
                    }
                    <p className="text-gray-900 whitespace-no-wrap inline-block">
                        {props.producto.nombre}
                    </p>
                </div>
                <div className="flex pr-6 self-center border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {props.producto.familia}
                    </p>
                </div>
                <div className="flex pr-6 self-center border-gray-200 text-base">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {props.producto.precioVenta}€
                    </p>
                </div>
                <div className="flex pr-6 self-center border-gray-200 text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold ${props.producto.cantidad > 0 ? " text-green-900" : "text-red-900"} leading-tight`}>
                        <span aria-hidden="true" className={`absolute inset-0 ${props.producto.cantidad > 0 ? "bg-green-200" : "bg-red-200"} opacity-50 rounded-full`}>
                        </span>
                        <span className="relative">
                            {props.producto.cantidad ? props.producto.cantidad : 0}
                        </span>
                    </span>
                </div>
                <button className="flex pr-6 justify-end self-center gap-2 border-gray-200 text-base" onClick={(e) => { e.stopPropagation(); setModal(true); }}>
                    Editar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </div>
            {showModal && <ModalEditarProducto handleClose={CloseModalProducto} product={props.producto} />}
        </div>

    );
}
