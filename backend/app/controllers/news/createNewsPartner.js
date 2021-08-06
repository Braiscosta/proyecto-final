"use strict";
const Joi = require("joi");
const cryptoRandomString = require("crypto-random-string");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { addNews } = require("../../repositories/newsRepository");

const schemaBody = Joi.object().keys({
  title: Joi.string().min(5).max(400).required(),
  lead: Joi.string().min(5).max(400).required(),
  text: Joi.string().min(5).max(1000).required(),
  category: Joi.string().valid(
    "politica",
    "economia",
    "deportes",
    "ciencia-y-tecnologia",
    "cultura"
  ),
});

const validExtensions = [".jpeg", ".jpg", ".png"];

async function createNewsPartner(req, res) {
  try {
    const { id: idUser } = req.auth;
    const data = req.body;
    await schemaBody.validateAsync(data);

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError("No se ha seleccionado ningún fichero", 400);
    }

    const { image } = files;
    const extension = path.extname(image.name);

    const { HTTP_SERVER_DOMAIN, PATH_NEWS_IMAGE } = process.env;

    const pathNewsImageFolder = `${__dirname}/../../../public/${PATH_NEWS_IMAGE}`;

    if (!validExtensions.includes(extension)) {
      throwJsonError("Formato no valido", 400);
    }

    const random = cryptoRandomString({ length: 10, type: "alphanumeric" });
    const imageName = `${random}${extension}`;

    const pathImage = `${pathNewsImageFolder}/${imageName}`;
    data.picture = imageName;
    const { title, lead, text, category, picture } = data;

    const news = { title, lead, text, picture, category };

    image.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      const idNEWs = await addNews(news, idUser);

      res.status(201);
      res.send({
        id: idNEWs,
        title,
        lead,
        text,
        category,
        picture: `${HTTP_SERVER_DOMAIN}/${PATH_NEWS_IMAGE}/${imageName}`,
      });
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createNewsPartner;
