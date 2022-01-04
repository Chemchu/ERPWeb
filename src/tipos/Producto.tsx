import { JSONBuffer } from "./JsonBuffer";

export type Producto = {
    _id: string,
    nombre: string,
    proveedor: string
    familia: string,
    precioVenta: number,
    precioCompra: number,
    iva: number,
    margen: number
    ean: string,
    alta: boolean,
    img: JSONBuffer,
    cantidad: number,
    cantidadRestock: number
    promociones?: string[],
}