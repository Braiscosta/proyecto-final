import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import {
  getCarouselTopNews,
  getCarouselDateNews,
  getNewsById,
} from "../api/api";
import { ErrorContext } from "../components/error";

function useRemoteCarouselNewsTop() {
  const [topNewsCarousel, setTopNewsCarousel] = useState([]);
  useEffect(() => {
    const cargarCarouselTopNews = async () => {
      try {
        const respuesta = await getCarouselTopNews();
        if (respuesta.ok) {
          const body = await respuesta.json();
          setTopNewsCarousel(body);
        } else {
          setTopNewsCarousel([]);
        }
      } catch (msg) {
        console.error(msg);
      }
    };
    cargarCarouselTopNews();
  }, []);

  return [topNewsCarousel, setTopNewsCarousel];
}

function useRemoteCarouselNewsDate() {
  const [carouselDateNews, carouselSetDateNews] = useState([]);

  useEffect(() => {
    const cargarCarouselDateNews = async () => {
      try {
        const respuesta = await getCarouselDateNews();
        if (respuesta.ok) {
          const body = await respuesta.json();

          carouselSetDateNews(body);
        } else {
          carouselSetDateNews([]);
        }
      } catch (msg) {
        console.error(msg);
      }
    };
    cargarCarouselDateNews();
  }, []);

  return [carouselDateNews, carouselSetDateNews];
}

function useRemoteSingleNews() {
  const { id } = useParams();
  const [News, setNews] = useState({});
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    async function getNews() {
      try {
        const response = await getNewsById(id);
        const json = await response.json();
        if (response.ok) {
          setNews(json);
        } else {
          throw new Error(json.error);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getNews();
  }, [id, setError]);

  return [News, setNews];
}

export {
  useRemoteCarouselNewsTop,
  useRemoteCarouselNewsDate,
  useRemoteSingleNews,
};
