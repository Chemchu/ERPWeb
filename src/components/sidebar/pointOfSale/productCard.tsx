import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Producto } from '../../../tipos/Producto';
import { ProductoVendido } from '../../../tipos/ProductoVendido';


export const ProductCard = React.memo((props: { Prod: Producto }) => {
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex flex-col bg-gray-200 border-gray-300 h-full border-2 shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer hover:shadow-2xl hover:bg-yellow-500 hover:border-yellow-600">
            <div className="mt-4 pl-3 pr-3">
                <div className="lg:text-base sm:text-base xs:text-sm truncate text-left text-gray-800">{props.Prod.nombre}</div>
                <div className="lg:text-base sm:text-base xs:text-sm font-semibold text-left text-gray-800">{props.Prod.precioVenta.toFixed(2)}€</div>
            </div>
        </motion.div>
    );
});

export const ProductSelectedCard = React.memo((props: { producto: Producto, setPropiedadProd: Function, cantidad: string, dto: string }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const DeleteSelectedProd = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        props.setPropiedadProd(props.producto._id, 0, props.dto);
    }
    const prod: ProductoVendido = { producto: props.producto, cantidad: props.cantidad, dto: props.dto } as ProductoVendido;

    return (
        <div key={`${props.producto._id}`} >
            <div className="flex flex-col flex-grow h-full w-full cursor-pointer" onClick={() => { setOpen(!isOpen) }}>
                <div className={`flex justify-start ${isOpen ? "bg-blue-300 " : "bg-gray-200 hover:bg-gray-300 "} rounded-lg h-full w-full gap-x-4 p-2`}>
                    {/* <div className="self-center font-semibold">{prod.cantidad}</div> */}

                    <input className="bg-white w-8 h-8 rounded-lg text-center self-center font-semibold shadow focus:outline-none focus:shadow-lg text-sm" type="text" inputMode="numeric"
                        value={prod.cantidad}
                        onClick={(e) => { e.stopPropagation() }}
                        onChange={(e) => {
                            props.setPropiedadProd(props.producto._id, e.target.value, props.dto);
                        }} />

                    <div className="flex flex-row">
                        <div className="flex self-center justify-start">
                            <div className="grid grid-rows-2 text-left">
                                <p className="text-sm truncate font-semibold">{props.producto.nombre}</p>
                                {
                                    isNaN(Number(prod.dto)) || Number(prod.dto) == 0 ?
                                        <p className="text-xs block">{(props.producto.precioVenta * Number(prod.cantidad)).toFixed(2)}€</p>
                                        :
                                        <div className="flex-grow-0">
                                            <p className="text-xs inline-block line-through text-red-700">{(props.producto.precioVenta * Number(prod.cantidad)).toFixed(2)}€</p>
                                            <span className="pl-2 text-sm font-semibold inline-block">{((props.producto.precioVenta * Number(prod.cantidad)) * (1 - (Number(prod.dto) / 100))).toFixed(2)}€</span>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>

                    <button id={prod.producto._id} className="ml-auto self-center hover:text-red-700" onClick={DeleteSelectedProd}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                {isOpen &&
                    <div className="flex mt-1 p-2 gap-4 bg-blue-200 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <div className="font-semibold">
                                Cantidad
                            </div>

                            <div className="flex gap-2">
                                <motion.button whileTap={{ scale: 0.9 }} id={props.producto._id} className="rounded-lg text-center w-8 h-8 py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.setPropiedadProd(props.producto._id, (Number(props.cantidad) + 1).toString(), props.dto);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </motion.button>


                                <motion.button whileTap={{ scale: 0.9 }} className="rounded-lg text-center w-8 h-8 py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.setPropiedadProd(props.producto._id, (Number(props.cantidad) - 1).toString(), props.dto);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                    </svg>
                                </motion.button>
                            </div>

                        </div>

                        <div className="flex flex-col self-start ml-auto font-semibold">
                            <div>Descuento</div>
                            <div className="inline-block align-middle grid-rows-1 self-end">
                                <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-10 h-6 shadow"
                                    value={prod.dto} onClick={(e) => { e.stopPropagation(); }} onChange={(e) => {
                                        e.stopPropagation();
                                        props.setPropiedadProd(props.producto._id, props.cantidad, e.target.value);
                                    }} />
                                <> %</>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div >
    );
});