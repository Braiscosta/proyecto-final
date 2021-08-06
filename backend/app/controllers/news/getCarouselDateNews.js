"use strict";
const { getCarouselForDate } = require("../../repositories/newsRepository");
const createJsonError = require("../../errors/createJsonError");

async function getCarouselDateNews(req, res) {
  try {
    const carouselDate = await getCarouselForDate();
    res.status(200);
    res.send(carouselDate);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarouselDateNews;
