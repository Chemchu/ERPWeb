import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { In } from "../../../utils/animations";
import { notifyError, notifyWarn } from "../../../utils/toastify";
import DateRange from "../../elementos/Forms/dateRange";
import { Backdrop } from "../backdrop";
import * as XLSX from "xlsx";
import { Tab } from "@headlessui/react";
import CustomProgressBar from "../../elementos/progressBar";
import { DownloadProductosVendidos, DownloadVentas } from "./downloadHelpers";

const DownloadVentasModal = (props: { setModal: Function }) => {
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [validDate, setValidDate] = useState<boolean>(false);
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("Ventas");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  useEffect(() => {
    if (dateRange[0] == null) {
      setDownloadProgress(0);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full z-20"
    >
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
                  `${
                    props.selected
                      ? "bg-white cursor-default"
                      : "bg-gray-300 hover:bg-blue-400 hover:text-white"
                  } w-full rounded-t-xl`
                }
              >
                Ventas
              </Tab>
              <Tab
                key={"exportarProdVendidosTab"}
                className={(props: { selected: boolean }) =>
                  `${
                    props.selected
                      ? "bg-white cursor-default"
                      : "bg-gray-300 hover:bg-blue-400 hover:text-white"
                  } w-full rounded-t-xl`
                }
              >
                Productos vendidos
              </Tab>
            </Tab.List>
            <Tab.Panels className="bg-white w-full h-full rounded-b-lg rounded-r-lg">
              <Tab.Panel
                key={"exportarVentas"}
                className={`flex flex-col justify-between w-full h-full p-2`}
              >
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
                        Si el rango de fechas abarca muchos días, la descarga
                        puede tardar varios minutos
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {downloadProgress > 0 && (
                    <CustomProgressBar progress={downloadProgress} />
                  )}
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
                      className={`${
                        isDownloading
                          ? "bg-blue-400"
                          : "bg-blue-500 hover:bg-blue-600 "
                      } w-1/2 h-12 rounded-xl shadow-lg`}
                      onClick={() =>
                        DownloadVentas(
                          startDate,
                          endDate,
                          setIsDownloading,
                          setFileName,
                          setDownloadProgress,
                          setData
                        )
                      }
                    >
                      {isDownloading ? "Exportando..." : "Exportar"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-1/2 h-12 rounded-xl bg-blue-400 shadow-lg"
                    >
                      Fechas inválidas
                    </button>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel
                key={"exportarProdVendidos"}
                className={`flex flex-col justify-between w-full h-full p-2`}
              >
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
                        Si el rango de fechas abarca muchos días, la descarga
                        puede tardar varios minutos
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {downloadProgress > 0 && (
                    <CustomProgressBar progress={downloadProgress} />
                  )}
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
                      className={`${
                        isDownloading
                          ? "bg-blue-400"
                          : "bg-blue-500 hover:bg-blue-600 "
                      } w-1/2 h-12 rounded-xl shadow-lg`}
                      onClick={() =>
                        DownloadProductosVendidos(
                          startDate,
                          endDate,
                          setIsDownloading,
                          setFileName,
                          setDownloadProgress,
                          setData
                        )
                      }
                    >
                      {isDownloading ? "Exportando..." : "Exportar"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-1/2 h-12 rounded-xl bg-blue-400 shadow-lg"
                    >
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
