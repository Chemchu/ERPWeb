import { OpModificacionProducto } from "./Enums/OpModificaciones";
import { JSONBuffer } from "./JsonBuffer";

export type SelectedProduct = {
    _id: string,
    nombre: string,
    familia: string,
    precioVenta: number,
    ean: string[],
    dto: number,
    cantidad: string,
    operacionMod: OpModificacionProducto,
    img: JSONBuffer
}