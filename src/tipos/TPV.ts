import { Empleado } from "./Empleado";

export type ITPV = {
    _id: string,
    nombre: string,
    enUsoPor: Empleado,
    cajaInicial: number,
    libre: boolean,
    createdAt: Date,
    updatedAt: Date
}