import { Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from '../componentes/dashboard/dashboard'; 
import {Dashboard2} from '../componentes/dashboard/dashboard2'; 
import LoginPage from '../componentes/login/loginPage';
import NotFound from '../componentes/404/notFound';
import HiddenSideBar from '../componentes/dashboard/sidebar/sideBarHidden';
import Sidebar from '../componentes/dashboard/sidebar/sidebar';
import {ProductList} from '../componentes/pointOfSale/productList';
import {ProductCard} from '../componentes/pointOfSale/productCard';
import ReportCard from '../componentes/dashboard/reportCards';
import ProductPage from '../componentes/productPage/productPage';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '../componentes/landingPage/landingPage';
import { POS } from '../componentes/pointOfSale/posPagoFraccionado';

function App() {

    const location = useLocation();
    return(
        <AnimatePresence key={"AnimatePresenceApp"} initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
            <Switch location={location} key={location.key}>
                <Route exact path = "/" component={LandingPage}/>
                <Route exact path = "/login" component={LoginPage}/>
                <Route exact path = "/dashboard" component= {Dashboard}/> 
                <Route exact path = "/dashboard2" component= {Dashboard2}/> 
                <Route exact path = "/notfound" component= {NotFound}/> 
                <Route exact path = "/hidden" component= {HiddenSideBar}/> 
                <Route exact path = "/prodList" component= {ProductList}/>         
                <Route exact path = "/pos" component= {POS}/>    
                <Route exact path = "/pCard" component= {ProductCard}/>       
                <Route exact path = "/rCard" component= {ReportCard}/>   
                <Route exact path = "/productos" component= {ProductPage}/>   
            </Switch>
        </AnimatePresence>
    );    
}

export default App;