import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";
import { ProductoDevuelto } from "./ProductoDevuelto";
import { Venta } from "./Venta";

export type Devolucion = {
    _id: string,
    productosDevueltos: ProductoDevuelto[],
    dineroDevuelto: number,
    ventaOriginal: Venta,
    tpv: string,
    cliente: Cliente,
    trabajador: Empleado,
    modificadoPor: Empleado,
    createdAt: string,
    updatedAt: string
}