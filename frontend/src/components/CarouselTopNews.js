import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRemoteCarouselNewsTop } from "../hooks/remoteHooks";
import useWindowSize from "../hooks/useWindowSize";
import "./carousel.css";

const CarouselTopNews = () => {
  const [carouselTopNews] = useRemoteCarouselNewsTop(null);
  const [currentNews, setCurrentNews] = useState(0);
  const [size] = useWindowSize();

  const prevSlide = () => {
    const resetCarousel = currentNews === 0;
    const index = resetCarousel ? carouselTopNews.length - 1 : currentNews - 1;

    setCurrentNews(index);
  };

  const nextSlide = () => {
    const resetIndex = currentNews === carouselTopNews.length - 1;
    const index = resetIndex ? 0 : currentNews + 1;

    setCurrentNews(index);
  };

  let numberOfNews;
  if (size.width < 650) {
    numberOfNews = 1;
  } else if (size.width > 650 && size.width < 1200) {
    numberOfNews = 2;
  } else if (size.width > 1200 && size.width < 1500) {
    numberOfNews = 3;
  } else if (size.width > 1500) {
    numberOfNews = 4;
  }

  const lastNews = carouselTopNews.slice(
    currentNews,
    currentNews + numberOfNews
  );
  const newsToDisplay =
    lastNews.length < numberOfNews
      ? [
          ...lastNews,
          ...carouselTopNews.slice(0, numberOfNews - lastNews.length),
        ]
      : lastNews;

  return (
    <>
      <section className="carousel-section">
        <h1>top dpmo</h1>
        <div className="carousel">
          <button className="btn-carousel-prev" onClick={prevSlide}>
            <img
              className="btn-carousel"
              src="/prev-carousel.png"
              alt="prev-carousel"
            />
          </button>
          <ul>
            {newsToDisplay.map((news) => (
              <li className="container-news">
                <Link key={news.id} to={`/news/${news.id}`}>
                  <img
                    className="img-carousel"
                    src={
                      news.picture.includes("http")
                        ? news.picture
                        : `${process.env.REACT_APP_STATIC}/images/news/${news.picture}`
                    }
                    alt={news.title}
                  />
                  <div className="container-title">
                    <p>{news.news_title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <button className="btn-carousel-next" onClick={nextSlide}>
            <img
              className="btn-carousel"
              src="/next-carousel.png"
              alt="next-carousel"
            />
          </button>
        </div>
      </section>
    </>
  );
};

export default CarouselTopNews;
