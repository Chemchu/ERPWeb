import { POS } from "../../components/Tabs/pointOfSale/pos";
import { ProductPage } from '../../components/Tabs/Productos/productosTab';
import { SalesPage } from '../../components/Tabs/Ventas/ventasTabs';
import { Inicio } from '../../components/Tabs/Inicio/inicio';
import React, { useState } from "react";
import SideBar from "../../components/sidebar/sidebar";

const Dashboard = (props: any) => {
  // let { path, url } = useRouteMatch();
  // const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative">
        <div className="flex items-start justify-start">
          <div className="m-2">
            <SideBar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          </div>
          <div className="w-screen h-screen">
            {/* <Switch location={location} key={location.key}>
              <Route key={`${url}/`} path={`${url}/`} exact children={<Inicio/>} />
              <Route key={`${url}/pos`} path={`${url}/pos`} exact children={<POS/>} />
              <Route key={`${url}/productos`} path={`${url}/productos`} exact children={<ProductPage/>} />
              <Route key={`${url}/stats`} path={`${url}/stats`} exact children={<div>Estadísticas</div>} />
              <Route key={`${url}/sales`} path={`${url}/sales`} exact children={<SalesPage/>} />
              <Route key={`${url}/help`} path={`${url}/help`} exact children={<div>Ayuda</div>} />
            </Switch> */}
            {props.children}
          </div>
        </div>
    </main>
  )
}

export default Dashboard;