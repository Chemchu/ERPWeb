import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import useEmpleadoContext from "../../context/empleadoContext";
import getJwtFromString from "../../hooks/jwt";
import DashboardLayout from "../../layout";
import { SesionEmpleado } from "../../tipos/Empleado";

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

  const saludos = ['Bienvenido otra vez', 'Hola', 'Saludos'];

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
    </div>
  )
}

Home.PageLayout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jwt = getJwtFromString(context.req.cookies.authorization);
  const emp: SesionEmpleado = {
    _id: jwt._id,
    apellidos: jwt.apellidos,
    email: jwt.email,
    nombre: jwt.nombre,
    rol: jwt.rol,
    TPV: jwt.TPV
  }

  return {
    props: {
      EmpleadoSesion: emp
    }
  }
}

export default Home;