import { ProductoMermado } from "./ProductoMermado"

export type Merma = {
    _id: string,
    productos: ProductoMermado[],
    createdAt: string,
    updatedAt: string
}

