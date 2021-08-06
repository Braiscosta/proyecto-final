"use strict";
const createJsonError = require("../../errors/createJsonError");
const { findAllNews } = require("../../repositories/newsRepository");

async function getNews(req, res) {
  try {
    const { page } = req.query;
    const news = await findAllNews({ page });
    if (!news) {
      throw new Error("no hay noticias");
    }
    res.status(200);
    res.send(news);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getNews;
