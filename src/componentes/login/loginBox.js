import axios from 'axios';
import React, { useState, useEffect } from 'react';

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function SubmitLogin(e) {
    const loginPostConfig = {
      method: 'post',
      url: 'https://localhost:8080/api/login',
      data: {
        firstName: username,
        lastName: password
      }
    }

    axios.post(loginPostConfig).then(
      (autorizado) => {
        if(autorizado) {
          // Redireccionar menu principal
        }
        else {
          // Pop up login fallido
        }
      }
    );
  };

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
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}/>
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