import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import { Cierre } from "../../../tipos/Cierre";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { ITPV } from "../../../tipos/TPV";
import { FetchCierres, FetchCierresByQuery } from "../../../utils/fetches/cierresFetches";
import DownloadProductsFile from "../../elementos/botones/downloadProductsFile";
import UploadFileRestricted from "../../elementos/botones/uploadFileRestricted";
import DateRange from "../../elementos/Forms/dateRange";
import { Paginador } from "../../elementos/Forms/paginador";
import VerCierre from "../../modal/verCierre";
import SkeletonCard from "../../Skeletons/skeletonCard";
import { FetchTPVs } from "../../../utils/fetches/tpvFetches";
import DownloadFile from "../../elementos/botones/downloadFile";
import FiltrarInput from "../../elementos/input/filtrarInput";

const arrayNum = [...Array(8)];
const elementsPerPage = 50;

const CierrePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filtro, setFiltro] = useState<string>("");
  const [CierresFiltrados, setCierresFiltrados] = useState<Cierre[] | undefined>();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [CierresList, SetCierres] = useState<Cierre[]>([]);
  const [Tpvs, SetTpvs] = useState<ITPV[]>([]);
  const { Empleado, SetEmpleado } = useEmpleadoContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(Empleado).length === 0) {
      SetEmpleado(Empleado);
    }
    const GetAllData = async () => {
      SetCierres(await FetchCierres());
      SetTpvs(await FetchTPVs());
      setMounted(true);
      setLoading(false);
    };
    GetAllData();
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    if (filtro === "") {
      setCierresFiltrados(undefined);
      return;
    }
  }, [filtro]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const GetData = async () => {
      if (dateRange[0] && dateRange[1]) {
        const fechas: string[] = [dateRange[0], dateRange[1]];
        setCierresFiltrados(await FetchCierresByQuery(undefined, fechas));
      }

      if (dateRange[0] == null && dateRange[1] == null) {
        setCierresFiltrados(undefined);
        return;
      }
    };

    GetData();
  }, [dateRange]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
  }, [CierresFiltrados]);

  const numPages = Math.ceil(CierresList.length / elementsPerPage);

  const setPaginaActual = (page: number) => {
    if (page < 1) {
      return;
    }
    if (page > numPages) {
      return;
    }

    setCurrentPage(page);
  };

  const Filtrar = async () => {
    if (filtro === "") {
      setCierresFiltrados(undefined);
      return;
    }

    setCierresFiltrados(await FetchCierresByQuery(filtro));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 h-full w-full bg-white sm:rounded-b-3xl sm:rounded-r-3xl p-4 shadow-lg border-x">
        <div className="flex w-full h-auto gap-2 justify-end">
          <div className="hidden sm:inline-block">
            <UploadFileRestricted tipoDocumento={TipoDocumento.Cierres} />
          </div>
          <div className="hidden sm:inline-block">
            <DownloadFile tipoDocumento={TipoDocumento.Cierres} />
          </div>
          <div className="flex w-full gap-2 items-center justify-end">
            <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
          </div>
        </div>
        <div className="flex flex-col w-full h-10 grow">
          <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl p-2">
            <div className="text-left text-sm font-semibold w-1/4">TPV</div>
            <div className="text-left text-sm font-semibold w-1/4">Fecha</div>
            <div className="text-right text-sm font-semibold w-1/4 ">Trabajador</div>
            <div className="text-right text-sm font-semibold w-1/4">Ventas totales</div>
          </div>
          <div className="h-10 grow w-full border-2 rounded-b overflow-y-scroll">
            {arrayNum.map((n, i) => {
              return <SkeletonCard key={`SkeletonProdList-${i}`} />;
            })}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Paginador
            numPages={numPages}
            paginaActual={currentPage}
            maxPages={10}
            cambiarPaginaActual={setPaginaActual}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full w-full bg-white sm:rounded-b-3xl sm:rounded-r-3xl p-4 shadow-lg border-x">
      <div className="flex w-full gap-2 justify-end">
        <div className="flex gap-2 justify-start w-full">
          <div className="hidden sm:inline-block">
            <UploadFileRestricted tipoDocumento={TipoDocumento.Cierres} />
          </div>
          <div className="hidden sm:inline-block">
            <DownloadFile tipoDocumento={TipoDocumento.Cierres} />
          </div>
        </div>
        <div className="flex justify-between flex-col sm:flex-row-reverse w-full h-full items-end gap-2">
          <div className="flex w-full gap-2 items-center justify-end">
            <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
          </div>
          <DateRange
            titulo="Fecha"
            dateRange={dateRange}
            setDateRange={setDateRange}
            endDate={endDate}
            startDate={startDate}
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-10 grow">
        <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl px-5 py-2">
          <div className="hidden sm:block text-left font-semibold w-full sm:w-1/4">TPV</div>
          <div className="text-left font-semibold w-full sm:w-1/4">Fecha</div>
          <div className="hidden sm:block text-right font-semibold w-full sm:w-1/4">Trabajador</div>
          <div className="text-right font-semibold w-full sm:w-1/4">Ventas totales</div>
        </div>
        <div className="flex flex-col h-full w-full border-2 rounded-b overflow-y-scroll">
          <TablaCierre
            CierresList={CierresFiltrados || CierresList}
            SetCierres={CierresFiltrados ? setCierresFiltrados : SetCierres}
            currentPage={currentPage}
            Tpvs={Tpvs}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
      </div>
    </div>
  );
};

