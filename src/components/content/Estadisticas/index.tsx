import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import { Empleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";
import { Summary } from "../../../tipos/Summary";
import AuthorizationWrapper from "../../authorizationWrapper";
import FinanceCard from "../../dataDisplay/finaceCard";
import { FetchResumenDiario, FetchResumenRango } from "../../../utils/fetches/analisisFetches";
import { Color } from "../../../tipos/Enums/Color";
import SimpleListBox from "../../elementos/Forms/simpleListBox";
import { Tiempos } from "../../../tipos/Enums/Tiempos";
import DateRange from "../../elementos/Forms/dateRange";
import dynamic from "next/dynamic";

const FamiliasMasVendidasStats = dynamic(() => import("../../dataDisplay/familiasMasVendidasStats"), { ssr: false });
const VentasDelDia = dynamic(() => import("../../dataDisplay/ventasDelDia"), {
  ssr: false,
});
const ProductosMasVendidosStats = dynamic(() => import("../../dataDisplay/productosMasVendidosStats"), { ssr: false });

const EstadisticasPage = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [titulo, setTitulo] = useState<string>(Tiempos.Hoy);
  const [summary, setSummary] = useState<Summary | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<Tiempos>(Tiempos.Hoy);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const GetSummaryData = async () => {
      const fechaInicial = new Date();
      fechaInicial.setDate(fechaInicial.getDate());

      setSummary(await FetchResumenDiario(fechaInicial));
    };

    GetSummaryData();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const GetData = async () => {
      if (dateRange[0] && dateRange[1]) {
        setLoading(true);
        setTitulo("Fecha seleccionada");

        const inicial: Date = dateRange[0];
        const final: Date = dateRange[1];
        const fechaInicial = new Date(inicial.setHours(inicial.getHours() + 12));
        const fechaFinal = new Date(final.setHours(final.getHours() - 12));

        setSummary(await FetchResumenRango(fechaInicial, fechaFinal));
      }

      if (dateRange[0] == null && dateRange[1] == null) {
        setSummary(await FetchResumenDiario(new Date()));
      }
    };

    GetData();
  }, [dateRange]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const GetSummaryData = async () => {
      setLoading(true);
      let inicial = new Date();
      let final = new Date();

      switch (timeRange) {
        case Tiempos.Hoy:
          setSummary(await FetchResumenDiario(inicial));
          return;
        case Tiempos.Ayer:
          inicial.setDate(inicial.getDate() - 1);
          setSummary(await FetchResumenDiario(inicial));
          return;
        case Tiempos.EstaSemana:
          inicial = new Date(inicial.setDate(inicial.getDate() - inicial.getDay() + 1));
          final = new Date(final.setDate(final.getDate() - final.getDay() + 7));
          break;
        case Tiempos.SemanaPasada:
          inicial = new Date(inicial.setDate(inicial.getDate() - 7 - inicial.getDay() + 1));
          final = new Date(final.setDate(final.getDate() - 7 - final.getDay() + 7));
          break;
        case Tiempos.EsteMes:
          inicial = new Date(inicial.getFullYear(), inicial.getMonth(), 1);
          final = new Date(final.getFullYear(), final.getMonth() + 1, 0);
          break;

        case Tiempos.MesPasado:
          inicial = new Date(inicial.getFullYear(), inicial.getMonth() - 1, 1);
          final = new Date(final.getFullYear(), final.getMonth(), 0);
          break;

        default:
          break;
      }
      setTitulo(timeRange);
      setSummary(await FetchResumenRango(inicial, final));
    };
    GetSummaryData();
  }, [timeRange]);

  useEffect(() => {
    setLoading(false);
  }, [summary]);

  return (
    <div className="flex flex-col gap-4 h-full w-full bg-white sm:rounded-bl-3xl sm:rounded-tr-3xl p-4 shadow-lg border-x overflow-y-scroll">
      <div id="filtros" className="flex justify-end w-full z-20 gap-4">
        <DateRange
          titulo="Fecha"
          dateRange={dateRange}
          setDateRange={setDateRange}
          endDate={endDate}
          startDate={startDate}
          isClearable={true}
        />
        <div className="xl:w-72 w-52">
          <SimpleListBox
            elementos={[
              Tiempos.Hoy,
              Tiempos.Ayer,
              Tiempos.EstaSemana,
              Tiempos.SemanaPasada,
              Tiempos.EsteMes,
              Tiempos.MesPasado,
            ]}
            setElemento={setTimeRange}
            defaultValue={Tiempos.Hoy}
          />
        </div>
      </div>
      {!isLoading && (
        <div className="flex flex-wrap gap-2 justify-start xl:justify-center">
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Ventas"
              dataActual={summary?.totalVentas?.toFixed(2)}
              dataPrevio={summary?.totalVentas?.toFixed(2)}
            />
          </div>
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Efectivo"
              unidad="€"
              dataActual={summary?.totalEfectivo?.toFixed(2)}
              dataPrevio={summary?.totalEfectivo?.toFixed(2)}
            />
          </div>
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Tarjeta"
              unidad="€"
              dataActual={summary?.totalTarjeta?.toFixed(2)}
              dataPrevio={summary?.totalTarjeta?.toFixed(2)}
            />
          </div>
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Tickets"
              unidad="uds"
              dataActual={String(summary?.numVentas)}
              dataPrevio={String(summary?.numVentas)}
            />
          </div>
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Beneficio"
              dataActual={summary?.beneficio?.toFixed(2)}
              dataPrevio={summary?.beneficio?.toFixed(2)}
            />
          </div>
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Media"
              unidad="€"
              dataActual={summary?.mediaVentas?.toFixed(2)}
              dataPrevio={summary?.mediaVentas?.toFixed(2)}
            />
          </div>
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Máxima"
              unidad="€"
              dataActual={summary?.ventaMaxima?.toFixed(2)}
              dataPrevio={summary?.ventaMaxima?.toFixed(2)}
            />
          </div>
          <div className="xl:w-72 w-44">
            <FinanceCard
              titulo="Mínima"
              unidad="€"
              dataActual={summary?.ventaMinima?.toFixed(2)}
              dataPrevio={summary?.ventaMinima?.toFixed(2)}
            />
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            role="status"
            className="w-1/5 h-1/5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-between gap-4">
          {summary && (
            <div className="flex gap-4">
              <div className="w-1/2 h-full">
                <ProductosMasVendidosStats titulo="Productos más vendidos" data={summary?.productosMasVendidos} />
              </div>
              <div className="w-1/2 h-full">
                <FamiliasMasVendidasStats titulo="Familias más vendidas" data={summary?.familiasMasVendidas} />
              </div>
            </div>
          )}
          <div className="w-full h-full">
            <VentasDelDia
              data={summary}
              titulo={titulo}
              ejeY="totalVentaHora"
              ejeX="hora"
              nombreEjeX="Vendido"
              color={Color.GREEN}
              colorID={"verde"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorizationWrapper([Roles.Administrador, Roles.Gerente], true)(EstadisticasPage);
