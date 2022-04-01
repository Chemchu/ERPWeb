import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import useEmpleadoContext from "../../context/empleadoContext";
import DashboardLayout from "../../layout";
import { Empleado } from "../../tipos/Empleado";
import { JWT } from "../../tipos/JWT";
import { FetchCurrentUser } from "../../utils/fetches";

const Home = (props: { empleado: Empleado }) => {
  const [saludo, setSaludo] = useState<string>();
  const { Empleado } = useEmpleadoContext();

  // useEffect(() => {
  //   let unmounted = false;
  //   //setJwt(getJwt());

  //   return () => {
  //     unmounted
  //   }
  // }, []);

  useEffect(() => {
    const GetData = async () => {
      setSaludo(`${saludos[Math.floor(Math.random() * (saludos.length - 0))]}`);
    }
    GetData()
  }, []);

  const saludos = ['Bienvenido otra vez', 'Hola', 'Saludos'];

  if (!Empleado) {
    return (
      <div>
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 text-gray-700">
      <h1 className="text-4xl">
        {/* {`${saludo},  ${Empleado.nombre.charAt(0).toUpperCase() + Empleado.nombre.slice(1)}`} */}
      </h1>
    </div>
  )
}

Home.PageLayout = DashboardLayout;
export default Home;