import { useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Token } from "../components/token";
import { ErrorContext } from "./error";
import Fire from "./Fire";
import "./news.css";

function News({ noticias }) {
  const [token] = useContext(Token);
  const [, setError] = useContext(ErrorContext);
  const [counter, setCounter] = useState(noticias.counter_news);

  let userId;
  if (token) {
    userId = jwt_decode(token).id;
  }

  async function upVoteHandler() {
    const vote = {
      mas: true,
      menos: false,
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/news/${noticias.id}/vote`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vote),
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setCounter(noticias.counter_news + 1);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function downVoteHandler() {
    const vote = {
      mas: false,
      menos: true,
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/news/${noticias.id}/vote`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vote),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setCounter(noticias.counter_news - 1);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const fechaCreacion = noticias.created_at;
  const fechaFormateada = new Date(fechaCreacion).toLocaleString();

  const avatarImage = noticias.user_avatar
    ? `${process.env.REACT_APP_STATIC}/images/profiles/${noticias.user_avatar}`
    : "/avatar/defaul-profile-image.png";

  const newsPicture = noticias.picture.includes("http")
    ? noticias.picture
    : `${process.env.REACT_APP_STATIC}/images/news/${noticias.picture}`;

  const profileLink =
    noticias.id_user === userId
      ? "/profile"
      : `/OtherUserProfile/${noticias.id_user}`;

  return (
    <article className="news">
      <Link to={`/news/${noticias.id}`}>
        <h1>{noticias.news_title}</h1>
      </Link>
      <div className="container-publicado">
        <h2>Publicado por</h2>
        <Link to={profileLink}>
          <img className="avatar-noticia" src={avatarImage} alt="avatar" />
        </Link>
        <h2>
          <Link to={profileLink}>
            <span>{noticias.user_name}</span>
          </Link>
          el {fechaFormateada}
        </h2>
      </div>
      <div className="noticias-flex">
        <div className="imagenes">
          <img className="imagen" src={newsPicture} alt="imagen-noticia"></img>
        </div>
        <div className="fuego">
          <Fire counterTop={noticias.counter_news}></Fire>
          <div className="buttons-vote">
            <button className="button-vote" onClick={upVoteHandler}>
              <span className="mas">+</span>
            </button>
            <div className="counter-vote">{`${counter}°`}</div>
            <button className="button-vote" onClick={downVoteHandler}>
              <span className="mas">-</span>
            </button>
          </div>
        </div>
      </div>
      <h3>{noticias.news_lead}</h3>
      <p>{noticias.news_text}</p>
      <div className="news-info-container">
        <span>
          <i className="far fa-comments"></i>
          {noticias.comment_counter}
        </span>
        <Link to={`/NewsCategory/${noticias.category}`}>
          {noticias.category}
        </Link>
      </div>
    </article>
  );
}

export default News;
