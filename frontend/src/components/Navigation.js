import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Token } from "./token";
import "./navigation.css";

const Navigation = () => {
  const [token] = useContext(Token);

  let userAvatar;
  if (token) {
    userAvatar = jwt_decode(token).avatar;
  }

  let userRol;
  if (token) {
    userRol = jwt_decode(token).rol;
  }

  const avatarImage = userAvatar
    ? `${process.env.REACT_APP_STATIC}/images/profiles/${userAvatar}`
    : "/avatar/defaul-profile-image.png";

  return (
    <>
      <header id="header">
        <nav className="navegacion">
          <ul className="menu">
            {token ? (
              <>
                <li>
                  <Link className="dpmo" to="/">
                    #DPMO
                  </Link>
                </li>

                <li className="li-avatar-navegacion">
                  <Link className="avatar-nav" to="/Profile">
                    <img
                      className="avatar-navegacion"
                      src={avatarImage}
                      alt="avatar"
                    />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="dpmo" to="/">
                    #DPMO
                  </Link>
                </li>
                <ul className="ul-login">
                  <li className="li-navegator">
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </>
            )}
          </ul>
        </nav>
        <nav className="navegacion-2">
          <ul className="menu">
            {token ? (
              <>
                {userRol === "reader" ? (
                  <li>
                    <Link to="/postNews">Publicar </Link>
                  </li>
                ) : userRol === "partner" ? (
                  <li>
                    <Link to="/partnerPostNews">Publicar </Link>
                  </li>
                ) : null}
                <li>
                  <Link to="/NewsForDate">Ultimas-Noticas</Link>
                </li>

                <li>
                  Categorias
                  <ul className="submenu">
                    <li className="li-category">
                      <Link
                        className="category-color"
                        to="/NewsCategory/ciencia-y-tecnologia/"
                      >
                        Ciencia y Tecnología
                      </Link>
                    </li>
                    <li className="li-category">
                      <Link to="/NewsCategory/cultura/">Cultura</Link>
                    </li>
                    <li className="li-category">
                      <Link to="/NewsCategory/deportes/">Deportes</Link>
                    </li>
                    <li className="li-category">
                      <Link to="/NewsCategory/economia/">Economía</Link>
                    </li>
                    <li className="li-category">
                      <Link to="/NewsCategory/politica/">Política</Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Publicar </Link>
                </li>
                <li>
                  <Link to="/NewsForDate">Ultimas-Noticas</Link>
                </li>
                <li>
                  Categorias
                  <ul className="submenu">
                    <li>
                      <Link to="/NewsCategory/Ciencia y Tecnología/">
                        Ciencia y Tecnología
                      </Link>
                    </li>
                    <li>
                      <Link to="/NewsCategory/cultura/">Cultura</Link>
                    </li>
                    <li>
                      <Link to="/NewsCategory/deportes/">Deportes</Link>
                    </li>
                    <li>
                      <Link to="/NewsCategory/Economia/">Economía</Link>
                    </li>
                    <li>
                      <Link to="/NewsCategory/politica/">Política</Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export { Navigation };
