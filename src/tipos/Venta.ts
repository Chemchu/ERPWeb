import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";
import { ProductoVendido } from "./ProductoVendido";

export type Venta = {
    _id: string,
    productos: ProductoVendido[],
    numFactura: string,
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotalSinDto: number,
    precioVentaTotal: number,
    cambio: number,
    cliente: Cliente,
    vendidoPor: Empleado,
    modificadoPor: Empleado,
    tipo: string,
    descuentoEfectivo: number,
    descuentoPorcentaje: number,
    createdAt: string,
    updatedAt: string,
    tpv: string
}