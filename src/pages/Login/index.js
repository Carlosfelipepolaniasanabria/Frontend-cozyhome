import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-cozyhome.onrender.com/api/clients/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || data.error || "Error en el login");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

 
      window.dispatchEvent(new Event("userChanged"));

      if (data.user.rol === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/productos";
      }

    } catch (error) {
      console.error("Error de login:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login">
      <div className="cozy-login-container"> 
        <div className="cozy-header">
          <h2 className="cozy-title">Welcome back</h2>
          <p className="cozy-subtitle">
            Or <Link to="/registro" className="cozy-link-inline">create an account</Link>
          </p>
        </div>

        <section>
          <form className="cozy-form" onSubmit={handleSubmit}>
            <div className="cozy-input-group">
              <label>Email address</label>
              <input
                className="cozy-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="cozy-input-group">
              <label>Password</label>
              <input
                className="cozy-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="cozy-button">
              Sign in
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

