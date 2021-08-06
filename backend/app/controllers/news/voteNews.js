"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findNewsById,
  upCounterNews,
  downCounterNews,
  saveUserVote,
  checkUserVote,
} = require("../../repositories/newsRepository");

const schemaIdParam = Joi.number().positive();

async function topNews(req, res) {
  try {
    const { id: idUser } = req.auth;

    const { idNews } = req.params;
    await schemaIdParam.validateAsync(idNews);

    const { body } = req;
    const { mas, menos } = body;

    const news = await findNewsById(idNews);
    if (!news) {
      throwJsonError("Esta noticia no existe", 400);
    }

    const voted = await checkUserVote(idUser, idNews);
    if (voted) {
      throwJsonError("ya has votado esta noticia!", 400);
    }

    let vote;
    if (mas === true) {
      vote = await upCounterNews(idNews);
    } else if (menos === true) {
      vote = await downCounterNews(idNews);
    }

    await saveUserVote(idUser, idNews);

    res.status(200);
    res.send(vote);
    console.log(vote);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = topNews;
