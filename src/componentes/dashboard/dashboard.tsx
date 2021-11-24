import {AnimatePresence} from 'framer-motion';
import SideBar from './sidebar/sidebar';
import { Route, Switch, Router, Link, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { POS } from "../pointOfSale/pos";

export default function Dashboard() {
  let { path, url } = useRouteMatch();
  const location = useLocation();

    return (
      <main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative">
          <div className="flex items-start justify-start gap-4">
            <div className="border-2 rounded-xl">
              <SideBar />
            </div>
            <div className="w-screen h-screen">
              <Switch location={location}>
                <Route key={`${url}/`} path={`${url}/`} exact children={<div>Home</div>} />
                <Route key={`${url}/pos`} path={`${url}/pos`} exact children={<POS/>} />
                <Route key={`${url}/productos`} path={`${url}/productos`} exact children={<div>Productos</div>} />
                <Route key={`${url}/stats`} path={`${url}/stats`} exact children={<div>Estadísticas</div>} />
                <Route key={`${url}/sales`} path={`${url}/sales`} exact children={<div>Ventas</div>} />
                <Route key={`${url}/help`} path={`${url}/help`} exact children={<div>Ayuda</div>} />
              </Switch>
            </div>
          </div>
      </main>
  )
}
