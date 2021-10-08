function ProductCard(props) {
    return(
        <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
            <div className="overflow-x-hidden rounded-2xl relative">
                <img className="h-40 rounded-2xl w-full object-cover" src={props.imagenProducto}/>
            </div>
            <div className="mt-4 pl-2 mb-2 flex justify-between ">
                <div>
                <p className="text-lg font-semibold text-gray-900 mb-0">{props.nombreProducto}</p>
                <p className="text-md text-gray-800 mt-0">{props.precioProducto}</p>
                </div>
                <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                </div>
            </div>
        </div>
    );
}

export default ProductCard;