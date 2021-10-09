import React from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from '../componentes/dashboard/dashboard.js'; 
import LoginPage from '../componentes/login/loginPage';
import NotFound from '../componentes/404/notFound.js';
import HiddenSideBar from '../componentes/dashboard/sidebar/sideBarHidden';
import Sidebar from '../componentes/dashboard/sidebar/sidebar';
import PointOfSale from '../componentes/pointOfSale/pointOfSale';
import ProductCard from '../componentes/pointOfSale/productCard';
import ReportCard from '../componentes/dashboard/reportCards';
import ProductPage from '../componentes/productPage/productPage';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '../componentes/landingPage/landingPage.js';

function App() {
    //const location = useLocation();
    return(
        <BrowserRouter>
            {/* <Sidebar/> */}
            <AnimatePresence>
            <Switch >
                <Route exact path = "/" component={LandingPage}/>
                <Route exact path = "/login" component={LoginPage}/>
                <Route exact path = "/perfil" component= {Dashboard}/> 
                <Route exact path = "/notfound" component= {NotFound}/> 
                <Route exact path = "/hidden" component= {HiddenSideBar}/> 
                <Route exact path = "/pos" component= {PointOfSale}/>         
                <Route exact path = "/pCard" component= {ProductCard}/>       
                <Route exact path = "/rCard" component= {ReportCard}/>   
                <Route exact path = "/productos" component= {ProductPage}/>   
            </Switch>
            </AnimatePresence>
        </BrowserRouter>
    );    
}

export default App;