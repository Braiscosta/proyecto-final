"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const {
  findNewsById,
  findNewsComments,
} = require("../../repositories/newsRepository");

const schemaIdParam = Joi.number().integer().positive().required();

async function getCommentsByNews(req, res) {
  try {
    const { idNews } = req.params;
    await schemaIdParam.validateAsync(idNews);

    const news = await findNewsById(idNews);
    if (!news) {
      throw new Error("la noticia no existe");
    }

    const newsComments = await findNewsComments(idNews);

    res.status(200);
    res.send(newsComments);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCommentsByNews;
