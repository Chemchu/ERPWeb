import { useState } from "react";
import {useSelectedProducts} from './productsContext';

function ConvertBufferToBase64(buffer) {
    var res = ""
    if(buffer) {
        return Buffer.from(buffer.data, 'binary').toString('base64');
    }
    else return res;
}

export const ProductCard = (props) => {
    return(
        <div className="relative max-w-sm min-w-[340px] max-h-sm min-h-[100px]bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer hover:shadow-2xl">
            <div className="overflow-x-hidden rounded-2xl relative">
                <img className="h-40 rounded-2xl w-full object-cover " src={`data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.imagenProducto)}`}/>
            </div>
            <div className="mt-4 pl-3 pr-3 mb-2 flex justify-between ">
                <p className="lg:text-lg sm:text-sm xs:text-xs font-semibold text-gray-800 mb-0">{props.nombreProducto}</p>
                <p className="lg:text-lg sm:text-sm xs:text-xs font-semibold text-gray-800 mt-0">{props.precioProducto}€</p>
            </div>
        </div>
    );
}

export const ProductSelectedCard = (props) => {
    const [productos, AddProductos] = useSelectedProducts();

    {
        let prod = productos.filter(p => p._id == props.id)[0];
        return prod.cantidad > 0 || prod.valorEscrito ?
        <div className="select-none mb-3 bg-gray-200 rounded-lg w-full py-2 px-2 flex justify-center">
            <img src={`data:image/(png|jpeg);base64,${ConvertBufferToBase64(props.img)}`} className="rounded-lg h-10 w-10 bg-white shadow mr-2" />
            <div className="flex-grow">
            <h5 className="text-sm">{props.nombreProducto}</h5>
            <p className="text-xs block">{props.precioVenta} €</p>
            </div>
            <div className="py-1">
            <div className="w-28 grid grid-cols-3 gap-2 ml-2">
                <button className="rounded-lg text-center py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none" 
                onClick={() => {
                    AddProductos({_id: props.id, cantidad: parseInt(- 1), valorEscrito: false});
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
                </button>
                <input type="text" inputMode="numeric" value={productos.find(p => p._id ==props.id).cantidad} className="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm"  
                    onChange={(e) =>{ AddProductos({_id: props.id, cantidad: parseInt(e.target.value), valorEscrito: true});}} />
                <button id={props.id} className="rounded-lg text-center py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none" 
                onClick={() => {
                    AddProductos({_id: props.id, cantidad: parseInt(1), valorEscrito: false});
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                </button>
            </div>
            </div>
        </div>
        : 
        null
    }
}