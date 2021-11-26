import { JSONBuffer } from "./JsonBuffer";

export type DBSale = {
    _id: string,
    nombre: string,
    descripción: string,
    familia: string,
    precioVenta: number,
    precioCompra: number,
    iva: number,
    ean: string[],
    alta: boolean,
    tags: string[],
    img: JSONBuffer,
    cantidad: number
}