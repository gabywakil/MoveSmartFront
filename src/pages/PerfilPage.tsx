import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Perfil.css";
import {
  Bike,
  Wallet,
  Award,
  Camera,
  Star,
  TrendingUp,
  History,
  Settings,
  LogOut,
  Edit2,
  ChevronRight,
  Bell,
  Shield,
  Clock,
  XCircle,
} from "lucide-react";
import logo from "./assets/Logo_MoveSmart.png";


export default function PerfilPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [saldo, setSaldo] = useState(125000);
  const [mostrarRecarga, setMostrarRecarga] = useState(false);
  const [montoRecarga, setMontoRecarga] = useState("");

  const usuario = {
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    nivel: "Gold",
  };

  const viajesRecientes = [
    { id: 1, fecha: "10 Oct 2025", duracion: "18 min", costo: 3500 },
    { id: 2, fecha: "09 Oct 2025", duracion: "32 min", costo: 4200 },
    { id: 3, fecha: "08 Oct 2025", duracion: "12 min", costo: 2800 },
  ];

  const handleRecargar = () => {
    const monto = parseInt(montoRecarga);
    if (!isNaN(monto) && monto > 0) {
      setSaldo(saldo + monto);
      setMontoRecarga("");
      setMostrarRecarga(false);
    } else alert("Ingresa un monto válido");
  };

  return (
    <div className="perfil-page">
      {/* 🧭 HEADER */}
      <header className="perfil-header">
        <div className="perfil-logo" onClick={() => navigate("/home")}>
          <img src={logo} alt="MoveSmart Logo" />
          <h1>MoveSmart</h1>
        </div>
        <nav className="perfil-nav">
          <button onClick={() => navigate("/home")}>Inicio</button>
          <button onClick={() => navigate("/servicios")}>Servicios</button>
          <button className="active">Perfil</button>
        </nav>
      </header>

      {/* 👤 HERO */}
      <section className="perfil-hero">
        <div className="perfil-user-block">
          <div className="perfil-avatar-container">
            <img src={usuario.avatar} alt="avatar" className="perfil-avatar" />
            <button className="editar-foto">
              <Camera size={16} />
            </button>
          </div>
          <h2>{usuario.nombre}</h2>
          <p>{usuario.email}</p>
          <div className="perfil-badge">
            <Star size={14} /> Miembro {usuario.nivel}
          </div>
        </div>

        <div className="perfil-stats">
          <div className="perfil-card saldo">
            <Wallet size={24} />
            <div>
              <p>Saldo Disponible</p>
              <h3>${saldo.toLocaleString()}</h3>
            </div>
            <button onClick={() => setMostrarRecarga(true)}>Recargar</button>
          </div>
          <div className="perfil-card puntos">
            <Award size={24} />
            <div>
              <p>Puntos</p>
              <h3>2,850</h3>
            </div>
            <button>Canjear</button>
          </div>
          <div className="perfil-card viajes">
            <Bike size={24} />
            <div>
              <p>Viajes</p>
              <h3>47</h3>
            </div>
            <ChevronRight size={18} />
          </div>
        </div>
      </section>

      {/* 📊 TABS */}
      <div className="perfil-tabs">
        <button
          onClick={() => setActiveTab("overview")}
          className={activeTab === "overview" ? "active" : ""}
        >
          <TrendingUp size={18} /> Resumen
        </button>
        <button
          onClick={() => setActiveTab("viajes")}
          className={activeTab === "viajes" ? "active" : ""}
        >
          <History size={18} /> Viajes
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={activeTab === "config" ? "active" : ""}
        >
          <Settings size={18} /> Configuración
        </button>
      </div>

      {/* 📄 CONTENIDO */}
      <div className="perfil-contenido">
        {activeTab === "overview" && (
          <div className="perfil-section">
            <h3>Viajes Recientes</h3>
            <div className="viajes-list">
              {viajesRecientes.map((v) => (
                <div className="viaje-card" key={v.id}>
                  <Clock size={18} />
                  <div>
                    <p>{v.fecha}</p>
                    <span>{v.duracion}</span>
                  </div>
                  <p className="costo">-${v.costo.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="perfil-section">
            <h3>Configuración</h3>
            <div className="config-item">
              <Bell size={20} />
              <span>Notificaciones activadas</span>
              <ChevronRight size={18} />
            </div>
            <div className="config-item">
              <Shield size={20} />
              <span>Privacidad y seguridad</span>
              <ChevronRight size={18} />
            </div>
            <button className="logout">
              <LogOut size={18} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* 🧾 FOOTER */}
      <footer className="perfil-footer">
        © 2025 MoveSmart — Movilidad sostenible para todos
      </footer>

      {/* 💰 MODAL RECARGA */}
      {mostrarRecarga && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="cerrar" onClick={() => setMostrarRecarga(false)}>
              <XCircle size={22} />
            </button>
            <h3>Recargar Saldo</h3>
            <input
              type="number"
              value={montoRecarga}
              onChange={(e) => setMontoRecarga(e.target.value)}
              placeholder="Monto a recargar"
            />
            <button className="confirmar" onClick={handleRecargar}>
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
