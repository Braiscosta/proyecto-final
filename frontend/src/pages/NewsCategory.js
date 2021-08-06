import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import News from "../components/News";
import { useParams } from "react-router-dom";
import CarouselDateNews from "../components/CarouselDateNews";
import PartnerList from "../components/PartnerList";
import UsersTop from "../components/UsersTop";
import "./listNewsPages.css";

function NewsCategory() {
  const [NewsCategory, setCategory] = useState([]);
  const [page, setPage] = useState(0);
  const [moreAvailable, setMoreAvailable] = useState(false);
  const loadMore = useRef(null);
  const { category } = useParams();

  console.log(NewsCategory);

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/news/category/${category}?page=${page}`
        );
        console.log(category);
        if (response.ok) {
          const body = await response.json();
          setCategory((c) => [
            ...c.filter((n) => n.category === category),
            ...body,
          ]);
          body.length === 0 ? setMoreAvailable(false) : setMoreAvailable(true);
        } else {
          setCategory([]);
        }
      } catch (msg) {
        console.error(msg);
      }
    }
    getCategory();
  }, [category, page]);

  return (
    <>
      <CarouselDateNews />
      <div className="grid-container">
        <div className="grid-main">
          <div>
            {NewsCategory.map((news) => (
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

export default NewsCategory;
