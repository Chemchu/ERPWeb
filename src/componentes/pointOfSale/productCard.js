function ProductCard(props) {
    return(
        <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer hover:shadow-lg">
            <div className="overflow-x-hidden rounded-2xl relative">
                <img className="h-40 rounded-2xl w-full object-cover" src={props.imagenProducto}/>
            </div>
            <div className="mt-4 pl-3 pr-3 mb-2 flex justify-between ">
                <p className="text-lg font-semibold text-gray-900 mb-0">{props.nombreProducto}</p>
                <p className="text-lg text-gray-800 mt-0">{props.precioProducto}€</p>
            </div>
        </div>
    );
}

export default ProductCard;