import React, { useEffect } from "react";
import { Inicio } from "../../components/sidebar/Inicio";
import DashboardLayout from "../../layout";

const Home = () => {
  return (
    <Inicio />
  )
}

Home.PageLayout = DashboardLayout;

export default Home;