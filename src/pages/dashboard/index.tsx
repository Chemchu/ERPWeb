import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import SummaryCard from "../../components/dataDisplay/summaryCard";
import FinanceCard from "../../components/dataDisplay/finaceCard";
import useEmpleadoContext from "../../context/empleadoContext";
import getJwtFromString from "../../hooks/jwt";
import DashboardLayout from "../../layout";
import { SesionEmpleado } from "../../tipos/Empleado";
import { Roles } from "../../tipos/Enums/Roles";
import { Summary, VentasPorHora } from "../../tipos/Summary";
import { FetchResumenDiario } from "../../utils/fetches/analisisFetches";
import { Color } from "../../tipos/Enums/Color";
import dynamic from "next/dynamic";

const VentasDelDia = dynamic(() => import("../../components/dataDisplay/ventasDelDia"), { ssr: false });
const saludos = ["Bienvenido otra vez", "Hola", "Saludos"];

const Home = (props: { EmpleadoSesion: SesionEmpleado }) => {
  const [saludo, setSaludo] = useState<string>();
  const { Empleado, SetEmpleado } = useEmpleadoContext();
  const [summaryToday, setSummaryToday] = useState<Summary | undefined>(undefined);
  const [summaryYesterday, setSummaryYesterday] = useState<Summary | undefined>(undefined);

  useEffect(() => {
    if (Object.keys(Empleado).length === 0) {
      SetEmpleado(props.EmpleadoSesion);
    }

    const GetData = () => {
      setSaludo(`${saludos[Math.floor(Math.random() * (saludos.length - 0))]}`);
    };
    const GetSummaryData = async () => {
      const hoy = new Date();
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);

      setSummaryToday(await FetchResumenDiario(hoy));
      setSummaryYesterday(await FetchResumenDiario(ayer));
    };
    GetData();
    GetSummaryData();
  }, []);

  let maxY = -1;
  const offset = 10;
  if (summaryToday && summaryYesterday) {
    const ventasHora = [...summaryToday.ventasPorHora, ...summaryYesterday.ventasPorHora];
    for (let index = 0; index < ventasHora.length; index++) {
      const ventaHora: VentasPorHora = ventasHora[index];

      if (ventaHora.totalVentaHora > maxY) {
        maxY = ventaHora.totalVentaHora;
      }
    }
    maxY = Math.ceil(maxY / 10) * 10;
  }

  if (!Empleado || !Empleado.nombre) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      className="flex flex-col gap-8 w-full h-full p-4 overflow-y-scroll bg-white dark:bg-gray-800
      sm:rounded-l-3xl border sm:shadow-lg"
    >
      <h1 className="text-3xl lg:text-4xl text-gray-700">
        {`${saludo},  ${Empleado.nombre.charAt(0).toUpperCase() + Empleado.nombre.slice(1)}`}
      </h1>
      <div className="flex flex-col w-full gap-3">
        <SummaryCard titulo="Ventas totales" data={summaryToday} />
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="w-full sm:w-44 xl:w-72">
            <FinanceCard
              titulo="Ventas"
              dataActual={summaryToday?.totalVentas.toFixed(2)}
              dataPrevio={summaryYesterday?.totalVentas.toFixed(2)}
            />
          </div>
          {Empleado.rol !== Roles.Cajero ? (
            <div className="w-full sm:w-44 xl:w-72">
              <FinanceCard
                titulo="Beneficio"
                dataActual={summaryToday?.beneficio.toFixed(2)}
                dataPrevio={summaryYesterday?.beneficio.toFixed(2)}
              />
            </div>
          ) : (
            <div className="w-full sm:w-44 xl:w-72">
              <FinanceCard
                titulo="Media"
                dataActual={summaryToday?.mediaVentas.toFixed(2)}
                dataPrevio={summaryYesterday?.mediaVentas.toFixed(2)}
              />
            </div>
          )}
          <div className="w-full sm:w-44 xl:w-72">
            <FinanceCard
              titulo="Tickets"
              unidad="uds"
              dataActual={summaryToday && String(summaryToday?.numVentas)}
              dataPrevio={summaryToday && String(summaryYesterday?.numVentas)}
            />
          </div>
          <div className="w-full sm:w-44 xl:w-72">
            <FinanceCard
              titulo="Productos"
              unidad="uds"
              dataActual={summaryToday && String(summaryToday?.cantidadProductosVendidos)}
              dataPrevio={summaryYesterday && String(summaryYesterday?.cantidadProductosVendidos)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
          <div className="w-full sm:w-1/2 h-full">
            <VentasDelDia
              data={summaryToday}
              titulo="Ventas de hoy"
              ejeY="totalVentaHora"
              ejeX="hora"
              nombreEjeX="Vendido"
              color={Color.GREEN}
              colorID={"verde"}
              maxY={maxY + offset}
            />
          </div>
          <div className="w-full sm:w-1/2 h-full">
            <VentasDelDia
              data={summaryYesterday}
              titulo="Ventas de ayer"
              ejeY="totalVentaHora"
              ejeX="hora"
              nombreEjeX="Vendido"
              color={Color.BLUE}
              colorID={"azul"}
              maxY={maxY + offset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [jwt, isValidCookie] = getJwtFromString(context.req.cookies.authorization);

  if (!isValidCookie) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }

  let emp: SesionEmpleado = {
    _id: jwt._id,
    apellidos: jwt.apellidos,
    email: jwt.email,
    nombre: jwt.nombre,
    rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
  };

  if (jwt.TPV) {
    emp.TPV = jwt.TPV;
  }

  return {
    props: {
      EmpleadoSesion: emp as SesionEmpleado,
    },
  };
};

export default Home;
