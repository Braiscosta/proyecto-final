"use strict";

const Joi = require("joi");
const {
  findCommentById,
  deleteCommentById,
} = require("../../repositories/commentsRepository");
const createJsonError = require("../../errors/createJsonError");

const schemaIdParam = Joi.number().positive().required();

async function deleteComment(req, res) {
  try {
    const { idComment } = req.params;
    const { id: idUser } = req.auth;
    await schemaIdParam.validateAsync(idComment);

    const comment = await findCommentById(idComment);
    if (!comment) {
      const error = new Error("comentario no existente");
      error.status = 400;
      throw error;
    }

    if (comment.id_user !== idUser) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    await deleteCommentById(idComment);

    res.status(200);
    res.send({ message: `Comentario id:${idComment} borrado` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteComment;
