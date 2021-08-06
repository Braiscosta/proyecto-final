import { useContext, useState } from "react";
import { Redirect } from "react-router";
import { postLogin } from "../api/api";
import { Token } from "../components/token";
import "./login.css";

const Login = () => {
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(Token);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    const requestBody = {
      userName,
      password,
    };
    const res = await postLogin(requestBody);
    const bodyRespuestaFormulario = await res.json();
    if (res.ok) {
      setToken(bodyRespuestaFormulario.accessToken);
      setErrorMsg(null);
    } else {
      setToken("");
      setErrorMsg(
        `No se ha podido obtener el token: ${bodyRespuestaFormulario}`
      );
    }
  };
  return (
    <>
      {token ? (
        <Redirect to="/" />
      ) : (
        <>
          <main className="main-login">
            <section className="side"></section>
            <section className="login-section">
              <div className="login-container">
                <h1 className="title ">Bienvenido a Dpmo</h1>
                <p className="welcome-message">
                  Por favor ingresa tu Correo y tu Contraseña
                </p>

                <h2>Login</h2>
                <div className="separator"></div>
                <form onSubmit={handleLogin} id="login">
                  <div className="container-input">
                    <i className="fas fa-user"></i>
                    <label htmlFor="email"></label>
                    <input
                      className="input-login"
                      name="email"
                      type="email"
                      value={userName}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                  <div className="container-input">
                    <i className="fas fa-lock"></i>
                    <label htmlFor="password"></label>
                    <input
                      className="input-login"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                    />
                  </div>
                  <div>
                    <input
                      className="submit"
                      type="submit"
                      value="Enviar"
                    ></input>
                  </div>
                </form>
                {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Login;
