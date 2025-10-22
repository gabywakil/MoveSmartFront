import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import logo from "./assets/Logo_MoveSmart.png";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const switchCtn = document.getElementById("switch-cnt");
    const switchC1 = document.getElementById("switch-c1");
    const switchC2 = document.getElementById("switch-c2");
    const switchCircles = document.querySelectorAll(".switch__circle");
    const switchBtns = document.querySelectorAll(".switch-btn");
    const aContainer = document.getElementById("a-container");
    const bContainer = document.getElementById("b-container");

    const preventSubmit = (e: Event) => e.preventDefault();

    const toggleForm = () => {
      if (!switchCtn || !switchC1 || !switchC2 || !aContainer || !bContainer) return;

      switchCtn.classList.add("is-gx");
      setTimeout(() => switchCtn.classList.remove("is-gx"), 1500);

      switchCtn.classList.toggle("is-txr");
      switchCircles.forEach((c) => c.classList.toggle("is-txr"));

      switchC1.classList.toggle("is-hidden");
      switchC2.classList.toggle("is-hidden");
      aContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-z200");
    };

    document.querySelectorAll(".submit").forEach((btn) => {
      btn.addEventListener("click", preventSubmit);
    });

    switchBtns.forEach((btn) => btn.addEventListener("click", toggleForm));

    return () => {
      document.querySelectorAll(".submit").forEach((btn) => {
        btn.removeEventListener("click", preventSubmit);
      });
      switchBtns.forEach((btn) => btn.removeEventListener("click", toggleForm));
    };
  }, []);

  return (
    <div className="login-main">
      {/* LOGO */}
      <div className="login-logo">
        <img src={logo} alt="MoveSmart Logo" />
      </div>

      {/* Registro */}
      <div className="container a-container" id="a-container">
        <form id="a-form" className="form">
          <h2 className="form_title title">Crear cuenta</h2>
          <span className="form__span">o usa tu correo para registrarte</span>
          <input type="text" placeholder="Nombre" className="form__input" />
          <input type="email" placeholder="Correo electrónico" className="form__input" />
          <input type="password" placeholder="Contraseña" className="form__input" />
          <button className="form__button button submit">Registrarse</button>
        </form>
      </div>

      {/* Inicio de sesión */}
      <div className="container b-container" id="b-container">
        <form id="b-form" className="form">
          <h2 className="form_title title">Inicia sesión</h2>
          <span className="form__span">o usa tu cuenta</span>
          <input type="email" placeholder="Correo electrónico" className="form__input" />
          <input type="password" placeholder="Contraseña" className="form__input" />
          <a href="#" className="form__link">
            ¿Olvidaste tu contraseña?
          </a>
          <button
            className="form__button button submit"
            onClick={() => navigate("/home")}
          >
            Ingresar
          </button>
          <button
            type="button"
            className="form__button button back-home"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </form>
      </div>

      {/* Panel lateral */}
      <div className="switch" id="switch-cnt">
        <div className="switch__circle"></div>
        <div className="switch__circle switch__circle--t"></div>

        <div className="switch__container" id="switch-c1">
          <h2 className="switch__title title">¡Bienvenido de nuevo!</h2>
          <p className="switch__description description">
            Para seguir conectado, inicia sesión con tu información personal
          </p>
          <button className="switch__button button switch-btn">Iniciar sesión</button>
        </div>

        <div className="switch__container is-hidden" id="switch-c2">
          <h2 className="switch__title title">¡Hola nuevo usuario!</h2>
          <p className="switch__description description">
            Ingresa tus datos y comienza tu experiencia con MoveSmart
          </p>
          <button className="switch__button button switch-btn">Registrarse</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
