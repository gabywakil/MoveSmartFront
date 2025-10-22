import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/Logo_MoveSmart.png";
import "./css/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  const bicicletas = [
    {
      id: 1,
      nombre: "Urban Pro",
      distancia: "0.3 km",
      tiempo: "2 min",
      tipo: "Eléctrica",
      bateria: 85,
      precio: "$2.500",
    },
    {
      id: 2,
      nombre: "City Rider",
      distancia: "0.5 km",
      tiempo: "3 min",
      tipo: "Clásica",
      bateria: null,
      precio: "$1.800",
    },
    {
      id: 3,
      nombre: "Eco Sprint",
      distancia: "0.8 km",
      tiempo: "5 min",
      tipo: "Eléctrica",
      bateria: 92,
      precio: "$2.500",
    },
    {
      id: 4,
      nombre: "Green Move",
      distancia: "1.2 km",
      tiempo: "7 min",
      tipo: "Clásica",
      bateria: null,
      precio: "$1.800",
    },
  ];

  const beneficios = [
    {
      icon: "🌿",
      titulo: "Eco-Friendly",
      desc: "Reduce tu huella de carbono",
    },
    { icon: "⚡", titulo: "Rápido", desc: "Evita el tráfico urbano" },
    { icon: "💪", titulo: "Saludable", desc: "Ejercicio en tu rutina" },
    { icon: "💰", titulo: "Económico", desc: "Ahorra en transporte" },
  ];

  return (
    <div className="home-main">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
        <div className="logo-section">
  <img 
    src={logo} 
    alt="MoveSmart Logo" 
    className="header-logo" 
  />
  <h1 className="logo-title">MoveSmart</h1>
</div>

          <nav className="header-nav">
            <button onClick={() => navigate("/")}>Inicio</button>
            <button onClick={() => navigate("/bicicletas")}>Mis Viajes</button>
            <button onClick={() => navigate("/servicios")}>Servicios</button>
            <button onClick={() => navigate("/perfil")}>Mi perfil</button>

            <button className="logout-btn" onClick={() => navigate("/login")}>
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h2 className="hero-title">
            Bienvenido a <span className="highlight">MoveSmart</span>
          </h2>
          <p className="hero-subtitle">
            Tu plataforma inteligente de movilidad sostenible
          </p>
        </div>

        {/* Búsqueda de Ruta */}
        <div className="search-box">
          <h3 className="search-title">
            <span className="icon"></span>
            ¿A dónde quieres ir?
          </h3>

          <div className="search-inputs">
            <div className="input-group">
              <span className="input-icon"></span>
              <input
                type="text"
                placeholder="¿Desde dónde sales?"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon destination"></span>
              <input
                type="text"
                placeholder="¿A dónde vas?"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className="search-input"
              />
            </div>

            <button className="search-button">
              <span></span> Buscar bicicletas
            </button>
          </div>
        </div>
      </section>

      {/* Bicicletas Disponibles */}
      <section className="bikes-section">
        <h3 className="section-title"> Bicicletas cerca de ti</h3>
        <div className="bikes-grid">
          {bicicletas.map((bici) => (
            <div key={bici.id} className="bike-card">
              <div className="bike-header">
                <div>
                  <h4 className="bike-name">{bici.nombre}</h4>
                  <p className="bike-type">{bici.tipo}</p>
                </div>
                <span className="bike-icon-large"></span>
              </div>

              <div className="bike-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span>{bici.distancia} de distancia</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span>{bici.tiempo} caminando</span>
                </div>
                {bici.bateria && (
                  <div className="battery-info">
                    <div className="battery-bar">
                      <div
                        className="battery-fill"
                        style={{ width: `${bici.bateria}%` }}
                      />
                    </div>
                    <span className="battery-text">{bici.bateria}%</span>
                  </div>
                )}
              </div>

              <div className="bike-footer">
                <span className="bike-price">{bici.precio}</span>
                <button className="reserve-btn">Reservar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios Principales */}
      <section className="services-section">
        <h3 className="section-title">Nuestros Servicios</h3>
        <div className="services-grid">
          <div className="service-card" onClick={() => navigate("/bicicletas")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2769/2769013.png"
              alt="Bicicletas"
              className="service-icon"
            />
            <h2>Ver Bicicletas Disponibles</h2>
            <p>
              Consulta las bicicletas cercanas y su disponibilidad en tiempo
              real.
            </p>
            <button className="service-btn">Explorar</button>
          </div>

          <div className="service-card" onClick={() => navigate("/servicios")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/9028/9028052.png"
              alt="Servicios"
              className="service-icon"
            />
            <h2>Servicios</h2>
            <p>
              Descubre los planes, beneficios y asistencia que MoveSmart ofrece.
            </p>
            <button className="service-btn">Ver más</button>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="benefits-section">
        <h3 className="section-title-white">¿Por qué elegir MoveSmart?</h3>
        <div className="benefits-grid">
          {beneficios.map((beneficio, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{beneficio.icon}</div>
              <h4 className="benefit-title">{beneficio.titulo}</h4>
              <p className="benefit-desc">{beneficio.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-number">2,500+</div>
          <div className="stat-label">Bicicletas disponibles</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50,000+</div>
          <div className="stat-label">Usuarios activos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100+</div>
          <div className="stat-label">Estaciones en la ciudad</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 MoveSmart | Movilidad sostenible para todos 🌿</p>
      </footer>
    </div>
  );
}

export default HomePage;