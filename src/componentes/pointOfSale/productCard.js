function ProductCard(props) {
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

export default ProductCard;