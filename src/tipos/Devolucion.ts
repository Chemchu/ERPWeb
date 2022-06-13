import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";
import { ProductoVendido } from "./ProductoVendido";
import { Venta } from "./Venta";

export type Devolucion = {
    _id: string,
    productosDevueltos: ProductoVendido[],
    dineroDevuelto: number,
    ventaOriginal: Venta,
    tpv: string,
    cliente: Cliente,
    trabajador: Empleado,
    modificadoPor: Empleado,
    createdAt: string,
    updatedAt: string
}