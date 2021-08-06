"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findNewsById } = require("../../repositories/newsRepository");

const schemaIdParam = Joi.number().integer().positive().required();

async function getNewsById(req, res) {
  try {
    const { idNews } = req.params;
    // throw new Error("No me da la gana de cargar");
    await schemaIdParam.validateAsync(idNews);

    const news = await findNewsById(idNews);
    if (!news) {
      throw new Error("Id no valido");
    }
    res.status(200);
    res.send(news);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getNewsById;
