export type Proveedor = {
    _id: string,
    nombre: string,
    cif: string,
    direccion?: string,
    contacto?: ProveedorContacto,
    telefono?: string
    localidad?: string
    provincia?: string,
    cp?: string,
    pais?: string,
    email?: string,
    createdAt: string,
    updatedAt: string
}

export type ProveedorContacto = {
    nombre: string,
    telefono?: string
    email?: string,
}