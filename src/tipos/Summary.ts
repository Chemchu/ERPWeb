
export type Summary = {
    ventasPorHora: VentasPorHora[],
    beneficio: number,
    totalVentas: number,
    totalEfectivo: number,
    totalTarjeta: number,
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
    totalEfectivoHora: number,
    totalTarjetaHora: number,
    productosVendidosHora: number,
    dineroDescontadoHora: number,
}
