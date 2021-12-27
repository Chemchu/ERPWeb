import React, { useEffect } from "react";
import { Inicio } from "../../components/Tabs/Inicio";
import useClientContext from "../../context/clientContext";
import useProductContext from "../../context/productContext";
import Layout from "../../layout";
import { Cliente } from "../../tipos/Cliente";
import { Producto } from "../../tipos/Producto";
import { CreateClientList, CreateProductList } from "../../utils/typeCreator";

const Home = () => {
  return (
    <Inicio />
  )
}

Home.PageLayout = Layout;

export default Home;