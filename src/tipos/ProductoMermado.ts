import { MotivoMerma } from "./Enums/MotivoMerma";

export type ProductoMermado = {
  _id: string;
  nombre: string;
  proveedor: string;
  cantidad: number;
  familia: string;
  margen: number;
  ean: string;
  iva: number;
  precioCompra: number;
  precioVenta: number;
  motivo: string;
};

export type NuevoProductoMermado = {
  _id: string;
  cantidad: number;
  motivo: MotivoMerma | string;
};
