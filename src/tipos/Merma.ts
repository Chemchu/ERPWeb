import { Empleado } from "./Empleado"
import { NuevoProductoMermado, ProductoMermado } from "./ProductoMermado"

export type Merma = {
    _id: string,
    productos: ProductoMermado[],
    creadoPor: Empleado,
    costeProductos: number,
    ventasPerdidas: number,
    beneficioPerdido: number,
    createdAt: string,
    updatedAt: string
}

export type NuevaMerma = {
    productos: NuevoProductoMermado[],
    empleadoId: string,
}
