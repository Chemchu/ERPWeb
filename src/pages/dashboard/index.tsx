import React, { useState } from "react";
import Dropdown from "../../components/Forms/dropdown";
import UploadFile from "../../components/Forms/uploadFile";
import DashboardLayout from "../../layout";
import { TipoDocumento } from "../../tipos/Enums/TipoDocumentos";

const Home = () => {
  const [nombre, setNombre] = useState<string>();

  return (
    <div>
      <UploadFile tipoDocumento={TipoDocumento.Productos} />
      <Dropdown elementos={["Gus", "Luca", "Migue"]} selectedElemento={nombre} setElemento={setNombre} />
    </div>
  )
}

Home.PageLayout = DashboardLayout;

export default Home;