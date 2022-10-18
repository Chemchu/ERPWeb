import { useEffect, useState } from "react";
import { ProductoVendido } from "../../../../../tipos/ProductoVendido";
import DevolucionFila from "../devolucionFila";

const ListaDevolucionProductos = (props: { listaProductos: ProductoVendido[], productosDevolver: Map<string, number>, setProductosDevolver: Function }) => {
    return (
        <div className="overflow-y-scroll overflow-x-hidden w-full max-h-96 rounded-md p-1">
            <ul className="flex flex-col gap-2 w-full">
                {
                    props.listaProductos.map((p) => {
                        return <DevolucionFila key={`id::${p._id}`} producto={p} productosMarcadosMap={props.productosDevolver} setProductosMarcados={props.setProductosDevolver} />
                    })
                }
            </ul>
        </div>
    )
}

export default ListaDevolucionProductos;