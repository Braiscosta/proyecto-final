"use strict";

const Joi = require("joi");
const { findNewsById } = require("../../repositories/newsRepository");
const { addComment } = require("../../repositories/commentsRepository");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");

const schemaIdParam = Joi.number().integer().positive().required();
const schemaBody = Joi.object().keys({
  comment: Joi.string().min(5).max(255),
});

async function createComment(req, res) {
  try {
    const { id: idUser } = req.auth;

    const { idNews } = req.params;
    await schemaIdParam.validateAsync(idNews);

    await schemaBody.validateAsync(req.body);
    const { comment } = req.body;

    const news = await findNewsById(idNews);
    if (!news) {
      throwJsonError("esta noticia no existe", 400);
    }

    const idComment = await addComment(comment, idUser, idNews);

    res.status(200);
    res.send({ idComment, idNews, idUser, comment });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = createComment;
