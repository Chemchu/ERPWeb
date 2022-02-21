import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";
import { ProductoVendido } from "./ProductoVendido";

export type Venta = {
    _id: string,
    productos: ProductoVendido[],
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotal: number,
    cambio: number,
    cliente: Cliente,
    vendidoPor: Empleado,
    modificadoPor: string,
    tipo: string,
    descuentoEfectivo: number,
    descuentoPorcentaje: number,
    createdAt: string,
    updatedAt: string
}