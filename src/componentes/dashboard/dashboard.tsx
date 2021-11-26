import SideBar from './sidebar/sidebar';
import { Route, Switch, Router, Link, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { POS } from "./Tabs/pointOfSale/pos";
import { ProductPage } from './Tabs/productosTab';
import { SalesPage } from './Tabs/Ventas/ventasTabs';

export const Dashboard = (props: {isSidebarCollapsed: boolean, setSidebarCollapsed: Function}) => {
  let { path, url } = useRouteMatch();
  const location = useLocation();

  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative">
        <div className="flex items-start justify-start">
          <div className="m-2">
            <SideBar isCollapsed={props.isSidebarCollapsed} setCollapsed={props.setSidebarCollapsed} />
          </div>
          <div className="w-screen h-screen">
            <Switch location={location} key={location.key}>
              <Route key={`${url}/`} path={`${url}/`} exact children={<div>Home</div>} />
              <Route key={`${url}/pos`} path={`${url}/pos`} exact children={<POS/>} />
              <Route key={`${url}/productos`} path={`${url}/productos`} exact children={<ProductPage/>} />
              <Route key={`${url}/stats`} path={`${url}/stats`} exact children={<div>Estadísticas</div>} />
              <Route key={`${url}/sales`} path={`${url}/sales`} exact children={<SalesPage/>} />
              <Route key={`${url}/help`} path={`${url}/help`} exact children={<div>Ayuda</div>} />
            </Switch>
          </div>
        </div>
    </main>
  )
}

