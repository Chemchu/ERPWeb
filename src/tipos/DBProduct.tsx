import { JSONBuffer } from "./JsonBuffer";

export type Producto = {
    _id: string,
    nombre: string,
    descripcion?: string,
    familia: string,
    precioVenta: number,
    precioCompra: number,
    iva: number,
    ean: string[],
    alta: boolean,
    tags: string[],
    img: JSONBuffer,
    cantidad: number,
    promociones?: string[],
}