import { Empleado } from "./Empleado"

export type Cierre = {
    _id: string,
    tpv: string,
    abiertoPor: Empleado,
    cerradoPor: Empleado,
    apertura: string,
    cierre: string,
    cajaInicial: number,
    numVentas: number,
    ventasEfectivo: number,
    ventasTarjeta: number,
    ventasTotales: number,
    dineroEsperadoEnCaja: number,
    dineroRealEnCaja: number,
    dineroRetirado: number,
    fondoDeCaja: number,
    beneficio: number,
    nota: string
}