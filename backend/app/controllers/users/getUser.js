"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const {
  findUserById,
  findUserNews,
  findUserComments,
} = require("../../repositories/usersRepository");

const schemaIdParam = Joi.number().integer().positive().required();

async function getUser(req, res) {
  try {
    const { idUser } = req.params;
    await schemaIdParam.validateAsync(idUser);

    const user = await findUserById(idUser);

    const userNews = await findUserNews(idUser);

    const userComments = await findUserComments(idUser);

    const { name, bio, avatar, created_at } = user;

    const datos = {
      user: { name, bio, avatar, created_at },
      news: userNews,
      comments: userComments,
    };
    res.status(200);
    res.send(datos);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUser;
