import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importamos el hook
import fondo from "./assets/background.gif";
import logo from "./assets/Logo_MoveSmart.png";
import reservarImg from "./assets/img_reservar.png";
import recargarImg from "./assets/img_recargar.png";
import planearImg from "./assets/img_planear.png";
import beneficiosImg from "./assets/img_beneficios.png";
import "./App.css";

function App() {
  const navigate = useNavigate(); // 👈 inicializamos el hook

  return (
    <div className="main-container">
      {/* 🔝 NAVBAR FIJA ENCIMA DEL CONTENIDO */}
      <nav className="navbar-overlay animate-fadeDown">
        <div className="navbar-left">
          <img
            src={logo}
            alt="MoveSmart Logo"
            className="navbar-logo hover-scale"
          />
        </div>
        <div className="navbar-right">
          <button
            className="navbar-button glow-hover"
            onClick={() => navigate("/login")} // 👈 redirige a la ruta /login
          >
            Iniciar sesión
          </button>
        </div>
      </nav>

      {/* 🎞️ HERO CON GIF DE FONDO */}
      <section
        className="hero-section animate-fadeIn"
        style={{
          backgroundImage: `url(${fondo})`,
        }}
      >
        <div className="overlay"></div>

        {/* Contenido central */}
        <div className="content">
          <h1 className="title animate-slideUp">
            MOVE
            <br />
            SMART
          </h1>
          <h2 className="subtitle animate-slideUp delay-200">RENTAL</h2>
        </div>
      </section>

      {/* 🌍 Sección informativa */}
      <section className="info-section animate-fadeInUp">
        <h2 className="info-title">
          ¿Qué puedes hacer en <span className="highlight">MoveSmart</span>?
        </h2>

        <div className="info-cards">
          <div className="card hover-pop">
            <img src={reservarImg} alt="Reservar bicicletas" className="card-image" />
            <i className="fa-solid fa-bicycle icon"></i>
            <h3>Reservar bicicletas</h3>
            <p>Selecciona y reserva bicicletas eléctricas desde cualquier estación cercana.</p>
          </div>

          <div className="card hover-pop delay-100">
            <img src={recargarImg} alt="Recargar saldo" className="card-image" />
            <i className="fa-solid fa-bolt icon"></i>
            <h3>Recargar saldo</h3>
            <p>Agrega fondos a tu cuenta de forma rápida y segura para tus viajes.</p>
          </div>

          <div className="card hover-pop delay-200">
            <img src={planearImg} alt="Planear rutas" className="card-image" />
            <i className="fa-solid fa-map-location-dot icon"></i>
            <h3>Planear rutas</h3>
            <p>Consulta rutas óptimas según tu destino y estado de carga de la bicicleta.</p>
          </div>

          <div className="card hover-pop delay-300">
            <img src={beneficiosImg} alt="Beneficios y descuentos" className="card-image" />
            <i className="fa-solid fa-star icon"></i>
            <h3>Beneficios y descuentos</h3>
            <p>Acumula puntos de fidelidad y obtén descuentos automáticos en tus recorridos.</p>
          </div>
        </div>
      </section>

      {/* 🧾 Footer */}
      <footer className="footer animate-fadeIn delay-500">
        © 2025 MoveSmart. Todos los derechos reservados.
        <br />
        Desarrollado por el equipo de Ingeniería de Software — Universidad El Bosque.
      </footer>
    </div>
  );
}

export default App;
