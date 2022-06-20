export type ProductoVendido = {
    _id: string,
    nombre: string,
    proveedor: string,
    familia: string,
    precioVenta: number,
    precioCompra: number,
    precioFinal: number,
    iva: number,
    margen: number,
    ean: string,
    cantidadVendida: number,
    dto: number
}