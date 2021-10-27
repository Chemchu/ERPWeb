import { JSONBuffer } from "./JsonBuffer";

export type SelectedProduct = {
    _id: string,
    nombre: string,
    familia: string,
    precioVenta: number,
    ean: string[],
    dto: number,
    cantidad: string,
    operacionMod: string,
    img: JSONBuffer
}