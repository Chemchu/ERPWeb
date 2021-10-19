import { useState } from "react";
import {useSelectedProducts} from './productsContext';

export const ProductCard = (props) => {
    return(
        <div className="relative max-w-sm min-w-[340px] max-h-sm min-h-[100px]bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer hover:shadow-2xl">
            <div className="overflow-x-hidden rounded-2xl relative">
                <img className="h-40 rounded-2xl w-full object-cover " src={props.imagenProducto}/>
            </div>
            <div className="mt-4 pl-3 pr-3 mb-2 flex justify-between ">
                <p className="lg:text-lg sm:text-sm xs:text-xs font-semibold text-gray-800 mb-0">{props.nombreProducto}</p>
                <p className="lg:text-lg sm:text-sm xs:text-xs font-semibold text-gray-800 mt-0">{props.precioProducto}€</p>
            </div>
        </div>
    );
}


export const ProductSelectedCard = (props) => {
    const [cantidad, setCantidad] = useState(1);
    const [productos, SetProductos] = useSelectedProducts();

    {return cantidad <= 0 ? null
        : 
        <div className="select-none mb-3 bg-gray-200 rounded-lg w-full py-2 px-2 flex justify-center">
            <img alt="" className="rounded-lg h-10 w-10 bg-white shadow mr-2" />
            <div className="flex-grow">
            <h5 className="text-sm">{props.nombreProducto}</h5>
            <p className="text-xs block">{props.precioVenta}</p>
            </div>
            <div className="py-1">
            <div className="w-28 grid grid-cols-3 gap-2 ml-2">
                <button className="rounded-lg text-center py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none" 
                onClick={() => {
                    var prod = productos.filter(p => p._id == props._id);
                    prod.cantidad = parseInt(prod.cantidad) - 1;
                    SetProductos(prod);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
                </button>
                <input type="text" inputMode="numeric" className="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm"  
                    onChange={(e) =>{ 
                        console.log(productos);
                        var prod = productos.filter(p => p._id == props._id);
                        prod.cantidad = parseInt(e.target.value);
                        SetProductos(prod);
                    }} />
                <button className="rounded-lg text-center py-1 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none" onClick={() => setCantidad(cantidad + parseInt(1))}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                </button>
            </div>
            </div>
        </div>
    }
}