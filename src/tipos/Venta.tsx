import { ProductoVendido } from "./ProductoVendido";

export type Venta = {
    _id: string,
    productos: ProductoVendido[],
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotal: number,
    cambio: number,
    clienteID: string,
    vendidoPor: string,
    modificadoPor: string,
    tipo: string,
    descuentoEfectivo: number,
    descuentoPorcentaje: number,
    createdAt: string,
    updatedAt: string
}