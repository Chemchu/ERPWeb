import { Producto } from "./Producto";
import { OpModificacionProducto } from "./Enums/OpModificaciones";
import { JSONBuffer } from "./JsonBuffer";

export type ProductoVendido = {
    producto: Producto,
    cantidad: string,
    dto: string
}