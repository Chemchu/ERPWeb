export type Summary = {
    ventasPorHora: VentasPorHora[],
    productosMasVendidos: ProductoMasVendido[],
    familiasMasVendidas: FamiliaMasVendido[]
    beneficio: number,
    totalVentas: number,
    totalEfectivo: number,
    totalTarjeta: number,
    numVentas: number,
    mediaVentas: number,
    ventaMinima: number,
    ventaMaxima: number,
    mediaCantidadVenida: number,
    cantidadProductosVendidos: number,
    dineroDescontado: number,
    ivaPagado: number,
}

export type ProductoMasVendido = {
    _id: string,
    nombre: string,
    ean: string,
    familia: string,
    cantidadVendida: number
}

export type FamiliaMasVendido = {
    familia: string,
    cantidadVendida: number
}

export type VentasPorHora = {
    hora: string,
    productosMasVendidosHora: ProductoMasVendido[],
    familiasMasVendidasHora: FamiliaMasVendido[]
    beneficioHora: number,
    totalVentaHora: number,
    totalEfectivoHora: number,
    totalTarjetaHora: number,
    productosVendidosHora: number,
    dineroDescontadoHora: number,
}
