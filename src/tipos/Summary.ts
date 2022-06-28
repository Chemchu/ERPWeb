
export type Summary = {
    ventasPorHora: VentasPorHora[],
    beneficio: number,
    totalVentas: number,
    numVentas: number,
    mediaVentas: number,
    mediaCantidadVenida: number,
    cantidadProductosVendidos: number,
    dineroDescontado: number,
    ivaPagado: number,
}

export type VentasPorHora = {
    hora: string,
    beneficioHora: number,
    totalVentaHora: number,
    productosVendidosHora: number,
    dineroDescontadoHora: number,
}
