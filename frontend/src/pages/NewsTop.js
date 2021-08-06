import { Link } from "react-router-dom";
import CarouselDateNews from "../components/CarouselDateNews";
import News from "../components/News";
import PartnerList from "../components/PartnerList";
import UsersTop from "../components/UsersTop";
import { useEffect, useState, useRef } from "react";
import { getTopNews } from "../api/api";
import "./listNewsPages.css";

function NewsTop() {
  const [topNews, setTopNews] = useState([]);
  const [page, setPage] = useState(0);
  const [moreAvailable, setMoreAvailable] = useState(false);

  const loadMore = useRef(null);

  useEffect(() => {
    const cargarTopNews = async () => {
      try {
        const respuesta = await getTopNews({ page });
        if (respuesta.ok) {
          const body = await respuesta.json();
          setTopNews((t) => [...t, ...body]);
          body.length === 0 ? setMoreAvailable(false) : setMoreAvailable(true);
        } else {
          setTopNews([]);
        }
      } catch (msg) {
        console.error(msg);
      }
    };
    cargarTopNews();
  }, [page]);

  // const options = {
  //   root: null,
  //   rootMargin: "10px",
  //   threshold: 1,
  // };

  // const loadMoreVisible = (entries) => {
  //   if (entries[0].isIntersecting) {
  //     setPage(page + 1);
  //   }
  // };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(loadMoreVisible, options);
  //   if (loadMore.current) observer.observe(loadMore.current);

  //   return () => {
  //     if (loadMore.current) observer.unobserve(loadMore.current);
  //   };
  // }, [loadMore, options]);

  return (
    <>
      <CarouselDateNews />
      <div className="grid-container">
        <div className="grid-main">
          <div>
            {topNews.map((news) => (
              <News
                key={news.id}
                noticias={news}
                setTopNews={setTopNews}
              ></News>
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

export default NewsTop;
