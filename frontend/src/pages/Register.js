import { useState } from "react";
import { postRegister } from "../api/api";
import "./register.css";

function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const handleRegister = async (e, event) => {
    e.preventDefault();

    const requestBody = {
      name,
      email,
      password,
      repeatPassword,
    };
    console.dir(requestBody);

    const res = await postRegister(requestBody);
    const bodyDeLaRespuesta = await res.json();
    if (res.ok) {
      setErrorMsg(null);
      window.location = "http://localhost:3050/login";
    } else {
      setErrorMsg(`Error: ${bodyDeLaRespuesta}`);
    }
  };
  return (
    <>
      <section className="section-register">
        <div className="register-container">
          <h1 className="title ">Registro</h1>
          <div className="separator"></div>
          <form onSubmit={handleRegister} id="register">
            <div className="container-input">
              <i className="fas fa-user"></i>
              <label htmlFor="name"></label>
              <input
                className="input-register"
                name="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
              />
            </div>
            <div className="container-input">
              <i className="fas fa-envelope"></i>
              <label htmlFor="email"></label>
              <input
                className="input-register"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="container-input">
              <i className="fas fa-lock"></i>
              <label htmlFor="password"></label>
              <input
                className="input-register"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>
            <div className="container-input">
              <i className="fas fa-lock"></i>
              <label htmlFor="repeatPassword"></label>
              <input
                className="input-register"
                name="repeatPassword"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Repetir Contraseña"
              />
            </div>
            <div>
              <input className="submit" type="submit" value="Enviar"></input>
            </div>
          </form>
          {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        </div>
      </section>
    </>
  );
}

export default Register;
