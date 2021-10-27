import {useSelectedProducts} from './productsContext';
import { motion } from 'framer-motion';
import React from 'react';
import { DBProduct } from '../../tipos/DBProduct';
import { SelectedProduct } from '../../tipos/SelectedProduct';
import { JSONBuffer } from '../../tipos/JsonBuffer';

function ConvertBufferToBase64(buffer: JSONBuffer): string {
    var res = ""
    if(buffer) {
        res = Buffer.from(buffer.data).toString('base64');
    }

    return res;
}


export const ProductCard: React.FC<DBProduct> = (props) => {
    return(
        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="relative max-w-sm min-w-[340px] max-h-sm min-h-[100px]bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer hover:shadow-2xl">
            <div className="overflow-x-hidden rounded-2xl relative">
                <img className="h-40 rounded-2xl w-full object-cover " src={`data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.img)}`}/>
            </div>
            <div className="mt-4 pl-3 pr-3 mb-2 flex justify-between ">
                <p className="lg:text-lg sm:text-sm xs:text-xs font-semibold text-gray-800 mb-0">{props.nombre}</p>
                <p className="lg:text-lg sm:text-sm xs:text-xs font-semibold text-gray-800 mt-0">{props.precioVenta}€</p>
            </div>
        </motion.div>
    );
}

export const ProductSelectedCard: React.FC<SelectedProduct> = (props) => {
    const [productos, AddProductos] = useSelectedProducts();

    {
        let prod = productos.filter((p: SelectedProduct) => p._id == props._id)[0];
        return (parseInt(prod.cantidad) > 0 || prod.cantidad == "") ?
            <div className="select-none mb-3 bg-gray-200 rounded-lg w-full py-2 px-2 flex justify-center">
                <img src={`data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.img)}`} className="rounded-lg h-10 w-10 bg-white shadow mr-2" />
                <div className="flex-grow">
                    <h5 className="text-sm">{props.nombre}</h5>
                    {
                        isNaN(prod.dto) || prod.dto == 0 ? 
                        <p className="text-xs block">{(props.precioVenta * parseInt(prod.cantidad)).toFixed(2)}€</p>
                        :
                        <div className="flex-grow-0">
                            <p className="text-xs inline-block line-through">{(props.precioVenta * parseInt(prod.cantidad)).toFixed(2)}€</p>
                            <span className="pl-2 text-sm font-semibold inline-block">{((props.precioVenta * parseInt(prod.cantidad)) * (1 - (prod.dto/100))).toFixed(2) }€</span>
                        </div>
                    }
                </div>

                <div className="py-2 inline-block align-middle">
                    <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-10 h-6 shadow" value={prod.dto} onChange={(e) => AddProductos({_id: props._id, cantidad: prod.cantidad, valorEscrito: true, dto: e.target.value})} />
                    <> %</>
                </div>
                
                <div className="py-1">
                    <div className="w-28 grid grid-cols-3 gap-2 ml-2">
                        
                        <motion.button whileTap={{scale: 0.9}} className="rounded-lg text-center py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none" 
                        onClick={() => {
                            AddProductos({_id: prod._id, cantidad: "-1", dto: prod.dto, nombre: prod.nombre, 
                            precioVenta: prod.precioVenta, ean: prod.ean, familia: prod.familia, img: prod.img, operacionMod: "resta"} as SelectedProduct);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                        </motion.button>
                        <input type="text" inputMode="numeric" value={productos.filter((p:SelectedProduct) => p._id ==props._id)[0].cantidad} className="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm"  
                            onChange={(e) =>{ AddProductos({_id: prod._id, cantidad: e.target.value, dto: prod.dto, nombre: prod.nombre, 
                            precioVenta: prod.precioVenta, ean: prod.ean, familia: prod.familia, img: prod.img, operacionMod: "escritura"} as SelectedProduct);}} />

                        <motion.button whileTap={{scale: 0.9}} id={props._id} className="rounded-lg text-center py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none" 
                        onClick={() => {
                            AddProductos({_id: prod._id, cantidad: "1", dto: prod.dto, nombre: prod.nombre, 
                                            precioVenta: prod.precioVenta, ean: prod.ean, familia: prod.familia, img: prod.img, operacionMod: "suma"} as SelectedProduct);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>
        :
        null
    }
}