import { useContext, useEffect, useRef, useState } from "react";
import { updateProfile, postFileImage, getProfile } from "../api/api";
import { Token } from "../components/token";
import { ErrorContext } from "../components/error";
import "./updateUserProfile.css";

const UpdateUserProfile = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBiography] = useState("");
  const [token] = useContext(Token);
  const [, setError] = useContext(ErrorContext);
  const fileInput = useRef();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile(token);
        const body = await response.json();
        if (response.ok) {
          setUsername(body.user.name);
          setPassword();
          setRepeatPassword();
          setEmail(body.user.email);
          setBiography(body.user.bio || "");
        } else {
          throw new Error(body.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    loadProfile();
  }, [token, setError]);

  const updateAvatar = async (e) => {
    e.preventDefault();
    const fileFromRef = fileInput.current.files[0];
    let requestBody = new FormData();
    requestBody.append("profileImage", fileFromRef);
    try {
      const res = await postFileImage(requestBody, token);
      const data = await res.json();
      if (res.ok) {
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditUserProfile = async (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      email,
      password,
      repeatPassword,
      bio,
    };
    try {
      const res = await updateProfile(requestBody, token);
      const data = await res.json();
      if (res.ok) {
        window.location = "http://localhost:3050/profile";
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="main-profile-update">
        <div className="container-update-avatar">
          <h1 className="title-update-user">Editar Perfil</h1>
          <div className="separator"></div>
          <form className="form-update-avatar" onSubmit={updateAvatar}>
            <div>
              <input
                className="input-image-profile"
                type="file"
                ref={fileInput}
              ></input>
              <input
                className="savePhoto"
                type="submit"
                value="Guardar"
              ></input>
            </div>
          </form>
        </div>

        <form className="form-update" onSubmit={handleEditUserProfile}>
          <div className="container-update">
            <i className="fas fa-user"></i>
            <label htmlFor="name"></label>
            <input
              className="input-update"
              name="name"
              type="name"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="container-update">
            <i className="fas fa-envelope"></i>
            <label htmlFor="email"></label>
            <input
              className="input-update"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="container-update">
            <i className="fas fa-lock"></i>
            <label htmlFor="password"></label>
            <input
              className="input-update"
              name="password"
              type="password"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="container-update">
            <i className="fas fa-lock"></i>
            <label htmlFor="password"></label>
            <input
              className="input-update"
              name="repeatPassword"
              type="password"
              placeholder="••••"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="container-update-bio ">
            <i className="fas fa-pencil-alt"></i>

            <textarea
              className="input-update"
              name="bio"
              type="text"
              rows="8"
              value={bio}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>
          <input
            className="submit"
            type="submit"
            value="Guardar Cambios"
          ></input>
        </form>
      </div>
    </>
  );
};

export default UpdateUserProfile;
