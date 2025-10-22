import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage"; // 👈 tu componente de login
import HomePage from "./pages/HomePage";
import ServiciosPage from "./pages/ServiciosPage";
import PerfilPage from "./pages/PerfilPage";


import "./index.css";

const rootElement = document.getElementById("root");


if (!rootElement) {
  throw new Error("No se encontró el elemento root en el HTML");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
