export type ProductoVendido = {
    _id: string,
    nombre: string,
    proveedor: string,
    familia: string,
    precioVenta: number | string,
    precioCompra: number,
    precioFinal: number,
    iva: number,
    margen: number,
    ean: string,
    cantidadVendida: number,
    dto: number
}