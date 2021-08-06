"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const {
  findNewsById,
  removeNewsById,
} = require("../../repositories/newsRepository");

const schemaIdParam = Joi.number().integer().positive().required();

async function deleteNews(req, res) {
  try {
    const { idNews } = req.params;
    const { id: idUser } = req.auth;

    await schemaIdParam.validateAsync(idNews);

    const news = await findNewsById(idNews);
    console.log(news);
    if (!news) {
      const error = new Error("Esta noticia no existe");
      error.status = 400;
      throw error;
    }

    if (news.id_user !== idUser) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    await removeNewsById(idNews);

    res.status(200);
    res.send({ message: `news id:${idNews} borrada` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteNews;
