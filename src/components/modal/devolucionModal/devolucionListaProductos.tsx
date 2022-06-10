import { useEffect, useState } from "react";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import DevolucionFila from "./devolucionFila";

const ListaDevolucionProductos = (props: { listaProductos: ProductoVendido[] }) => {
    const [productosDevolver, setDevolver] = useState<ProductoVendido[]>([]);

    return (
        <div className="overflow-y-scroll overflow-x-hidden w-full max-h-96 rounded-md p-1">
            <ul className="flex flex-col gap-2 w-full">
                {
                    props.listaProductos.map((p) => {
                        return <DevolucionFila key={`id::${p._id}`} producto={p} setProductosDevolver={setDevolver} />
                    })
                }
            </ul>
        </div>
    )
}

export default ListaDevolucionProductos;