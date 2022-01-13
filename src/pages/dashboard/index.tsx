import React, { useEffect } from "react";
import UploadFile from "../../components/Forms/uploadFile";
import { Inicio } from "../../components/sidebar/Inicio";
import DashboardLayout from "../../layout";
import { TipoDocumento } from "../../tipos/Enums/TipoDocumentos";

const Home = () => {
  return (
    <UploadFile tipoDocumento={TipoDocumento.Productos} />
  )
}

Home.PageLayout = DashboardLayout;

export default Home;