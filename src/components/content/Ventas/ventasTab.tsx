import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { Venta } from "../../../tipos/Venta";
import DateRange from "../../elementos/Forms/dateRange";
import { Paginador } from "../../elementos/Forms/paginador";
import VerVenta from "../../modal/verVenta";
import SkeletonCard from "../../Skeletons/skeletonCard";
import UploadFileRestricted from "../../elementos/botones/uploadFileRestricted";
import { FetchVentaByQuery, FetchVentas, FetchVentasByDateRange } from "../../../utils/fetches/ventasFetches";
import DownloadFile from "../../elementos/botones/downloadFile";

const SalesPage = () => {
  const [Ventas, setVentas] = useState<Venta[]>([]);
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [CurrentVenta, setCurrentVenta] = useState<Venta>();
  const [showModalEditarVenta, setShowModal] = useState<boolean>();
  const [VentasFiltradas, setVentasFiltradas] = useState<Venta[] | undefined>();
  const [filtro, setFiltro] = useState<string>("");
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const GetAllData = async () => {
      setVentas(await FetchVentas());
      setLoading(false);
    };
    GetAllData();
  }, []);

  useEffect(() => {
    if (!filtro) {
      setVentasFiltradas(undefined);
    }
  }, [filtro]);

  useEffect(() => {
    const GetVentasByDate = async () => {
      if (dateRange[0] === null || dateRange[1] === null) {
        setVentasFiltradas(undefined);
        return;
      }
      setVentasFiltradas(await FetchVentasByDateRange(dateRange[0], dateRange[1]));
    };

    GetVentasByDate();
  }, [dateRange]);

  const elementsPerPage = 70;
  const numPages = Ventas.length <= 0 ? 1 : Math.ceil(Ventas.length / elementsPerPage);
  const arrayNum = [...Array(8)];

  const setPaginaActual = (page: number) => {
    if (page < 1) {
      return;
    }
    if (page > numPages) {
      return;
    }

    setCurrentPage(page);
  };

  const Filtrar = async (f: string) => {
    if (f === "") {
      setVentasFiltradas(undefined);
      return;
    }

    if (dateRange[0] !== null && dateRange[1] !== null) {
      setVentasFiltradas(await FetchVentaByQuery(f, [String(dateRange[0].getTime()), String(dateRange[1].getTime())]));
      return;
    }
    setVentasFiltradas(await FetchVentaByQuery(f));
  };

  return (
    <div className="flex flex-col h-full w-full bg-white sm:rounded-bl-3xl sm:rounded-tr-3xl p-4 shadow-lg border-x">
      <div className="flex justify-between w-full h-auto pb-4">
        <div className="flex justify-start w-1/3 h-full gap-4 items-start">
          <div className="hidden sm:inline-block">
            <UploadFileRestricted extension="json" tipoDocumento={TipoDocumento.Ventas} />
          </div>
          <DownloadFile tipoDocumento={TipoDocumento.Ventas} />
        </div>
        <div className="flex flex-col md:w-2/3 gap-2 items-end">
          <DateRange
            titulo="Fecha"
            dateRange={dateRange}
            setDateRange={setDateRange}
            endDate={endDate}
            startDate={startDate}
          />
          <div className="flex gap-2">
            <input
              className="rounded-lg border appearance-none shadow-lg w-40 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Buscar venta..."
              onChange={(e) => {
                setFiltro(e.target.value);
              }}
              onKeyPress={async (e) => {
                e.key === "Enter" && (await Filtrar(filtro));
              }}
            />

            {filtro ? (
              <button
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-purple-200"
                onClick={async (e) => {
                  e.preventDefault();
                  await Filtrar(filtro);
                }}
              >
                Filtrar
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-2 font-semibold text-white bg-blue-300 rounded-lg shadow-md cursor-default"
              >
                Filtrar
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 justify-evenly border-t border-x rounded-t-2xl">
        <div className="px-5 py-3 border-gray-200 text-gray-800 text-left font-semibold">Cliente</div>
        <div className="py-3 border-gray-200 text-gray-800 text-left font-semibold">Fecha de compra</div>
        <div className="py-3 border-gray-200 text-gray-800 text-left font-semibold">Método de pago</div>
        <div className="py-3 border-gray-200 text-gray-800 text-left font-semibold">Valor total</div>
      </div>
      <div className="h-full w-full pb-4 border overflow-y-scroll">
        {isLoading ? (
          arrayNum.map((e, i) => <SkeletonCard key={`skeletonprops.ventas-${i}`} />)
        ) : Ventas.length <= 0 ? (
          <div className="flex justify-center items-center w-full h-full text-xl">
            No se ha encontrado registro de ventas en el sistema
          </div>
        ) : VentasFiltradas && (filtro || dateRange) ? (
          VentasFiltradas.slice(elementsPerPage * (CurrentPage - 1), CurrentPage * elementsPerPage).map((v) => {
            return (
              <div
                className="hover:bg-blue-200 cursor-pointer"
                key={`FilaProdTable${v._id}`}
                onClick={() => {
                  setCurrentVenta(v);
                  setShowModal(true);
                }}
              >
                <FilaVenta key={`FilaVenta${v._id}`} venta={v} />
              </div>
            );
          })
        ) : (
          Ventas.slice(elementsPerPage * (CurrentPage - 1), CurrentPage * elementsPerPage).map((v) => {
            return (
              <div
                className="hover:bg-blue-200 cursor-pointer"
                key={`FilaProdTable${v._id}`}
                onClick={() => {
                  setCurrentVenta(v);
                  setShowModal(true);
                }}
              >
                <FilaVenta key={`FilaVenta${v._id}`} venta={v} />
              </div>
            );
          })
        )}
      </div>
      <div className="flex w-full pt-2 items-center justify-center">
        <Paginador numPages={numPages} paginaActual={CurrentPage} maxPages={5} cambiarPaginaActual={setPaginaActual} />
      </div>
      <AnimatePresence initial={false}>
        {showModalEditarVenta && (
          <div>
            <VerVenta venta={CurrentVenta} setModal={setShowModal} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilaVenta = (props: { venta: Venta }) => {
  let fecha = new Date(0);
  fecha.setUTCMilliseconds(Number(props.venta.createdAt));

  return (
    <div className="grid grid-cols-4 w-full justify-evenly gap-x-6 border-t">
      <div className="px-5 py-3 border-gray-200 ">
        <p>{props.venta.cliente.nombre}</p>
      </div>
      <div className="py-3 border-gray-200 ">
        <p className="whitespace-no-wrap">{fecha.toLocaleString()}</p>
      </div>
      <div className="py-3 border-gray-200 ">
        <p className="whitespace-no-wrap">{props.venta.tipo}</p>
      </div>
      <div className="py-3 border-gray-200">
        <p className="whitespace-no-wrap">{props.venta.precioVentaTotal.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default SalesPage;
