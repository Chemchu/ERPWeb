import { Client } from "./Client";

export type CustomerPaymentInformation = {
    cliente: Client,
    tipo: string,
    precioTotal: number,
    pagoEnEfectivo: number,
    pagoEnTarjeta: number,
    cambio: number
}