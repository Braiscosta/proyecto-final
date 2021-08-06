import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Token } from "../components/token";
import {
  deleteComment,
  deleteNews,
  getNewsById,
  postComment,
} from "../api/api";
import { postReactionComment, getSingleNewsComments } from "../api/api";
import { ErrorContext } from "../components/error";
import Comment from "../components/Comment";
import News from "../components/News";
import jwt_decode from "jwt-decode";
import { useRemoteSingleNews } from "../hooks/remoteHooks";
import PartnerList from "../components/PartnerList";
import UsersTop from "../components/UsersTop";
import "./newsSinglePage.css";

export function NewsSinglePage() {
  const [news, setNews] = useRemoteSingleNews({});
  const { id } = useParams();
  const [, setError] = useContext(ErrorContext);
  const [token] = useContext(Token);

  let userId;
  if (token) {
    userId = jwt_decode(token).id;
  }

  // const { rol } = decodedToken;

  // Cargar comentarios

  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await getSingleNewsComments(id);
        const body = await response.json();
        if (response.ok) {
          setComments(body);
        } else {
          throw new Error(body.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getComments();
  }, [id, setError]);

  // Crear comentario

  const [createComment, setCreateComment] = useState([]);

  const postCommentHandler = async (e) => {
    e.preventDefault();
    const requestBody = {
      comment: createComment,
    };

    try {
      const response = await postComment(requestBody, id, token);
      const body = await response.json();
      if (response.ok) {
        const getComments = async () => {
          try {
            const response = await getSingleNewsComments(id);
            const body = await response.json();
            if (response.ok) {
              setComments(body);
              const response = await getNewsById(id);
              const json = await response.json();
              setNews({ ...news, ...json });
              setCreateComment("");
            } else {
              throw new Error(body.error);
            }
          } catch (error) {
            setError(error.message);
          }
        };
        getComments();
      } else {
        throw new Error(body.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Eliminar noticia

  async function deleteNewsHandler(e) {
    try {
      const idNews = e.target.value;
      const res = await deleteNews(idNews, token);
      const bodyDeLaRespuesta = await res.json();
      if (res.ok) {
        setNews();
      } else {
        throw new Error(bodyDeLaRespuesta.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  // Eliminar comentario

  async function deleteCommentHandler(e) {
    try {
      const idComment = e.target.value;
      const res = await deleteComment(idComment, token);
      const bodyDeLaRespuesta = await res.json();
      if (res.ok) {
        setComments(
          comments.filter((comment) => comment.id !== Number(idComment))
        );
        const response = await getNewsById(id);
        const json = await response.json();
        setNews({ ...news, ...json });
      } else {
        throw new Error(bodyDeLaRespuesta.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  //Reaccionar a Comentario

  async function reactComment(id, reaction) {
    const vote = {
      like: reaction,
      dislike: !reaction,
    };
    try {
      const res = await postReactionComment(vote, id, token);
      const data = await res.json();
      if (res.ok) {
        setComments(
          comments.map((comment) => {
            if (comment.id === id) {
              return data;
            }
            return comment;
          })
        );
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      {!news ? (
        <Redirect to="/" />
      ) : (
        <>
          <div className="grid-container grid-container-single">
            <div className="grid-main grid-main-single">
              {Object.keys(news).length > 0 && <News noticias={news}></News>}
              <div>
                {news.id_user === userId ? (
                  <button
                    className="delete-comment"
                    style={{ display: "block" }}
                    value={news.id}
                    onClick={deleteNewsHandler}
                  >
                    Borrar noticia
                  </button>
                ) : (
                  <button
                    className="delete-comment"
                    style={{ display: "none" }}
                    value={news.id}
                    onClick={deleteNewsHandler}
                  >
                    Borrar noticia
                  </button>
                )}
              </div>

              {/* <div>
            {news.id_user === idToken && rol === "partner" ? (
              <button
                style={{ display: "block" }}
                value={news.id}
                onClick={deleteNewsHandler}
              >
                Editar Noticia
              </button>
            ) : (
              <button
                style={{ display: "none" }}
                value={news.id}
                onClick={deleteNewsHandler}
              >
                Editar noticia
              </button>
            )}
          </div> */}
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <Comment
                      comment={comment}
                      reactComment={reactComment}
                    ></Comment>
                    {comment.id_user === userId ? (
                      <button
                        className="delete-comment"
                        style={{ display: "block" }}
                        value={comment.id}
                        onClick={deleteCommentHandler}
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        className="delete-comment"
                        style={{ display: "none" }}
                        value={comment.id}
                        onClick={deleteCommentHandler}
                      >
                        Eliminar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <div>
                <form className="form-comment" onSubmit={postCommentHandler}>
                  <div className="container-update-comment ">
                    <i className="fas fa-pencil-alt"></i>

                    <textarea
                      className="input-update-comment"
                      name="comment"
                      type="text"
                      rows="2"
                      value={createComment}
                      onChange={(e) => setCreateComment(e.target.value)}
                    />
                  </div>
                  <input
                    className="submit-comment"
                    type="submit"
                    value="Publicar Comentario"
                  ></input>
                </form>
              </div>
            </div>
            <div className="grid-aside grid-aside-single">
              <UsersTop />
              <PartnerList />
            </div>
          </div>
        </>
      )}
    </>
  );
}
