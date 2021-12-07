import { useSelectedProducts } from './productsContext';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Producto } from '../../../tipos/DBProduct';
import { SelectedProduct } from '../../../tipos/SelectedProduct';
import { OpModificacionProducto } from '../../../tipos/Enums/OpModificaciones';
import { ConvertBufferToBase64 } from '../../../pages/api/validator';
import { ProductoEnCarrito } from '../../../tipos/ProductoEnCarrito';


export const ProductCard = (props: Producto) => {
    const [productImage, setProductImage] = useState<string>(`data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.img)}`);

    const SetDefaultImage = () => {
        setProductImage("data:image/png;base64,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")
    }

    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex flex-col bg-gray-200 border-gray-300 h-full border-2 shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer hover:shadow-2xl hover:bg-yellow-500 hover:border-yellow-600">
            <div className="overflow-x-hidden rounded-2xl">
                <img className="bg-white rounded-2xl w-full object-cover h-20 xl:h-44" src={productImage} onError={SetDefaultImage} />
            </div>
            <div className="mt-4 pl-3 pr-3">
                <div className="lg:text-base sm:text-base xs:text-sm truncate text-left text-gray-800">{props.nombre}</div>
                <div className="lg:text-base sm:text-base xs:text-sm font-semibold text-left text-gray-800">{props.precioVenta.toFixed(2)}€</div>
            </div>
        </motion.div>
    );
}

export const ProductSelectedCard = React.memo((props: { producto: Producto, setPropiedadProd: Function, cantidad: number, dto: number }) => {
    const [productImage, setProductImage] = useState<string>(`data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.producto.img)}`);
    const [isOpen, setOpen] = useState<boolean>(false);

    const SetDefaultImage = () => {
        setProductImage("data:image/png;base64,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")
    }

    const DeleteSelectedProd = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        props.setPropiedadProd(props.producto._id, 0, props.dto);
    }

    {
        let prod: ProductoEnCarrito = { producto: props.producto, cantidad: props.cantidad, dto: props.dto } as ProductoEnCarrito;
        return (prod.cantidad > 0) ?
            <div className="flex flex-col flex-grow h-full w-full cursor-pointer" onClick={() => { setOpen(!isOpen) }}>
                <div className={`flex justify-start ${isOpen ? "bg-blue-300 " : "bg-gray-200 hover:bg-gray-300 "} rounded-lg h-full w-full gap-x-4 p-2`}>
                    {/* <div className="self-center font-semibold">{prod.cantidad}</div> */}

                    <input className="bg-white w-8 h-8 rounded-lg text-center self-center font-semibold shadow focus:outline-none focus:shadow-lg text-sm" type="text" inputMode="numeric" value={prod.cantidad}
                        onClick={(e) => { e.stopPropagation() }}
                        onChange={(e) => {
                            props.setPropiedadProd(props.producto._id, e.target.value, props.dto);
                        }} />

                    <div className="flex flex-row">
                        <img src={productImage} className="self-center rounded-lg h-6 w-6 md:h-10 md:w-10 bg-white shadow mr-2" onError={SetDefaultImage} />
                        <div className="flex self-center justify-start">
                            <div className="grid grid-rows-2 text-left">
                                <p className="text-sm truncate font-semibold">{props.producto.nombre}</p>
                                {
                                    isNaN(prod.dto) || prod.dto == 0 ?
                                        <p className="text-xs block">{(props.producto.precioVenta * prod.cantidad).toFixed(2)}€</p>
                                        :
                                        <div className="flex-grow-0">
                                            <p className="text-xs inline-block line-through text-red-700">{(props.producto.precioVenta * prod.cantidad).toFixed(2)}€</p>
                                            <span className="pl-2 text-sm font-semibold inline-block">{((props.producto.precioVenta * prod.cantidad) * (1 - (prod.dto / 100))).toFixed(2)}€</span>
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
                                        props.setPropiedadProd(props.producto._id, props.cantidad + 1, props.dto);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </motion.button>


                                <motion.button whileTap={{ scale: 0.9 }} className="rounded-lg text-center w-8 h-8 py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.setPropiedadProd(props.producto._id, props.cantidad - 1, props.dto);
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
            :
            null
    }
});