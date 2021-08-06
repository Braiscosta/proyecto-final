"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  updateComment,
  findCommentById,
} = require("../../repositories/commentsRepository");

const schemaIdParam = Joi.number().positive().required();

const schemaBody = Joi.string().min(3).max(100).required();

async function updateCommentById(req, res) {
  try {
    const { id: idUser } = req.auth;
    const { idComment } = req.params;
    await schemaIdParam.validateAsync(idComment);

    const commentToModified = await findCommentById(idComment);
    if (!commentToModified) {
      throwJsonError("Comentario no existe", 400);
    }

    const { comment } = req.body;
    await schemaBody.validateAsync(comment);

    if (commentToModified.id_user !== idUser) {
      const error = new Error("no tienes permiso para realizar esta accion");
      error.status = 403;
      throw error;
    }
    await updateComment(idComment, comment);

    res.status(200);
    res.send("Comentario modificado correctamente");
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateCommentById;
