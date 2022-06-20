import { Cliente } from "./Cliente";

export type CustomerPaymentInformation = {
    cliente: Cliente,
    tipo: string,
    precioTotalSinDto: number,
    precioTotal: number,
    pagoEnEfectivo: number,
    pagoEnTarjeta: number,
    dtoEfectivo: number,
    dtoPorcentaje: number,
    cambio: number
}