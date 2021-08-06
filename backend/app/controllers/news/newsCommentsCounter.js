"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const {
  counterNewsComments,
} = require("../../repositories/commentsRepository");

const schemaIdParam = Joi.number().integer().positive().required();

async function newsCommentsCounter(req, res) {
  try {
    const { idNews } = req.params;
    await schemaIdParam.validateAsync(idNews);

    const numberOfComments = await counterNewsComments(idNews);

    res.status(200);
    res.send(`Total comentarios noticia: ${numberOfComments}`);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = newsCommentsCounter;
