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

    return(
        <motion.div initial={variants.initial} animate={variants.animate} exit={variants.exit} className="container mx-auto sm:px-8 ">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
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
                <div className="py-4 overflow-x-auto">
                    <div className="flex flex-col h-full w-full">
                        <div className="flex justify-evenly bg-white rounded-lg">
                            <div className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm font-semibold">
                                Nombre
                            </div>
                            <div className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm font-semibold">
                                Familia
                            </div>
                            <div className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm font-semibold">
                                Precio
                            </div>
                            <div className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm font-semibold">
                                Cantidad
                            </div>
                            <div className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm font-semibold">
                            </div>
                        </div>
                        <div className="bg-red-500">
                            {productos.slice(0,6).map((p) => {
                                return(
                                    <FilaProducto key={`FilaProdTable${p._id}`} img={p.img} nombre={p.nombre} familia={p.familia} precio={p.precioVenta} cantidad={p.cantidad} />
                                );
                            })}
                        </div>
                        <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                                <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                                <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                    1
                                </button>
                                <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    2
                                </button>
                                <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                    3
                                </button>
                                <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    4
                                </button>
                                <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="inline-block min-w-full shadow rounded-lg ">
                        <table className="min-w-full min-h-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Familia
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {productos.slice(0,10).map((p) => {
                                    return(
                                        <FilaProducto key={`FilaProdTable${p._id}`} img={p.img} nombre={p.nombre} familia={p.familia} precio={p.precioVenta} cantidad={p.cantidad} />
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                            <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                1
                            </button>
                            <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                2
                            </button>
                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                3
                            </button>
                            <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                4
                            </button>
                            <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    </div> */}
                </div>
            </div>
        </motion.div>
    );
}

const FilaProducto = (props: {nombre: string, familia: string, precio: number, cantidad: number, img: JSONBuffer}) => {
    const imagen = `data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.img)}`

    return(
        <div className="grid grid-cols-5 w-full justify-evenly border-t-2">
            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.familia}
                </p>
            </div>
            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.precio}
                </p>
            </div>
            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                    </span>
                    <span className="relative">
                        {props.cantidad ? props.cantidad : 0}
                    </span>
                </span>
            </div>
            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Editar
                </a>
            </div>
        </div>
    );
}