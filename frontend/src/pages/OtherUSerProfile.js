import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOtherUserProfile } from "../api/api";
import { Link } from "react-router-dom";
import { ErrorContext } from "../components/error";
import "./profilePage.css";

function OtherUSerProfile() {
  const [profile, setProfile] = useState(null);
  const { idUser } = useParams();
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    const cargarProfile = async () => {
      try {
        const response = await getOtherUserProfile(idUser);
        const body = await response.json();
        if (response.ok) {
          setProfile(body);
        } else {
          throw new Error(body.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    cargarProfile();
  }, [idUser, setError]);

  if (!profile) return <p>Cargando...</p>;

  const fechaAltaUsuario = profile.user.created_at;
  const year = new Date(fechaAltaUsuario).getFullYear();
  const day = new Date(fechaAltaUsuario).getDate();
  const month = new Date(fechaAltaUsuario).getMonth() + 1;
  const fechaFormateada = `${day}/${month}/${year}`;

  const avatarImage = profile.user.avatar
    ? `${process.env.REACT_APP_STATIC}/images/profiles/${profile.user.avatar}`
    : "/avatar/defaul-profile-image.png";

  return (
    <>
      <main className="main-profile">
        <section>
          <div className="profile-avatar">
            <figure>
              <img className="avatar" src={avatarImage} alt="avatar" />
            </figure>
            <div>
              <h1>{profile.user.name}</h1>
              <h3>usuario desde: {fechaFormateada}</h3>
            </div>
          </div>
          <div className="profile-info">
            <div className="bio-container">
              <h1>Biografia</h1>
              <div className="bio-profile">{profile.user.bio}</div>
            </div>
            <div className="publications">
              <div>
                <h1>Noticias</h1>
                <span>{profile.news.length}</span>
              </div>
              <div>
                <h1>Comentarios</h1>
                <span>{profile.comments.length}</span>
              </div>
            </div>
          </div>
        </section>
        <div className="separator"></div>
        <div className="accordionContainer">
          <div className="tabs">
            <div className="tab">
              <input type="checkbox" className="input-profile" id="chck1" />
              <label className="tab-label" htmlFor="chck1">
                Noticias
              </label>
              <div className="tab-content">
                <ul className="tab-content-news">
                  {profile.news.map((news) => (
                    <div className="news-box-profile" key={news.id}>
                      <img
                        className="news-image-profile"
                        src={
                          news.picture.includes("http")
                            ? news.picture
                            : `${process.env.REACT_APP_STATIC}/images/news/${news.picture}`
                        }
                        alt="imagen-noticia"
                      ></img>
                      <li>
                        <Link to={`/news/${news.id}`}>{news.news_title}</Link>
                        <div className="news-date">
                          Publicada:{" "}
                          {new Date(news.created_at).toLocaleString()}
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tab">
              <input type="checkbox" className="input-profile" id="chck2" />
              <label className="tab-label" htmlFor="chck2">
                Comentarios
              </label>
              <div className="tab-content">
                <ul className="tab-content-news">
                  {profile.comments.map((comment) => (
                    <div className="news-box-profile" key={comment.id}>
                      <li>
                        {comment.comment}
                        <div className="news-date">
                          Publicado:
                          {new Date(comment.created_at).toLocaleString()}
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default OtherUSerProfile;
