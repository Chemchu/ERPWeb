import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { Devolucion } from "../../../tipos/Devolucion";
import { FetchDevoluciones, FetchDevolucionesByQuery } from "../../../utils/fetches/devolucionesFetches";
import { notifyWarn } from "../../../utils/toastify";
import DateRange from "../../elementos/Forms/dateRange";
import { Paginador } from "../../elementos/Forms/paginador";
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

        <div className="flex max-w-xs gap-2">
          <input
            className="rounded-lg border appearance-none shadow-lg w-72 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="ID del reembolso..."
            onChange={(e) => {
              setFiltro(e.target.value);
            }}
            onKeyPress={async (e) => {}}
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
      <div className="grid grid-cols-4 justify-evenly border-t border-x rounded-t-2xl">
        <div className="px-5 py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">Cliente</div>
        <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">Fecha de compra</div>
        <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">Fecha de reembolso</div>
        <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">Dinero devuelto</div>
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
    <div className="grid grid-cols-4 w-full justify-evenly gap-x-6 border-t">
      <div className="px-5 py-3 border-gray-200 text-sm">
        <p className="text-gray-900">{props.devolucion.cliente.nombre}</p>
      </div>
      <div className="py-3 border-gray-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{fecha.toLocaleString()}</p>
      </div>
      <div className="py-3 border-gray-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{fechaReembolso.toLocaleString()}</p>
      </div>
      <div className="py-3 border-gray-200 text-lg">
        <p className="whitespace-no-wrap">{props.devolucion.dineroDevuelto.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default DevolucionesPage;
