"use strict";

const Joi = require("joi");
const {
  addAnswerComment,
  findCommentById,
} = require("../../repositories/commentsRepository");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");

const schemaIdParam = Joi.number().integer().positive().required();
const schemaBody = Joi.object().keys({
  comment: Joi.string().min(5).max(255),
});

async function createAnswerComment(req, res) {
  try {
    const { id: idUser } = req.auth;
    const { idNews } = req.params;
    console.log(idNews);
    const { idComment } = req.params;
    await schemaIdParam.validateAsync(idComment);

    await schemaBody.validateAsync(req.body);
    const { comment } = req.body;
    console.log(comment);

    const commentToanswer = await findCommentById(idComment);
    if (!commentToanswer) {
      throwJsonError("esta noticia no existe", 400);
    }

    console.log(commentToanswer);

    await addAnswerComment(comment, idUser, +idNews, commentToanswer.id);

    res.status(201);
    res.send({ idComment, idNews, idUser, comment });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = createAnswerComment;
