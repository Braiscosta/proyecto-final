"use strict";
const Joi = require("joi");
const cryptoRandomString = require("crypto-random-string");
const path = require("path");
const fs = require("fs");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  updateNews,
  findNewsById,
} = require("../../repositories/newsRepository");

const schemaIdParam = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
  title: Joi.string().min(5).max(400).required(),
  lead: Joi.string().min(5).max(400).required(),
  text: Joi.string().min(5).max(1000).required(),
  category: Joi.string().valid(
    "politica",
    "economia",
    "deportes",
    "ciencia y tecnologia",
    "cultura"
  ),
});

const validExtensions = [".jpeg", ".jpg", ".png"];
async function updatePartnerNews(req, res) {
  try {
    const { id: idUser } = req.auth;
    const { idNews } = req.params;
    await schemaIdParam.validateAsync(idNews);

    const newstoUpdate = await findNewsById(idNews);
    if (!newstoUpdate) {
      throwJsonError("noticia no existe", 400);
    }

    if (newstoUpdate.id_user !== idUser) {
      const error = new Error("no tienes permiso para realizar esta accion");
      error.status = 403;
      throw error;
    }

    try {
      await schemaBody.validateAsync(req.body);
    } catch {
      throw new Error("Elige una categoría");
    }

    const { image } = req.files || {};

    const { title, lead, text, category } = req.body;

    const news = {
      title,
      lead,
      text,
      picture: newstoUpdate.picture,
      category,
      idNews,
    };

    if (image) {
      const extension = path.extname(image.name);

      const { PATH_NEWS_IMAGE } = process.env;

      const pathNewsImageFolder = `${__dirname}/../../../public/${PATH_NEWS_IMAGE}`;
      const random = cryptoRandomString({ length: 10, type: "alphanumeric" });
      const imageName = `${random}${extension}`;
      const pathImage = `${pathNewsImageFolder}/${imageName}`;

      if (!validExtensions.includes(extension)) {
        throwJsonError("Formato no valido", 400);
      }

      await image.mv(pathImage);
      news.picture = imageName;
    }

    await updateNews(news);

    res.status(200);
    res.send({ message: "Noticia modificada correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updatePartnerNews;
