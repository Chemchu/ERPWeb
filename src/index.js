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

ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route exact path = "/" component={App}/>
        <Route exact path = "/login" component={LoginPage}/>
        <Route exact path = "/perfil" component= {Dashboard}/> 
        <Route exact path = "/pene" component= {HiddenSideBar}/> 
      </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
