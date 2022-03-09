import { Empleado } from "./Empleado";

export type TPVType = {
    _id: string,
    nombre: string,
    enUsoPor: Empleado,
    cajaInicial: number,
    libre: boolean,
    createdAt: Date,
    updatedAt: Date
}