"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/usersRepository");
const {
  findCommentByUserId,
} = require("../../repositories/commentsRepository");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
// const { isAdmin } = require("../../helpers/utils");

const schema = Joi.number().positive();

async function getUserCommentsById(req, res) {
  try {
    const { id } = req.params;
    await schema.validateAsync(id);

    const user = await findUserById(id);
    if (!user) {
      throwJsonError("Usuario no existe", 400);
    }
    const comments = await findCommentByUserId(id);

    res.send(comments);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = { getUserCommentsById };
