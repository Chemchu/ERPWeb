export type ProductoSummary = {
  _id: string;
  nombreProducto: string;
  ean: string;
  familia: string;
  proveedor: string;
  cantidadVendida: number;
  costeTotalProducto: number;
  ventaTotal: number;
  beneficio: number;
  ivaPagado: number;
  frecuenciaVentaDiaria: number;
};

export function CreateProductoSummary(s: any): ProductoSummary[] | undefined {
  try {
    const pSummaries: ProductoSummary[] = [];
    for (let i = 0; i < s.length; i++) {
      let summary: ProductoSummary = {
        _id: s[i]._id,
        nombreProducto: s[i].nombreProducto,
        ean: s[i].ean,
        familia: s[i].familia,
        proveedor: s[i].proveedor,
        cantidadVendida: s[i].cantidadVendida,
        beneficio: s[i].beneficio,
        ivaPagado: s[i].ivaPagado,
        ventaTotal: s[i].ventaTotal,
        costeTotalProducto: s[i].costeTotalProducto,
        frecuenciaVentaDiaria: s[i].frecuenciaVentaDiaria,
      };

      pSummaries.push(summary);
    }
    return pSummaries;
  } catch (e) {
    console.log(e);

    return undefined;
  }
}
