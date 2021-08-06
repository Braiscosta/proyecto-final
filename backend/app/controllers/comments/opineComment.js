"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findCommentById,
  giveDislikeComment,
  giveLikeComment,
  checkUserCommentReaction,
  saveCommentReaction,
} = require("../../repositories/commentsRepository");

const schemaIdParam = Joi.number().positive();

async function opineComment(req, res) {
  try {
    const { id: idUser } = req.auth;
    const { idComment } = req.params;
    const { like, dislike } = req.body;
    await schemaIdParam.validateAsync(idComment);

    const comment = await findCommentById(idComment);

    if (!comment) {
      throwJsonError("Este comentario no existe", 400);
    }

    const reaction = await checkUserCommentReaction(idUser, idComment);
    if (reaction) {
      throwJsonError("ya has reaccionado a este comentario!", 400);
    }

    let result;
    if (like === true) {
      result = await giveLikeComment(idComment);
    } else if (dislike === true) {
      result = await giveDislikeComment(idComment);
    }

    await saveCommentReaction(idUser, idComment);

    res.status(200);
    res.send(result);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = opineComment;
