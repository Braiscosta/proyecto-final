"use strict";
const cheerio = require("cheerio");
const createJsonError = require("../../errors/createJsonError");
const {
  getHtmlContent,
  addNews,
} = require("../../repositories/newsRepository");
const createNewsPartner = require("../../controllers/news/createNewsPartner");
const {
  getNewsElPais,
  getNewsLaVozDeGalicia,
  getNewsMArca,
} = require("../../helpers/functionCreateNews");

async function createNews(req, res) {
  try {
    const { id: idUSer, rol } = req.auth;
    const { body } = req;
    const { url, category } = body;

    if (rol === "partner") {
      await createNewsPartner(req, res);
    } else {
      const requestHtml = await getHtmlContent(url);

      let news;
      if (url.includes("elpais")) {
        news = await getNewsElPais(requestHtml);
      } else if (url.includes("lavozdegalicia")) {
        news = await getNewsLaVozDeGalicia(requestHtml);
      } else {
        news = await getNewsMArca(requestHtml);
      }

      news.category = category;
      const idNews = await addNews(news, idUSer);
      news.id = idNews;

      res.status(200);
      res.send({ news });
    }
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createNews;
