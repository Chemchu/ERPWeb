import { Producto } from "./DBProduct";
import { OpModificacionProducto } from "./Enums/OpModificaciones";
import { JSONBuffer } from "./JsonBuffer";

export type ProductoEnCarrito = {
    producto: Producto,
    cantidad: string,
    dto: string
}