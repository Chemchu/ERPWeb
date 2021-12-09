import { ProductoVendido } from "./ProductoVendido";

export type Venta = {
    _id: string,
    productos: ProductoVendido[],
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotal: number,
    cambio: number,
    nombreCliente: string,
    vendidoPor: string,
    modificadoPor: string,
    tipo: string,
    descuentoEfectivo: number,
    descuentoTarjeta: number,
    createdAt: string,
    updatedAt: string
}