export default CierrePage;

const TablaCierre = (props: { CierresList: Cierre[]; SetCierres: Function; currentPage: number; Tpvs: ITPV[] }) => {
  if (!props.CierresList) {
    return (
      <div className="flex justify-center items-center h-full w-full border-2 rounded-b text-xl">
        No hay registros de cierres en la base de datos
      </div>
    );
  }

  return (
    <>
      {props.CierresList.length <= 0 ? (
        <div className="flex justify-center items-center h-full w-full border-2 rounded-b text-xl">
          No hay registros de cierres en la base de datos
        </div>
      ) : (
        props.CierresList.slice(elementsPerPage * (props.currentPage - 1), props.currentPage * elementsPerPage).map(
          (p, index) => {
            return (
              <div key={`FilaProdTable${p._id}`}>
                <FilaCierre cierres={props.CierresList} setAllCierres={props.SetCierres} cierre={p} tpvs={props.Tpvs} />
              </div>
            );
          }
        )
      )}
    </>
  );
};

const FilaCierre = (props: { cierres: Cierre[]; setAllCierres: Function; cierre: Cierre; tpvs: ITPV[] }) => {
  const [currentCierre, setCurrentCierre] = useState<Cierre>(props.cierre);
  const [showModal, setModal] = useState<boolean>(false);

  const tpv =
    props.tpvs.find((t) => {
      return t._id === props.cierre.tpv;
    })?.nombre || "Cargando...";

  const SetCurrentCierre = (c: Cierre | null) => {
    if (c === null) {
      const cierres = props.cierres.filter((cierre) => {
        return cierre._id !== props.cierre._id;
      });
      props.setAllCierres(cierres);

      return;
    }

    setCurrentCierre(c);
  };

  if (!currentCierre) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="hover:bg-blue-200">
      <div
        className="flex justify-between border-b px-5 py-2 cursor-pointer"
        onClick={() => {
          setModal(true);
        }}
      >
        <div className="hidden sm:block w-full sm:w-1/4 text-left">{tpv}</div>
        <div className="w-full sm:w-1/4 text-left">{new Date(Number(currentCierre.cierre)).toLocaleString()}</div>
        <div className="hidden sm:block w-full sm:w-1/4 text-left sm:text-right">{currentCierre.cerradoPor.nombre}</div>
        <div className="w-full sm:w-1/4 text-right">{currentCierre.ventasTotales.toFixed(2)}€</div>
      </div>
      <AnimatePresence>
        {showModal && <VerCierre showModal={setModal} setCierre={SetCurrentCierre} cierre={currentCierre} tpv={tpv} />}
      </AnimatePresence>
    </div>
  );
};
