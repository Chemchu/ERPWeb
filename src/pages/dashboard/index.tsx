import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import SummaryCard from "../../components/dataDisplay/summaryCard";
import FinanceCard from "../../components/dataDisplay/finaceCard";
import useEmpleadoContext from "../../context/empleadoContext";
import getJwtFromString from "../../hooks/jwt";
import DashboardLayout from "../../layout";
import { SesionEmpleado } from "../../tipos/Empleado";
import { Roles } from "../../tipos/Enums/Roles";
import BarChart from "../../components/dataDisplay/barChart";
import { Summary } from "../../tipos/Summary";
import { FetchResumenDiario } from "../../utils/fetches/analisisFetches";
import { Color } from "../../tipos/Enums/Color";
import VentasDelDia from "../../components/dataDisplay/ventasDelDia";

const saludos = ['Bienvenido otra vez', 'Hola', 'Saludos'];

const Home = (props: { EmpleadoSesion: SesionEmpleado }) => {
  const [saludo, setSaludo] = useState<string>();
  const { Empleado, SetEmpleado } = useEmpleadoContext();
  const [summary, setSummary] = useState<Summary | undefined>(undefined);

  useEffect(() => {
    if (Object.keys(Empleado).length === 0) {
      SetEmpleado(props.EmpleadoSesion);
    }

    const GetData = () => {
      setSaludo(`${saludos[Math.floor(Math.random() * (saludos.length - 0))]}`);
    }
    const GetSummaryData = async () => {
      setSummary(await FetchResumenDiario(new Date(Date.now())))
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
    <div className="w-full h-screen py-3">
      <div className="flex flex-col gap-8 w-full h-full p-4 overflow-y-scroll bg-white rounded-2xl border shadow-lg">
        <h1 className="text-4xl">
          {`${saludo},  ${Empleado.nombre.charAt(0).toUpperCase() + Empleado.nombre.slice(1)}`}
        </h1>
        <div className="flex flex-col w-full gap-3">
          <SummaryCard titulo="Ventas totales" data={summary} />
          <div className="w-1/2 h-full">
            <VentasDelDia data={summary} titulo="Ventas del día" ejeX="totalVentaHora" ejeY="hora" nombreEjeX="Vendido" color={Color.BLUE} />
          </div>
          <div className="w-1/2">
            <BarChart titulo="Ventas por familias (hoy)" data={[33, 53, 85]} labels={["Bebida", "Bollería salada", "Panadería"]} />
          </div>
          <div className="w-40">
            <FinanceCard titulo="Ventas" data={summary} />
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
