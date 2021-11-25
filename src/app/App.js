import { Route, Switch, useLocation } from 'react-router-dom';
import {Dashboard} from '../componentes/dashboard/dashboard'; 
import LoginPage from '../componentes/login/loginPage';
import NotFound from '../componentes/404/notFound';
import {ProductList} from '../componentes/dashboard/Tabs/pointOfSale/productList';
import ReportCard from '../componentes/dashboard/reportCards';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '../componentes/landingPage/landingPage';
import {useState} from 'react'

function App() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    return(
        <div>
            <AnimatePresence key={"AnimatePresenceApp"} initial={false} exitBeforeEnter={true}>
                <Switch location={location} key={location.key}>
                    <Route exact path = "/" component={LandingPage}/>
                    <Route exact path = "/login" component={LoginPage}/>
                    <Route path = "/dashboard" children={<Dashboard isSidebarCollapsed={isSidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>} />
                    <Route exact path = "/notfound" component={NotFound}/> 
                    <Route exact path = "/prodList" component={ProductList}/>       
                    <Route exact path = "/rCard" component={ReportCard}/>   
                </Switch>
            </AnimatePresence>
        </div>
    );    
}

export default App;