import React, { useState } from "react";
import Dropdown from "../../components/Forms/dropdown";
import UploadFile from "../../components/Forms/uploadFile";
import CerrarCaja from "../../components/modal/cerrarCaja";
import DashboardLayout from "../../layout";
import { TipoDocumento } from "../../tipos/Enums/TipoDocumentos";

const Home = () => {
  const [foo, bar] = useState()

  return (
    <div>
      <UploadFile tipoDocumento={TipoDocumento.Productos} />
      {/* <CerrarCaja handleClose={bar} /> */}
    </div>
  )
}

Home.PageLayout = DashboardLayout;

export default Home;