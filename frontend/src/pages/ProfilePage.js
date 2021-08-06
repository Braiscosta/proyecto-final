import { useContext, useEffect, useState } from "react";
import { Token } from "../components/token";
import { deleteComment, deleteNews, getProfile } from "../api/api";
import { Link } from "react-router-dom";
import { ErrorContext } from "../components/error";
import "./profilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [token] = useContext(Token);
  const [, setError] = useContext(ErrorContext);

  // const refresUserInfo = () => setProfile(null);

  useEffect(() => {
    const cargarProfile = async () => {
      try {
        const response = await getProfile(token);
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
  }, [token, setError]);

  // ELIMINAR NOTICIA
  async function deleteNewsHandler(e) {
    try {
      const idNews = e.target.value;
      const res = await deleteNews(idNews, token);
      const bodyDeLaRespuesta = await res.json();

      if (res.ok) {
        setProfile({
          ...profile,
          news: profile.news.filter((n) => n.id !== Number(idNews)),
        });
      } else {
        throw new Error(bodyDeLaRespuesta.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  // ELIMINAR COMENTARIO
  async function deleteCommentHandler(e) {
    try {
      const idComment = e.target.value;
      const res = await deleteComment(idComment, token);
      const bodyDeLaRespuesta = await res.json();

      if (res.ok) {
        setProfile({
          ...profile,
          comments: profile.comments.filter(
            (comment) => comment.id !== Number(idComment)
          ),
        });
      } else {
        throw new Error(bodyDeLaRespuesta.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }

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
              <div className="separator-profile"></div>
              <h3>usuario desde: {fechaFormateada}</h3>
              <div className="container-buttons">
                <Link className="profile-button-1" to="/UpdateUserProfile">
                  Editar Perfil
                </Link>
                <Link className="profile-button-2" to="/logout">
                  Cerrar Sesión
                </Link>
              </div>
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
                      <button
                        className="delete-news-button"
                        key={Math.random()}
                        onClick={deleteNewsHandler}
                        value={news.id}
                      >
                        Borrar
                      </button>
                      <Link
                        className="edit-news-button"
                        to={`/updateNewsPartner/${news.id}`}
                      >
                        Editar
                      </Link>
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
                        <div className="comment-title-news">
                          <Link to={`/news/${comment.id_news}`}>
                            {comment.news_title}
                          </Link>
                        </div>
                        <div className="comment-news">{comment.comment}</div>
                        <div className="news-date">
                          Publicado:
                          {new Date(comment.created_at).toLocaleString()}
                        </div>
                      </li>
                      <button
                        className="delete-news-button"
                        key={Math.random()}
                        onClick={deleteCommentHandler}
                        value={comment.id}
                      >
                        Borrar
                      </button>
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

export default ProfilePage;
