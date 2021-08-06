import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="footer-row">
          <div className="footer-col">
            <h4>Heaters / Miembros</h4>
            <ul>
              <li>
                <a
                  target="blank"
                  href="https://www.linkedin.com/in/braisfernandezlopez/ "
                >
                  Brais Fernández
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  href="https://www.linkedin.com/in/daniellluis/ "
                >
                  Daniel Lluis
                </a>
              </li>
              <li>
                <Link to="">Acerca de Nosotros</Link>
              </li>
              <li>
                <Link to="">Política Privacidad</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contáctanos @</h4>
            <ul>
              <li>
                <a target="blank" href=" dpmo2021noticas@outlook.es">
                  Email
                </a>
              </li>
              <li>
                <Link to="">Teléfono</Link>
              </li>

              <li>
                <a
                  target="blank"
                  href="https://github.com/Braiscosta/proyecto_final"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Tecnologías</h4>
            <ul>
              <li>
                <a target="blank" href=" https://es.reactjs.org/">
                  React
                </a>
              </li>
              <li>
                <a target="blank" href=" https://nodejs.org/es/">
                  Node.js
                </a>
              </li>
              <li>
                <Link to="">Html</Link>
              </li>
              <li>
                <Link to="">Css</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Síguenos </h4>
            <div className="social-links">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="https://www.instagram.com/">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
