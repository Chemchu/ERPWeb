import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { Devolucion } from "../../../tipos/Devolucion";
import { FetchDevoluciones, FetchDevolucionesByQuery } from "../../../utils/fetches/devolucionesFetches";
import { notifyWarn } from "../../../utils/toastify";
import DateRange from "../../elementos/Forms/dateRange";
import { Paginador } from "../../elementos/Forms/paginador";
import FiltrarInput from "../../elementos/input/filtrarInput";
import DevolucionModal from "../../modal/devolucionModal";
import SkeletonCard from "../../Skeletons/skeletonCard";

const DevolucionesPage = () => {
  const [Devoluciones, setDevoluciones] = useState<Devolucion[]>([]);
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [CurrentDevolucion, setCurrentDevolucion] = useState<Devolucion>();
  const [showModalEditarVenta, setShowModal] = useState<boolean>();
  const [DevolucionesFiltradas, setDevolucionesFiltradas] = useState<Devolucion[] | undefined>();
  const [filtro, setFiltro] = useState<string>("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const GetAllData = async () => {
      setDevoluciones(await FetchDevoluciones());
      setLoading(false);
    };

    GetAllData();
  }, []);

  useEffect(() => {
    if (!filtro) {
      setDevolucionesFiltradas(undefined);
    }
  }, [filtro]);

  const elementsPerPage = 20;
  const numPages = Devoluciones.length <= 0 ? 1 : Math.ceil(Devoluciones.length / elementsPerPage);
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
      setDevolucionesFiltradas(undefined);
      return;
    }
    if (!f.match("^[0-9a-fA-F]{24}$")) {
      notifyWarn("Introduce un ID de venta válido");
      return;
    }

    setDevolucionesFiltradas(await FetchDevolucionesByQuery(f));
  };

  return (
    <div className="flex flex-col h-full w-full bg-white sm:rounded-bl-3xl sm:rounded-tr-3xl p-4 shadow-lg border-x">
      <div className="flex flex-col md:flex-row w-full pb-4 gap-2 md:gap-10 justify-end items-end">
        <DateRange
          titulo="Fecha"
          dateRange={dateRange}
          setDateRange={setDateRange}
          endDate={endDate}
          startDate={startDate}
        />

        <div className="flex w-full gap-2 items-center justify-end">
          <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
        </div>
      </div>
      <div className="flex justify-between items-center border-t border-x rounded-t-2xl font-semibold">
        <div className="p-2 w-full border-gray-200 text-gray-800 text-left">Cliente</div>
        <div className="hidden sm:inline-flex p-2 w-full border-gray-200 text-gray-800 text-left">Fecha de compra</div>
        <div className="hidden sm:inline-flex w-full border-gray-200 text-right">Fecha de devolución</div>
        <div className="p-2 w-full border-gray-200 text-gray-800 text-right">Dinero devuelto</div>
      </div>
      <div className="h-full w-full pb-4 border overflow-y-scroll">
        {isLoading ? (
          arrayNum.map((e, i) => <SkeletonCard key={`skeletonprops.ventas-${i}`} />)
        ) : Devoluciones.length <= 0 ? (
          <div className="flex justify-center items-center w-full h-full text-xl">
            No se ha encontrado registro de devoluciones en el sistema
          </div>
        ) : DevolucionesFiltradas && filtro ? (
          DevolucionesFiltradas.slice(elementsPerPage * (CurrentPage - 1), CurrentPage * elementsPerPage).map((v) => {
            return (
              <div
                key={`FilaProdTable${v._id}`}
                onClick={() => {
                  setCurrentDevolucion(v);
                  setShowModal(true);
                }}
              >
                <FilaReembolso key={`FilaReembolso${v._id}`} devolucion={v} />
              </div>
            );
          })
        ) : (
          Devoluciones.slice(elementsPerPage * (CurrentPage - 1), CurrentPage * elementsPerPage).map((v) => {
            return (
              <div
                className="hover:bg-gray-200 cursor-pointer"
                key={`FilaProdTable${v._id}`}
                onClick={() => {
                  setCurrentDevolucion(v);
                  setShowModal(true);
                }}
              >
                <FilaReembolso key={`FilaReembolso${v._id}`} devolucion={v} />
              </div>
            );
          })
        )}
      </div>
      <div className="flex pt-2 items-center justify-center">
        <Paginador numPages={numPages} paginaActual={CurrentPage} maxPages={5} cambiarPaginaActual={setPaginaActual} />
      </div>
      <AnimatePresence initial={false}>
        {showModalEditarVenta && (
          <div>
            <DevolucionModal devolucion={CurrentDevolucion} setModal={setShowModal} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilaReembolso = (props: { devolucion: Devolucion }) => {
  const fecha = new Date(Number(props.devolucion.ventaOriginal.createdAt));
  const fechaReembolso = new Date(Number(props.devolucion.updatedAt));

  return (
    <div className="flex justify-between items-center border-t p-2">
      <div className="w-full border-gray-200">
        <p className="text-gray-900">{props.devolucion.cliente.nombre}</p>
      </div>
      <div className="hidden sm:inline-flex w-full border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{fecha.toLocaleString()}</p>
      </div>
      <div className="hidden sm:inline-flex w-full border-gray-200 text-right">
        <p className="text-gray-900 whitespace-no-wrap">{fechaReembolso.toLocaleString()}</p>
      </div>
      <div className="w-full border-gray-200 text-right sm:text-lg">
        <p className="whitespace-no-wrap">{props.devolucion.dineroDevuelto.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default DevolucionesPage;
