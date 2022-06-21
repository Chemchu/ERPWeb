import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import LineChart from "../../components/dataDisplay/lineChart";
import useEmpleadoContext from "../../context/empleadoContext";
import getJwtFromString from "../../hooks/jwt";
import DashboardLayout from "../../layout";
import { SesionEmpleado } from "../../tipos/Empleado";
import { Roles } from "../../tipos/Enums/Roles";

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
    <div className="flex flex-col p-2 text-gray-700">
      <h1 className="text-4xl">
        {`${saludo},  ${Empleado.nombre.charAt(0).toUpperCase() + Empleado.nombre.slice(1)}`}
      </h1>

      <div className="w-96 h-96">
        <LineChart titulo="Ventas por hora" data={[33, 53, 85, 41, 44, 65]} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} />
      </div>
    </div>
  )
}

Home.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const jwt = getJwtFromString(context.req.cookies.authorization);

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