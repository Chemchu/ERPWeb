import React, { useEffect, useState } from "react";
import UploadFile from "../../components/Forms/uploadFile";
import getJwt from "../../hooks/jwt";
import DashboardLayout from "../../layout";
import { TipoDocumento } from "../../tipos/Enums/TipoDocumentos";
import { JWT } from "../../tipos/JWT";

const Home = () => {
  const [jwt, setJwt] = useState<JWT>();
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    let unmounted = false;
    setJwt(getJwt());

    return () => {
      unmounted
    }
  }, []);

  useEffect(() => {
    if (!jwt) { return; }
    setUserName(jwt.nombre.charAt(0).toUpperCase() + jwt.nombre.slice(1));

  }, [jwt]);

  const saludos = ['Bienvenido otra vez', 'Hola', 'Saludos'];

  if (!jwt) {
    return (
      <div>
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 text-gray-700">
      <h1 className="text-4xl">
        {`${saludos[Math.floor(Math.random() * (saludos.length - 0))]}, ${userName}`}
      </h1>
      <UploadFile tipoDocumento={TipoDocumento.Productos} />
    </div>
  )
}

Home.PageLayout = DashboardLayout;

export default Home;