import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DBProduct } from "../../../tipos/DBProduct";
import { JSONBuffer } from "../../../tipos/JsonBuffer";
import { ConvertBufferToBase64 } from "../../../Validators";

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
  }

export const ProductPage = () => {
    const [productos, setProductos] = useState<DBProduct[]>([{} as DBProduct]);
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
            <div className="text-center">
                <div className="flex mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-2xl leading-tight">
                        Productos
                    </h2>
                    <div className="text-end">
                        <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                            <div className=" relative ">
                                <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Producto a buscar..."/>
                            </div>
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                Filtrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full mt-4 pb-10">
                <div className="bg-white grid grid-cols-4 justify-evenly border-b-2 rounded-t-xl ">
                    <div className="px-5 py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                        Nombre
                    </div>
                    <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                        Familia
                    </div>
                    <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                        Precio
                    </div>
                    <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
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
                    <Paginador numPages={numPages} paginaActual={selectedPage} cambiarPaginaActual={setPaginaActual}/>
                </div>
            </div>
        </motion.div>
    );
}

const Paginador = (props: {numPages: number, paginaActual:number, cambiarPaginaActual: Function}) => {
    return(
        <div className="flex items-center">
            <button className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                onClick={() => {props.cambiarPaginaActual(props.paginaActual - 1);}}>
                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                    </path>
                </svg>
            </button>
            {
                [...Array(props.numPages).keys()].map((n) => {
                    return(
                        <button key={`paginador${n}`} className={`w-full px-4 py-2 border-t border-b text-base ${n + 1 == props.paginaActual ? "text-blue-700 font-semibold bg-gray-200" : "text-gray-600 hover:bg-gray-100 bg-white" }`}
                            onClick={() => {props.cambiarPaginaActual(n+1);}}>
                            {n + 1}
                        </button>
                    );
                })
            }
            <button className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                onClick={() => {props.cambiarPaginaActual(props.paginaActual + 1);}}>
                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                    </path>
                </svg>
            </button>
        </div>
    );
}

const FilaProducto = (props: {nombre: string, familia: string, precio: number, cantidad: number, img: JSONBuffer}) => {
    const imagen = `data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.img)}`

    return(
        <div className="grid grid-cols-4 w-full justify-evenly">
            <div className="px-5 py-5 border-t border-gray-200 text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a className="block relative">
                            <img alt="profil" src={imagen} className="mx-auto object-cover rounded-full h-10 w-10 "/>
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {props.nombre}
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-5 border-t border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.familia}
                </p>
            </div>
            <div className="py-5 border-t border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.precio}€
                </p>
            </div>
            <div className="py-5 border-t border-gray-200 text-sm">
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