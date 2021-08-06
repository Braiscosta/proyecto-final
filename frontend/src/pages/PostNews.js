import { useContext, useState } from "react";
import { Token } from "../components/token";
import { useHistory } from "react-router-dom";

import { createNews } from "../api/api";
import { ErrorContext } from "../components/error";
import "./postNews.css";
function PostNews() {
  let history = useHistory();
  const [url, setNewsurl] = useState("");
  const [category, setCategory] = useState("ciencia-y-tecnologia");
  const [token] = useContext(Token);
  const [, setError] = useContext(ErrorContext);

  const handlePostNews = async (e) => {
    console.log(e);
    e.preventDefault();
    const requestBody = {
      url,
      category,
    };
    try {
      const response = await createNews(requestBody, token);
      const data = await response.json();
      if (response.ok) {
        setNewsurl("");
        history.push(`/news/${data.news.id}`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <main className="main-container">
        <form
          className="form-post-news"
          onSubmit={handlePostNews}
          id="postNews"
        >
          <div className="contain-title">
            <h1 className="title">Publica Tu noticia.</h1>
            <div className="separator"></div>
            <h2 className="sub-title">
              En DPMO podrás publicar simplemente copiando la Url de la Noticia
              de la página que quieras, tendrás que elegir su categoría entre
              varias opciones; y luego a disfrutar . Esperamos que tu estadía en
              Nuestra APP sea de tu agrado. Enjoy!!!!
            </h2>
          </div>

          <div className="div-post-url">
            <i className="fas fa-link"></i>
            <label className="label-url" htmlFor="url"></label>
            <input
              className="input-url"
              name="url"
              type="url"
              value={url}
              placeholder="Url de la noticia"
              onChange={(e) => setNewsurl(e.target.value)}
            />
          </div>
          <div className="div-post-news">
            <i className="fas fa-archive"></i>
            <label className="label-category" htmlFor="category"></label>
            <select
              className="select-post-news"
              name="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="ciencia-y-tecnologia">ciencia y tecnologia</option>
              <option value="cultura">cultura</option>
              <option value="deportes">deportes</option>
              <option value="economia">economia</option>
              <option value="politica">politica</option>
            </select>
          </div>
          <div className="div-post-submit">
            <input className="submit" type="submit" value="Enviar"></input>
          </div>
        </form>
      </main>
    </>
  );
}

export default PostNews;
