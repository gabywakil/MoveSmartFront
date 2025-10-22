import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/Logo_MoveSmart.png";
import "./css/Servicios.css"; // ⚡ nombre único para evitar conflictos

const ServiciosPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="servicios__page">
      {/* 🧭 HEADER */}
      <header className="servicios__header">
        <div className="servicios__header-container">
          <div className="servicios__logo-section" onClick={() => navigate("/")}>
            <img src={logo} alt="MoveSmart Logo" className="servicios__logo-icon" />
            <h1 className="servicios__logo-title">MoveSmart</h1>
          </div>

          <nav className="servicios__nav">
          <button className="nav-button" onClick={() => navigate("/home")}>
              Inicio
            </button>
            <button className="nav-button active" onClick={() => navigate("/servicios")}>
              Servicios
            </button>
            <button className="nav-button" onClick={() => navigate("/bicicletas")}>
              Bicicletas
            </button>
          </nav>
        </div>
      </header>

      {/* 🎨 HERO */}
      <section className="servicios__hero">
        <div className="servicios__hero-content">
          <h1 className="servicios__hero-title">Nuestros Servicios</h1>
          <p className="servicios__hero-subtitle">
            Descubre cómo <strong>MoveSmart</strong> transforma la movilidad urbana 🚴‍♀️
          </p>

          <div className="servicios__badges">
            <div className="servicios__badge">Disponibilidad 24/7</div>
            <div className="servicios__badge">Cero emisiones 🌱</div>
            <div className="servicios__badge">App intuitiva 📱</div>
            <div className="servicios__badge">Calidad garantizada ⭐</div>
          </div>
        </div>
      </section>

      {/* 🚴 SERVICIOS */}
      <section className="servicios__grid-section">
        <h2 className="servicios__section-title">¿Qué ofrecemos?</h2>

        <div className="servicios__grid">
          {[
            {
              icon: "🚴‍♂️",
              color: "#00a8c6",
              title: "Alquiler de Bicicletas",
              desc: "Accede a nuestra flota de bicicletas eléctricas y convencionales.",
              items: ["🔓 Desbloqueo instantáneo", "📍 GPS integrado", "🔋 Mantenimiento incluido"],
            },
            {
              icon: "🗺️",
              color: "#aee239",
              title: "Planificación de Rutas",
              desc: "Descubre rutas óptimas y ecológicas con ayuda de nuestro sistema inteligente.",
              items: ["🚦 Rutas sostenibles", "💨 Ahorro de tiempo", "🧭 Navegación guiada"],
            },
            {
              icon: "💳",
              color: "#8fbe00",
              title: "Recarga de Saldo",
              desc: "Agrega fondos fácilmente a tu cuenta de manera segura.",
              items: ["💰 Pagos digitales", "⚡ Recarga instantánea", "📱 Compatible con billeteras"],
            },
            {
              icon: "🎁",
              color: "#40c0cb",
              title: "Beneficios y Recompensas",
              desc: "Obtén descuentos y puntos por tus recorridos frecuentes.",
              items: ["⭐ Programa de fidelidad", "🎟️ Descuentos automáticos", "🚴 Retos mensuales"],
            },
          ].map((s, i) => (
            <div key={i} className="servicios__card">
              <div
                className="servicios__icon"
                style={{ background: s.color }}
              >
                {s.icon}
              </div>
              <h3 className="servicios__card-title">{s.title}</h3>
              <p className="servicios__card-desc">{s.desc}</p>
              <ul className="servicios__list">
                {s.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ⚫ FOOTER */}
      <footer className="servicios__footer">
        © 2025 MoveSmart — Todos los derechos reservados.
        <br />
        Desarrollado por el equipo de Ingeniería de Software – Universidad El Bosque.
      </footer>
    </main>
  );
};

export default ServiciosPage;
