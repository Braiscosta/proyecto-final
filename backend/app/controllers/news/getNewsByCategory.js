"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findNewsByCategory } = require("../../repositories/newsRepository");

const schemaBody = Joi.string()
  .valid("politica", "economia", "deportes", "ciencia-y-tecnologia", "cultura")
  .required();

async function getNewsByCategory(req, res) {
  try {
    const { category } = req.params;
    const { page } = req.query;
    console.log(category);
    await schemaBody.validateAsync(category);

    const news = await findNewsByCategory(category, page);
    if (!news) {
      throw new Error(`No existen noticias en la categotia ${category}`);
    }

    res.status(200);
    res.send(news);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getNewsByCategory;
