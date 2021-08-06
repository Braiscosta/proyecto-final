import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getDateNews } from "../api/api";
import CarouselTopNews from "../components/CarouselTopNews";
import PartnerList from "../components/PartnerList";
import UsersTop from "../components/UsersTop";
import News from "../components/News";
import "./listNewsPages.css";

function NewsForDate() {
  const [dateNews, setDateNews] = useState([]);
  const [page, setPage] = useState(0);
  const [moreAvailable, setMoreAvailable] = useState(false);
  const loadMore = useRef(null);

  useEffect(() => {
    const cargarDateNews = async () => {
      try {
        const respuesta = await getDateNews({ page });
        if (respuesta.ok) {
          const body = await respuesta.json();
          setDateNews((d) => [...d, ...body]);
          body.length === 0 ? setMoreAvailable(false) : setMoreAvailable(true);
        } else {
          setDateNews([]);
        }
      } catch (msg) {
        console.error(msg);
      }
    };
    cargarDateNews();
  }, [page]);

  return (
    <>
      <CarouselTopNews />
      <div className="grid-container">
        <div className="grid-main">
          <div>
            {dateNews.map((news) => (
              <News key={news.id} noticias={news}></News>
            ))}
          </div>
          <form>
            {moreAvailable && (
              <div className="btn-box">
                <Link
                  to="#"
                  className="btn btn-white btn-animate"
                  ref={loadMore}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  Cargar más
                </Link>
              </div>
            )}
          </form>
        </div>
        <div className="grid-aside">
          <UsersTop />
          <PartnerList />
        </div>
      </div>
    </>
  );
}

export default NewsForDate;
