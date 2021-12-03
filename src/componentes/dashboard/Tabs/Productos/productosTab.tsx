import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DBProduct } from "../../../../tipos/DBProduct";
import { JSONBuffer } from "../../../../tipos/JsonBuffer";
import { ConvertBufferToBase64 } from "../../../../Validators";
import { Paginador } from "../../../paginador";

const variants= {
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
        transition:{ 
            ease: [0.87, 0, 0.13, 1], 
            duration: 1
        }
    },
    exitFadeOut: {
        opacity: 0,
        transition:{ 
            ease: "easeInOut", 
            duration: 1
        }
    },
  }

export const ProductPage = () => {
    const [productos, setProductos] = useState<DBProduct[]>([]);
    const [selectedProductss, addProducts] = useState<number>(0);
    const [selectedPage, setPage] = useState<number>(1);

    const elementsPerPage = 10;
    const numPages = Math.ceil(productos.length / elementsPerPage);

    useEffect(() => {
        const fetchProductos = () => {
            const erpBackURL = process.env.REACT_APP_ERP_BACKURL;
            axios.get(`${erpBackURL}api/productos`).then(
                (res) => {          
                    setProductos([...res.data.message]);
                }
            );
        };
        fetchProductos();
    }, []);

    const setPaginaActual = (page: number) => {
        if(page < 1) { return; }
        if(page > numPages) { return; }

        setPage(page);
    }

    return(
        <motion.div className="flex flex-col h-screen antialiased mx-8 py-8" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
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
                    {selectedProductss > 0 && <motion.button initial={variants.initial} animate={variants.animate} exit={variants.exitFadeOut} className="flex flex-shrink-0 gap-2 px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-200">
                        Borrar
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.button>}
                </div>
                <div className="text-end">
                    <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                        <input type="text" id="form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Producto a buscar..."/>
                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200">
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full mt-4 pb-20">
                <div className="bg-white grid grid-cols-4 justify-evenly rounded-t-xl border-b-2">
                    <div className="px-5 py-3  text-gray-800 text-left text-sm font-semibold">
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
                    {productos.slice((elementsPerPage * (selectedPage - 1)), selectedPage * elementsPerPage).map((p) => {
                        return(
                            <div key={`FilaProdTable${p._id}`}>
                                <FilaProducto img={p.img} nombre={p.nombre} familia={p.familia} precio={p.precioVenta} cantidad={p.cantidad} />

                            </div>
                        );
                    })}                      
                </div>
                <div className="bg-white flex flex-row p-5 items-center justify-center rounded-b-xl shadow-lg">
                    <Paginador numPages={numPages} paginaActual={selectedPage} maxPages={10} cambiarPaginaActual={setPaginaActual}/>
                </div>
            </div>
        </motion.div>
    );
}

const FilaProducto = (props: {nombre: string, familia: string, precio: number, cantidad: number, img: JSONBuffer}) => {
    const imagen = `data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.img)}`
    const [prodSelected, setSelected] = useState<boolean>(false);

    return(
        <div className="grid grid-cols-4 w-full justify-evenly gap-x-6 border-t" onClick={() => {/* Abrir modal */}} onDoubleClick={() => {/* Abrir selección */ }} >            
            <div className="flex px-5 py-5 border-gray-200 text-sm">
                {prodSelected && <div>Check</div>}
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a className="block relative">
                            <img alt="profil" src={imagen} className="mx-auto object-cover rounded-full h-10 w-10 "/>
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap inline-block">
                            {props.nombre}
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-5 border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.familia}
                </p>
            </div>
            <div className="py-5 border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.precio}€
                </p>
            </div>
            <div className="py-5 border-gray-200 text-sm">
                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                    </span>
                    <span className="relative">
                        {props.cantidad ? props.cantidad : 0}
                    </span>
                </span>
            </div>
        </div>
    );
}