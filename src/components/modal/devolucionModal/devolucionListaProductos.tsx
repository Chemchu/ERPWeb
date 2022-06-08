import { ChangeEventHandler, useState } from "react";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { IsPositiveIntegerNumber } from "../../../utils/validator";

const ListaDevolucionProductos = (props: { listaProductos: ProductoVendido[] }) => {
    const [cantidad, setCantidad] = useState<string>("");

    const ValueInput = (e: string) => {
        console.log(IsPositiveIntegerNumber(e));

        if (!IsPositiveIntegerNumber(e)) { return }

        setCantidad(e)
    }

    const AddCantidad = () => {
        setCantidad((cantidad) => String(Number(cantidad) + 1))
    }

    const SubCantidad = () => {
        if (Number(cantidad) <= 0) { return }
        setCantidad((cantidad) => String(Number(cantidad) - 1))
    }

    return (
        <div className="overflow-y-scroll overflow-x-hidden w-full max-h-96 border-2 border-gray-400 rounded-md p-1">
            <ul className="flex flex-col gap-2 w-full">
                {
                    props.listaProductos.map((producto) => {
                        return (
                            <li key={`id::${producto._id}`} className="flex gap-2 items-center justify-start border-2 rounded-md px-2 py-1">
                                <input type="checkbox" name={`checkbox::${producto._id}`} id={`idInput::${producto._id}`} />
                                <span className="w-full">
                                    {producto.nombre}
                                </span>
                                <div className="flex gap-1 items-center">
                                    <button className="bg-blue-400 hover:bg-blue-500 rounded w-10 h-8 text-white font-bold" onClick={SubCantidad}>-</button>
                                    <input type="text" className="w-12 xl:w-20 border-2 border-blue-400 focus:outline-blue-500 rounded-md text-center" value={cantidad} onChange={(e) => ValueInput(e.target.value)} />
                                    <button className="bg-blue-400 hover:bg-blue-500 rounded w-10 h-8 text-white font-bold" onClick={AddCantidad}>+</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ListaDevolucionProductos;