// TODO: hacer el productSummary. Mirar definicion en ERPAnalytics
export type ProductoSummary = {
  _id: string;
  nombre: string;
  proveedor: string;
  familia: string;
  precioVenta: number | string;
  precioCompra: number;
  precioFinal: number | string;
  iva: number;
  margen: number;
  ean: string;
  cantidadVendida: number;
  dto: number;
};
