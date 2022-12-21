import { FetchChunkedSalesBetweenDates } from "../../../utils/fetches/chunkFetches";
import { CalcularBaseImponiblePorIva } from "../../../utils/typeCreator";

export interface ProdVendidoXlsx {
  _id: string;
  nombre: String;
  ean: string;
  precioCompra: number;
  precioVenta: number;
  cantidadVendida: number;
  familia: string;
  proveedor: string;
  valorTotalVendido: number;
  baseImponible: number;
  margen: number;
  iva: number;
  nota: string;
}

export const DownloadVentas = async (
  startDate: Date | null,
  endDate: Date | null,
  setIsDownloading: Function,
  setFileName: Function,
  setDownloadProgress: React.Dispatch<React.SetStateAction<number>>,
  setData: Function
) => {
  if (startDate == null) {
    return;
  }
  if (endDate == null) {
    return;
  }
  setIsDownloading(true);

  const ventas = await FetchChunkedSalesBetweenDates(
    startDate,
    endDate,
    setDownloadProgress
  );
  const formattedData = ventas.map((v) => {
    const [baseImponible4, iva4] = CalcularBaseImponiblePorIva(
      v.productos,
      4.0
    );
    const [baseImponible10, iva10] = CalcularBaseImponiblePorIva(
      v.productos,
      10.0
    );
    const [baseImponible21, iva21] = CalcularBaseImponiblePorIva(
      v.productos,
      21.0
    );
    setFileName("Ventas");

    return {
      _id: v._id,
      dineroEntregadoEfectivo: v.dineroEntregadoEfectivo.toFixed(2),
      dineroEntregadoTarjeta: v.dineroEntregadoTarjeta.toFixed(2),
      precioVentaTotal: v.precioVentaTotal.toFixed(2),
      baseImponible4: baseImponible4.toFixed(2),
      iva4: iva4.toFixed(2),
      baseImponible10: baseImponible10.toFixed(2),
      iva10: iva10.toFixed(2),
      baseImponible21: baseImponible21.toFixed(2),
      iva21: iva21.toFixed(2),
      cambio: v.cambio.toFixed(2),
      tipo: v.tipo,
      fecha: new Date(Number(v.createdAt)).toLocaleString(),
      descuentoEfectivo: v.descuentoEfectivo.toFixed(2),
      descuentoPorcentaje: v.descuentoPorcentaje.toFixed(2),
    };
  });

  setData([...formattedData]);
  return;
};
export const DownloadProductosVendidos = async (
  startDate: Date | null,
  endDate: Date | null,
  setIsDownloading: Function,
  setFileName: Function,
  setDownloadProgress: React.Dispatch<React.SetStateAction<number>>,
  setData: Function
) => {
  if (startDate == null) {
    return;
  }
  if (endDate == null) {
    return;
  }
  setIsDownloading(true);
  setFileName("ProductosVendidos");

  const ventas = await FetchChunkedSalesBetweenDates(
    startDate,
    endDate,
    setDownloadProgress
  );
  const productosMap = new Map<string, ProdVendidoXlsx>();
  for (let i = 0; i < ventas.length; i++) {
    const v = ventas[i];

    for (let j = 0; j < v.productos.length; j++) {
      const pVendido = v.productos[j];
      const prod = productosMap.get(pVendido._id);

      const [bImponible, iva] = CalcularBaseImponiblePorIva(
        [pVendido],
        pVendido.iva
      );
      const margen =
        bImponible - pVendido.precioCompra * pVendido.cantidadVendida;

      if (!prod) {
        productosMap.set(pVendido._id, {
          _id: pVendido._id,
          nombre: pVendido.nombre,
          proveedor: pVendido.proveedor,
          ean: pVendido.ean,
          familia: pVendido.familia,
          precioCompra: Number(pVendido.precioCompra.toFixed(2)),
          precioVenta: Number(Number(pVendido.precioVenta).toFixed(2)),
          cantidadVendida: pVendido.cantidadVendida,
          valorTotalVendido:
            Number(pVendido.precioFinal) * pVendido.cantidadVendida,
          baseImponible: Number(bImponible.toFixed(2)),
          iva: Number(iva.toFixed(2)),
          margen: Number(margen.toFixed(2)),
          nota:
            Number(pVendido.precioVenta) -
              (pVendido.precioCompra +
                (pVendido.iva / 100) * pVendido.precioCompra) <=
            0
              ? "Precio de compra y precio de venta muy cercanos, este producto no tiene margen"
              : "",
        } as ProdVendidoXlsx);
      } else {
        productosMap.set(pVendido._id, {
          _id: pVendido._id,
          nombre: pVendido.nombre,
          proveedor: pVendido.proveedor,
          ean: pVendido.ean,
          familia: pVendido.familia,
          precioCompra: pVendido.precioCompra,
          precioVenta: pVendido.precioVenta,
          cantidadVendida: prod.cantidadVendida + pVendido.cantidadVendida,
          valorTotalVendido:
            prod.valorTotalVendido +
            Number(pVendido.precioFinal) * pVendido.cantidadVendida,
          baseImponible: Number((prod.baseImponible + bImponible).toFixed(2)),
          iva: Number((prod.iva + iva).toFixed(2)),
          margen: Number((prod.margen + margen).toFixed(2)),
          nota: prod.nota,
        } as ProdVendidoXlsx);
      }
    }
  }

  const formattedData = Array.from(productosMap.values());
  setData([...formattedData]);
};
