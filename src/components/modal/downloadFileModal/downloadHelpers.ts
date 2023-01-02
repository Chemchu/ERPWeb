import { Venta } from "../../../tipos/Venta";
import { FetchChunkedSalesBetweenDates } from "../../../utils/fetches/chunkFetches";
import {
  CalcularBaseImponiblePorIva,
  CalcularIvasVenta,
} from "../../../utils/typeCreator";

interface IVA {
  [key: string]: number;
}

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

  let tiposIva = new Set<number>();
  for (let i = 0; i < ventas.length; i++) {
    const ivas = CalcularIvasVenta(ventas[i]);
    const ivas1Array: number[] = Array.from(tiposIva.keys());
    const ivas2Array: number[] = Array.from(ivas.keys());

    tiposIva = new Set<number>([...ivas1Array, ...ivas2Array]);
  }

  setFileName("Ventas");
  const formattedData = ventas.map((v: Venta) => {
    let data: Record<string, string | number> = {};
    data = {
      _id: v._id,
      dineroEntregadoEfectivo: v.dineroEntregadoEfectivo.toFixed(2),
      dineroEntregadoTarjeta: v.dineroEntregadoTarjeta.toFixed(2),
      precioVentaTotal: v.precioVentaTotal.toFixed(2),
      cambio: v.cambio.toFixed(2),
      tipo: v.tipo,
      fecha: new Date(Number(v.createdAt)).toLocaleString(),
      descuentoEfectivo: v.descuentoEfectivo.toFixed(2),
      descuentoPorcentaje: v.descuentoPorcentaje.toFixed(2),
    };

    let ivasArray = Array.from(tiposIva.keys()).reverse();
    for (let i = 0; i < ivasArray.length; i++) {
      const [baseImponible, iva] = CalcularBaseImponiblePorIva(
        v.productos,
        ivasArray[i]
      );
      data[`baseImponible${ivasArray[i]}`] =
        Math.round(baseImponible * 100) / 100;
      data[`iva${ivasArray[i]}`] = Math.round(iva * 100) / 100;
    }
    return data;
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
