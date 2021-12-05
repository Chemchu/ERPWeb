export type DBSale = {
    _id: string,
    productos: SoldProduct[],
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotal: number,
    cambio: number,
    cliente: string,
    vendidoPor: string,
    modificadoPor: string,
    tipo: string,
    descuentoEfectivo: number,
    descuentoTarjeta: number,
    createdAt: string,
    updatedAt: string
}

type SoldProduct = {
    _id: string,
    cantidad: number,
    dto: number
}