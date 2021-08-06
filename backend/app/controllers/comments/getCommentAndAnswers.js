"use strict";
const Joi = require("joi");
const {
  findCommentsWithAnswers,
  findCommentById,
} = require("../../repositories/commentsRepository");
const createJsonError = require("../../errors/createJsonError");

const schemaIdParam = Joi.number().integer().positive().required();

async function getCommentAndAnswers(req, res) {
  try {
    const { idComment } = req.params;
    await schemaIdParam.validateAsync(idComment);

    const comment = await findCommentById(idComment);

    if (!comment) {
      throw new Error("el comentario no existe");
    }

    const commentanswers = await findCommentsWithAnswers(idComment);

    res.status(200);
    res.send({ comment, commentanswers });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getCommentAndAnswers;
