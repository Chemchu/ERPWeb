import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import SummaryCard from "../../components/dataDisplay/summaryCard";
import FinanceCard from "../../components/dataDisplay/finaceCard";
import useEmpleadoContext from "../../context/empleadoContext";
import getJwtFromString from "../../hooks/jwt";
import DashboardLayout from "../../layout";
import { SesionEmpleado } from "../../tipos/Empleado";
import { Roles } from "../../tipos/Enums/Roles";
import { Summary } from "../../tipos/Summary";
import { FetchResumenDiario } from "../../utils/fetches/analisisFetches";
import { Color } from "../../tipos/Enums/Color";
import VentasDelDia from "../../components/dataDisplay/ventasDelDia";

const saludos = ['Bienvenido otra vez', 'Hola', 'Saludos'];

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
    }
    const GetSummaryData = async () => {
      const hoy = new Date()
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);

      setSummaryToday(await FetchResumenDiario(hoy))
      setSummaryYesterday(await FetchResumenDiario(ayer))
    }
    GetData()
    GetSummaryData()
  }, [])

  if (!Empleado.nombre) {
    return (
      <div>
        Cargando...
      </div>
    );
  }

  return (
    <div className="w-full h-screen py-3 text-gray-700">
      <div className="flex flex-col gap-8 w-full h-full p-4 overflow-y-scroll bg-white rounded-2xl border shadow-lg">
        <h1 className="text-4xl">
          {`${saludo},  ${Empleado.nombre.charAt(0).toUpperCase() + Empleado.nombre.slice(1)}`}
        </h1>
        <div className="flex flex-col w-full gap-3">
          <SummaryCard titulo="Ventas totales" data={summaryToday} />
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="xl:w-72 w-40">
              <FinanceCard titulo="Ventas" dataActual={summaryToday?.totalVentas.toFixed(2)} dataPrevio={summaryYesterday?.totalVentas.toFixed(2)} />
            </div>
            <div className="xl:w-72 w-40">
              <FinanceCard titulo="Beneficio" dataActual={summaryToday?.beneficio.toFixed(2)} dataPrevio={summaryYesterday?.beneficio.toFixed(2)} />
            </div>
            <div className="xl:w-72 w-40">
              {/* <FinanceCard titulo="Tickets" unidad="uds" dataActual={String(summaryToday?.numVentas)} dataPrevio={String(summaryYesterday?.numVentas)} /> */}
              <FinanceCard titulo="Tickets" unidad="uds" dataActual={summaryToday && String(summaryToday?.numVentas)} dataPrevio={summaryToday && String(summaryYesterday?.numVentas)} />
            </div>
            <div className="xl:w-72 w-40">
              <FinanceCard titulo="IVA" dataActual={summaryToday?.ivaPagado.toFixed(2)} dataPrevio={summaryYesterday?.ivaPagado.toFixed(2)} />
            </div>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div className="w-1/2 h-full">
              <VentasDelDia data={summaryToday} titulo="Ventas de hoy" ejeX="totalVentaHora" ejeY="hora" nombreEjeX="Vendido" color={Color.GREEN} colorID={"verde"} />
            </div>
            <div className="w-1/2 h-full">
              <VentasDelDia data={summaryYesterday} titulo="Ventas de ayer" ejeX="totalVentaHora" ejeY="hora" nombreEjeX="Vendido" color={Color.BLUE} colorID={"azul"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [jwt, isValidCookie] = getJwtFromString(context.req.cookies.authorization);

  if (!isValidCookie) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`
      },
    };
  }

  let emp: SesionEmpleado = {
    _id: jwt._id,
    apellidos: jwt.apellidos,
    email: jwt.email,
    nombre: jwt.nombre,
    rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
  }

  if (jwt.TPV) {
    emp.TPV = jwt.TPV
  }

  return {
    props: {
      EmpleadoSesion: emp as SesionEmpleado
    }
  }
}

export default Home;
