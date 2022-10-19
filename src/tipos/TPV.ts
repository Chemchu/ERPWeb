import { Empleado } from "./Empleado";

export type ITPV = {
    _id: string,
    nombre: string,
    abiertoPor: Empleado,
    enUsoPor: Empleado,
    cajaInicial: number,
    libre: boolean,
    fechaApertura: number,
    createdAt: Date,
    updatedAt: Date
}