import axios from 'axios';
import React, { MouseEventHandler } from 'react';

function SubmitLogin(e: React.MouseEvent<HTMLElement>): void {
    console.log("Hacer lógica de login");

    axios.get('https://localhost:8080/api/productos/').then(res => console.log(res));

}

function LoginBox() {
    return (
        <div className="inner-container">
          <div className="header">
            Iniciar sesión
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"/>
            </div>
  
            <button
              type="button"
              className="login-btn"
              onClick={SubmitLogin}>Acceder
            </button>

          </div>
        </div>
      );
}

export default LoginBox;