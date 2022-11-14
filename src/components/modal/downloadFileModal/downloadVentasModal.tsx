import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { In } from "../../../utils/animations";
import { notifyError, notifyWarn } from "../../../utils/toastify";
import DateRange from "../../elementos/Forms/dateRange";
import { Backdrop } from "../backdrop";
import * as XLSX from "xlsx";
import { FetchVentasByDateRange } from "../../../utils/fetches/ventasFetches";
import { CalcularBaseImponiblePorIva } from "../../../utils/typeCreator";
import { Tab } from "@headlessui/react";

interface ProdVendidoXlsx {
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

const DownloadVentasModal = (props: { setModal: Function }) => {
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [validDate, setValidDate] = useState<boolean>(false);
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("Ventas");

  useEffect(() => {
    if (dateRange[0] == null) {
      setValidDate(false);
      return;
    }
    if (dateRange[0] > new Date()) {
      setValidDate(false);
      notifyWarn("No se puede exportar ventas de días futuros");
      return;
    }
    if (dateRange[1] == null) {
      setValidDate(false);
      return;
    }

    setValidDate(true);
  }, [dateRange]);

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    ExportData();
    setIsDownloading(false);
  }, [data]);

  const DownloadVentas = async () => {
    if (startDate == null) {
      return;
    }
    if (endDate == null) {
      return;
    }
    setIsDownloading(true);

    const ventas = await FetchVentasByDateRange(startDate, endDate);
    const formattedData = ventas.map((v) => {
      const [baseImponible4, iva4] = CalcularBaseImponiblePorIva(v.productos, 4.0);
      const [baseImponible10, iva10] = CalcularBaseImponiblePorIva(v.productos, 10.0);
      const [baseImponible21, iva21] = CalcularBaseImponiblePorIva(v.productos, 21.0);
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

  const DownloadProductosVendidos = async () => {
    if (startDate == null) {
      return;
    }
    if (endDate == null) {
      return;
    }
    setIsDownloading(true);
    setFileName("ProductosVendidos");

    const ventas = await FetchVentasByDateRange(startDate, endDate);
    const productosMap = new Map<string, ProdVendidoXlsx>();
    for (let i = 0; i < ventas.length; i++) {
      const v = ventas[i];

      for (let j = 0; j < v.productos.length; j++) {
        const pVendido = v.productos[j];
        const prod = productosMap.get(pVendido._id);

        const [bImponible, iva] = CalcularBaseImponiblePorIva([pVendido], pVendido.iva);
        const margen = bImponible - pVendido.precioCompra * pVendido.cantidadVendida;

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
            valorTotalVendido: Number(pVendido.precioFinal) * pVendido.cantidadVendida,
            baseImponible: Number(bImponible.toFixed(2)),
            iva: Number(iva.toFixed(2)),
            margen: Number(margen.toFixed(2)),
            nota:
              Number(pVendido.precioVenta) - (pVendido.precioCompra + (pVendido.iva / 100) * pVendido.precioCompra) <= 0
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
            valorTotalVendido: prod.valorTotalVendido + Number(pVendido.precioFinal) * pVendido.cantidadVendida,
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

  const ExportData = () => {
    if (!data || data.length <= 0) {
      notifyError("No existen datos para las fechas seleccionadas");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full z-20">
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.setModal(false);
        }}
      >
        <motion.div
          className="h-3/6 w-3/6 m-auto flex flex-col items-start justify-center bg-transparent rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Tab.Group>
            <Tab.List className="w-96 h-12 flex gap-1 text-lg">
              <Tab
                key={"exportarVentasTab"}
                className={(props: { selected: boolean }) =>
                  `${props.selected ? "bg-white cursor-default" : "bg-gray-300 hover:bg-blue-400 hover:text-white"
                  } w-full rounded-t-xl`
                }
              >
                Ventas
              </Tab>
              <Tab
                key={"exportarProdVendidosTab"}
                className={(props: { selected: boolean }) =>
                  `${props.selected ? "bg-white cursor-default" : "bg-gray-300 hover:bg-blue-400 hover:text-white"
                  } w-full rounded-t-xl`
                }
              >
                Productos vendidos
              </Tab>
            </Tab.List>

            <Tab.Panels className="bg-white w-full h-full rounded-b-lg rounded-r-lg">
              <Tab.Panel key={"exportarVentas"} className={`flex flex-col justify-between w-full h-full p-2`}>
                <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
                  <span>Seleccione un rango de fechas</span>
                  <DateRange
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    endDate={endDate}
                    startDate={startDate}
                  />
                  <AnimatePresence>
                    {isDownloading && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs italic"
                      >
                        Si el rango de fechas abarca muchos días, la descarga puede tardar varios minutos
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex gap-2 w-full justify-around items-end text-white">
                  <button
                    className="w-1/2 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                    onClick={() => {
                      props.setModal(false);
                    }}
                  >
                    Cancelar
                  </button>
                  {validDate ? (
                    <button
                      disabled={isDownloading}
                      className={`${isDownloading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600 "
                        } w-1/2 h-12 rounded-xl shadow-lg`}
                      onClick={DownloadVentas}
                    >
                      {isDownloading ? "Exportando..." : "Exportar"}
                    </button>
                  ) : (
                    <button disabled className="w-1/2 h-12 rounded-xl bg-blue-400 shadow-lg">
                      Fechas inválidas
                    </button>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel key={"exportarProdVendidos"} className={`flex flex-col justify-between w-full h-full p-2`}>
                <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
                  <span>Seleccione un rango de fechas</span>
                  <DateRange
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    endDate={endDate}
                    startDate={startDate}
                  />
                  <AnimatePresence>
                    {isDownloading && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs italic"
                      >
                        Si el rango de fechas abarca muchos días, la descarga puede tardar varios minutos
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex gap-2 w-full justify-around items-end text-white">
                  <button
                    className="w-1/2 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                    onClick={() => {
                      props.setModal(false);
                    }}
                  >
                    Cancelar
                  </button>
                  {validDate ? (
                    <button
                      disabled={isDownloading}
                      className={`${isDownloading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600 "
                        } w-1/2 h-12 rounded-xl shadow-lg`}
                      onClick={DownloadProductosVendidos}
                    >
                      {isDownloading ? "Exportando..." : "Exportar"}
                    </button>
                  ) : (
                    <button disabled className="w-1/2 h-12 rounded-xl bg-blue-400 shadow-lg">
                      Fechas inválidas
                    </button>
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default DownloadVentasModal;
