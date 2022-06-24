import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import SummaryCard from "../../components/dataDisplay/summaryCard";
import FinanceCard from "../../components/dataDisplay/finaceCard";
import LineChart from "../../components/dataDisplay/lineChart";
import PieChart from "../../components/dataDisplay/pieChart";
import useEmpleadoContext from "../../context/empleadoContext";
import getJwtFromString from "../../hooks/jwt";
import DashboardLayout from "../../layout";
import { SesionEmpleado } from "../../tipos/Empleado";
import { Roles } from "../../tipos/Enums/Roles";
import BarChart from "../../components/dataDisplay/barChart";

const saludos = ['Bienvenido otra vez', 'Hola', 'Saludos'];

const Home = (props: { EmpleadoSesion: SesionEmpleado }) => {
  const [saludo, setSaludo] = useState<string>();
  const { Empleado, SetEmpleado } = useEmpleadoContext();

  useEffect(() => {
    if (Object.keys(Empleado).length === 0) {
      SetEmpleado(props.EmpleadoSesion);
    }
    const GetData = async () => {
      setSaludo(`${saludos[Math.floor(Math.random() * (saludos.length - 0))]}`);
    }
    GetData()
  }, []);

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
        <div className="flex flex-col gap-2">
          <SummaryCard titulo="Total de hoy" valorEfectivo={50.34} valorTarjeta={27.37} />
          <div className="w-1/2">
            <BarChart titulo="Movimiento" data={[33, 53, 85]} labels={["Bebida", "Bollería salada", "Panadería"]} />
          </div>
          <div className="w-40">
            <FinanceCard titulo="Ventas" valor={500.34} crecimiento={5.4} />
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-3 h-full w-full items-end">
            <LineChart titulo="Movimiento" data={[33, 53, 85, 41, 44, 65, 3, 60]} labels={["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]} />
            <div className="" id="ventasPorDia">
              <LineChart titulo="Ventas diarias" data={[33, 53, 85, 41, 44, 65, 3]} labels={["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]} />
            </div>
            <div className="" id="famMasVendidos">
              <PieChart titulo="Familias más vendidas" data={[33, 53, 85, 41, 44, 65]} labels={["Bebida", "Panaderia", "Bollería salada", "Bollería dulce", "Snacks", "Congelados"]} />
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
  jwt.TPV ? emp.TPV = jwt.TPV : null;

  return {
    props: {
      EmpleadoSesion: emp as SesionEmpleado
    }
  }
}

export default Home;