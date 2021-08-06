import { useContext, useRef, useState } from "react";
import { Token } from "../components/token";
import { createPartnerNews } from "../api/api";
import { ErrorContext } from "../components/error";
import { useHistory } from "react-router-dom";
import "./partnerPostNews.css";

const PartnerPostNews = () => {
  let history = useHistory();
  const fileInput = useRef();
  const [token] = useContext(Token);
  const [title, setTitle] = useState("");
  const [lead, setLead] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Elige una categoría");
  const [, setError] = useContext(ErrorContext);

  const postNews = async (e) => {
    e.preventDefault();
    const fileFromRef = fileInput.current.files[0];
    let requestBody = new FormData();
    requestBody.append("image", fileFromRef);
    requestBody.append("title", title);
    requestBody.append("lead", lead);
    requestBody.append("text", text);
    requestBody.append("category", category);
    try {
      const res = await createPartnerNews(requestBody, token);
      console.log(requestBody);
      const data = await res.json();
      if (res.ok) {
        history.push(`/news/${data.id}`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <main className="main-container">
      <div className="container-title-partner">
        <h1 className="title-partener">Crear Noticia Partner.</h1>
        <div className="separator"></div>
        <h2 className="sub-title-partner">
          Bienvenido a DPMO , como usuario partner que eres, puedes crear tu
          propia noticia .
        </h2>
      </div>
      <form onSubmit={postNews}>
        <div>
          <label className="label-image" htmlFor="image" />
          <input
            className="input-post-image"
            type="file"
            ref={fileInput}
            name="image"
          ></input>
        </div>
        <div className="div-post-partner">
          <i className="fas fa-pencil-alt"></i>
          <label className="label-title" htmlFor="title" />
          <input
            className="input-post-partner"
            type="text"
            value={title}
            name="title"
            placeholder="Título noticia"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="div-post-partner">
          <i className="fas fa-pencil-alt"></i>
          <label className="label-lead" htmlFor="lead" />
          <input
            className="input-post-partner"
            type="text"
            value={lead}
            name="lead"
            placeholder="Subtítulo noticia"
            onChange={(e) => {
              setLead(e.target.value);
            }}
          ></input>
        </div>
        <div className="div-post-partner">
          <i className="fas fa-pencil-alt"></i>
          <label className="label-text" htmlFor="text" />
          <textarea
            className="input-post-partner"
            row="8"
            type="text"
            value={text}
            name="text"
            placeholder="Cuerpo noticia"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="div-post-partner-news">
          <i className="fas fa-archive"></i>
          <label className="label-category" htmlFor="category"></label>
          <select
            className="select-post-partner-news"
            name="category"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="Elige una categoría">Elige una Categoría</option>
            <option value="ciencia-y-tecnologia">ciencia y tecnologia</option>
            <option value="cultura">cultura</option>
            <option value="deportes">deportes</option>
            <option value="economia">economia</option>
            <option value="politica">politica</option>
          </select>
        </div>
        <div className="div-post-submit">
          <input className="submit" type="submit" value="Publicar"></input>
        </div>
      </form>
    </main>
  );
};

export default PartnerPostNews;
