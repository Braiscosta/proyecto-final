import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById, updateNewsPartner } from "../api/api";
import { Token } from "../components/token";
import { ErrorContext } from "../components/error";
import "./updateNewsPartner.css";

const UpdateNewsProfile = () => {
  const { id } = useParams();
  const [token] = useContext(Token);
  const [file, setFile] = useState("");
  const [currentPicture, setCurrentPicture] = useState("");
  const [title, setTitle] = useState("");
  const [lead, setLead] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Elige una categoría");
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    const loadSingleNews = async () => {
      try {
        const res = await getNewsById(id);
        const data = await res.json();

        if (res.ok) {
          setCurrentPicture(
            `${process.env.REACT_APP_STATIC}/images/news/${data.picture}`
          );
          setTitle(data.news_title);
          setLead(data.news_lead);
          setText(data.news_text);
          setCategory(data.news_category);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    loadSingleNews();
  }, [id, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let requestBody = new FormData();
    requestBody.append("title", title);
    requestBody.append("lead", lead);
    requestBody.append("text", text);
    requestBody.append("category", category);

    if (file) {
      requestBody.append("image", file);
    }

    console.log(currentPicture);

    try {
      const res = await updateNewsPartner(requestBody, token, id);
      console.log(requestBody);
      const data = await res.json();
      if (res.ok) {
        window.location = `http://localhost:3050/news/${id}`;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <main className="main-container-Update-News">
        <form className="form-edit-news" onSubmit={handleSubmit}>
          <h2 className="title-news-partner">Editar noticia</h2>
          <div className="separator"></div>
          <div>
            <label className="label-image" htmlFor="image" />
            {currentPicture ? (
              <img
                className="img-news-partner"
                src={currentPicture}
                alt={title}
              />
            ) : null}
            <input
              className="input-partner-image"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setCurrentPicture(URL.createObjectURL(e.target.files[0]));
              }}
              accept="image/*"
              name="image"
            ></input>
          </div>
          <div className="div-edit-partner-news">
            <i className="fas fa-pencil-alt"></i>
            <label htmlFor="title"></label>
            <input
              className="input-edit-partner"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="div-edit-partner-news">
            <i className="fas fa-pencil-alt"></i>
            <label htmlFor="lead"></label>
            <input
              className="input-edit-partner"
              name="lead"
              type="text"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
            />
          </div>
          <div className="div-edit-partner-news">
            <i className="fas fa-pencil-alt"></i>
            <label htmlFor="text"></label>
            <textarea
              className="input-edit-partner"
              name="text"
              type="text"
              row="8"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="div-edit-partner-news">
            <i className="fas fa-pencil-alt"></i>
            <label htmlFor="category"></label>
            <select
              className="select-edit-partner-news"
              name="category"
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Elige una categoría">Elige una Categoría</option>
              <option value="ciencia y tecnologia">ciencia y tecnologia</option>
              <option value="cultura">cultura</option>
              <option value="deportes">deportes</option>
              <option value="economia">economia</option>
              <option value="politica">politica</option>
            </select>
          </div>
          <div className="div-post-submit">
            <input
              className="submit"
              type="submit"
              value="Guardar Cambios"
            ></input>
          </div>
        </form>
      </main>
    </>
  );
};

export default UpdateNewsProfile;
