import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Token } from "../components/token";
import { useContext } from "react";

function Comment({ comment, reactComment }) {
  const [token] = useContext(Token);

  let userId;
  if (token) {
    userId = jwt_decode(token).id;
  }

  const fechaCreacion = comment.created_at;
  const fechaFormateada = new Date(fechaCreacion).toLocaleString();
  const fechaReciente = new Date(fechaCreacion);
  const fechaHoy = new Date();

  let resta = fechaHoy.getTime() - fechaReciente.getTime();
  const tiempo = Math.round(resta / (1000 * 60));

  const fechaAltaUsuario = comment.created_at;
  const hour = new Date(fechaAltaUsuario).getHours();
  const mins = new Date(fechaAltaUsuario).getMinutes();
  const time = `${hour}:${mins}`;

  const tiempoPublicacion =
    tiempo < 10
      ? "hace un momento"
      : tiempo < 60
      ? `hace ${tiempo} minutos`
      : tiempo > 60 && tiempo < 1440
      ? `a las ${time}`
      : `el ${fechaFormateada}`;

  const avatarImage = comment.avatar
    ? `${process.env.REACT_APP_STATIC}/images/profiles/${comment.avatar}`
    : "/avatar/defaul-profile-image.png";

  const profileLink =
    comment.id_user === userId
      ? "/profile"
      : `/OtherUserProfile/${comment.id_user}`;

  return (
    <div className="comment">
      <div className="container-comentario">
        <h2>Publicado por</h2>
        <Link to={profileLink}>
          <img className="avatar-noticia" src={avatarImage} alt="avatar" />
        </Link>
        <h2>
          <Link to={profileLink}>
            <span>{comment.name}</span>
          </Link>
          {tiempoPublicacion}
        </h2>
      </div>
      <p>{comment.comment}</p>
      <div className="reaction-comment">
        <button onClick={() => reactComment(comment.id, true)}>
          <img
            className="emoji-comment"
            src="/happy-emoji.png"
            alt="happy-emoji"
          />
        </button>
        <span>{comment.comment_like}</span>
        <button onClick={() => reactComment(comment.id, false)}>
          <img
            className="emoji-comment"
            src="/angry-emoji.png"
            alt="angry-emoji"
          />
        </button>
        <span>{comment.comment_dislike}</span>
      </div>
    </div>
  );
}

export default Comment;
