"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findCommentById } = require("../../repositories/commentsRepository");

const schemaIdParam = Joi.number().positive().required();

async function getCommentById(req, res) {
  try {
    const { idComment } = req.params;
    await schemaIdParam.validateAsync(idComment);

    const comment = await findCommentById(idComment);
    if (!comment) {
      throw new Error("Id no valido");
    }

    res.status(200);
    res.send(comment);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCommentById;
