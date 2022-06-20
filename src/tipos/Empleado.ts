import { Roles } from "./Enums/Roles"

export type Empleado = {
    _id: string,
    nombre: string,
    apellidos: string,
    dni?: string,
    rol: string,
    genero?: string,
    email: string,
    horasPorSemana?: number,
    fechaAlta?: string,
}

export type SesionEmpleado = {
    _id: string,
    nombre: string,
    apellidos: string,
    rol: Roles,
    email: string,
    TPV?: string
}