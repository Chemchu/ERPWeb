import React from 'react';
import ReactDOM from 'react-dom';
import './app/index.css';
import App from './app/App';
import './app/index.css';
import reportWebVitals from './webHealth/reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './componentes/dashboard/dashboard.js'; 
import LoginPage from './componentes/login/loginPage';
import NotFound from './componentes/404/notFound.js';
import HiddenSideBar from './componentes/sidebar/sideBarHidden';
import PointOfSale from './componentes/pointOfSale/pointOfSale';
import ProductCard from './componentes/pointOfSale/productCard';
import ReportCard from './componentes/dashboard/reportCards';
import ProductPage from './componentes/productPage/productPage';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route exact path = "/" component={App}/>
        <Route exact path = "/login" component={LoginPage}/>
        <Route exact path = "/perfil" component= {Dashboard}/> 
        <Route exact path = "/notfound" component= {NotFound}/> 
        <Route exact path = "/hidden" component= {HiddenSideBar}/> 
        <Route exact path = "/pos" component= {PointOfSale}/>         
        <Route exact path = "/pCard" component= {ProductCard}/>       
        <Route exact path = "/rCard" component= {ReportCard}/>   
        <Route exact path = "/productos" component= {ProductPage}/> 
      </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
