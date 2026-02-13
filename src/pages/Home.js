import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="cozy-hero">
        <div className="hero-container">

          <div className="hero-content">
            <h1 className="hero-title">Bienvenido a Cozy Home</h1>

            <p className="hero-subtitle">
              Descubre una cuidada selección de muebles y decoración para transformar tu espacio
              en un acogedor refugio. Tanto si amueblas una casa nueva como si renuevas una
              habitación, tenemos todo lo que necesitas para crear un espacio que te encantará.
            </p>

            <div className="hero-divider"></div>

            <div className="hero-buttons">
              <button
                className="hero-btn hero-btn-primary"
                onClick={() => navigate("/productos")}
              >
                Empieza a comprar
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img src="/images/inicio.png" alt="Cozy Home Interior" />
          </div>

        </div>
      </section>
    </>
  );
}
