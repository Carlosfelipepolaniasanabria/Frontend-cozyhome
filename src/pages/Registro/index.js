import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import "./index.css";

export default function Registro() {
    const [formData, setFormData] = useState({
        primer_Nombre: "",
        segundo_Nombre: "",
        primer_Apellido: "",
        segundo_Apellido: "",
        identificacion: "",
        correo: "",
        contrasena: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://cozyhome-backend-1050517811871.northamerica-south1.run.app/api/clients/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "Usuario registrado correctamente",
                    confirmButtonColor: "#7b2ff7"
                });
                console.log("Datos guardados:", data);
                setFormData({
                    primer_Nombre: "",
                    segundo_Nombre: "",
                    primer_Apellido: "",
                    segundo_Apellido: "",
                    identificacion: "",
                    correo: "",
                    contrasena: "",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Error: ${data.message}`,
                    confirmButtonColor: "#7b2ff7"
                });
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo conectar con el servidor",
                confirmButtonColor: "#7b2ff7"
            });
        }
    };

    return (       
        <div className="login-page">
            <div className="cozy-login-container" style={{ maxWidth: '500px' }}> 
                <div className="cozy-header">
                    <h2 className="cozy-title">Crear Cuenta</h2>
                    <p className="cozy-subtitle">
                        O <Link to="/login" className="cozy-link-inline">inicia sesión</Link>
                    </p>
                </div>
                
                <section>
                    <form className="cozy-form" onSubmit={handleSubmit}>
                        <div className="cozy-input-group">
                            <label htmlFor="primer_Nombre">Primer Nombre</label>
                            <input 
                                id="primer_Nombre"
                                name="primer_Nombre"
                                className="cozy-input"
                                placeholder='Tu primer nombre'
                                value={formData.primer_Nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="cozy-input-group">
                            <label htmlFor="segundo_Nombre">Segundo Nombre</label>
                            <input 
                                id="segundo_Nombre"
                                name="segundo_Nombre"
                                className="cozy-input"
                                placeholder='Tu segundo nombre'
                                value={formData.segundo_Nombre}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="cozy-input-group">
                            <label htmlFor="primer_Apellido">Primer Apellido</label>
                            <input 
                                id="primer_Apellido"
                                name="primer_Apellido"
                                className="cozy-input"
                                placeholder='Tu primer apellido'
                                value={formData.primer_Apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="cozy-input-group">
                            <label htmlFor="segundo_Apellido">Segundo Apellido</label>
                            <input 
                                id="segundo_Apellido"
                                name="segundo_Apellido"
                                className="cozy-input"
                                placeholder='Tu segundo apellido'
                                value={formData.segundo_Apellido}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="cozy-input-group">
                            <label htmlFor="identificacion">Identificación</label>
                            <input 
                                id="identificacion"
                                name="identificacion"
                                className="cozy-input"
                                placeholder='Tu número de identificación'
                                value={formData.identificacion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="cozy-input-group">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input 
                                id="correo"
                                name="correo"
                                className="cozy-input"
                                type="email"
                                placeholder='tu.correo@ejemplo.com'
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="cozy-input-group">
                            <label htmlFor="contrasena">Contraseña</label>
                            <input 
                                id="contrasena"
                                name="contrasena"
                                className="cozy-input"
                                type='password' 
                                placeholder='Crea una contraseña segura'
                                value={formData.contrasena}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="cozy-button">Registrarse</button>
                    </form>
                    
                    <div className="cozy-links">
                        <Link to="/" className="cozy-link">Volver al Inicio</Link>
                    </div>
                </section>
            </div>
        </div>       
    );
}