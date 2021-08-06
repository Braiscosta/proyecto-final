"use strict";
const { getCarouselForTop } = require("../../repositories/newsRepository");
const createJsonError = require("../../errors/createJsonError");

async function getCarouselTopNews(req, res) {
  try {
    const carouselTop = await getCarouselForTop();
    res.status(200);
    res.send(carouselTop);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarouselTopNews;
