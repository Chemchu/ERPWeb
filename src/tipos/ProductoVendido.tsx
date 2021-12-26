import { Producto } from "./Producto";
import { JSONBuffer } from "./JsonBuffer";

export type ProductoVendido = {
    producto: Producto,
    cantidad: string,
    dto: string
}