"use strict";
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const validateAuth = require("../middlewares/validateAuth");
const getNewsById = require("../controllers/news/getNewsById");
const getNews = require("../controllers/news/getNews");
const deleteNews = require("../controllers/news/deleteNews");
const createComment = require("../controllers/comments/createComment");
const newsCommentsCounter = require("../controllers/news/newsCommentsCounter");
const createNews = require("../controllers/news/createNews");
const getCommentsByNews = require("../controllers/news/getCommentsByNews");
const voteNews = require("../controllers/news/voteNews");
const getTopNews = require("../controllers/news/getTopNews");
const getNewsByCategory = require("../controllers/news/getNewsByCategory");
const createAnswerComment = require("../controllers/comments/answerComment");
const updatePartnerNews = require("../controllers/news/updatePartnerNews");
const getCarouselTopNews = require("../controllers/news/getCarouselTopNews");
const getCarouselDateNews = require("../controllers/news/getCarouselDateNews");

router.route("/").get(getNews);
router.route("/carouselDate").get(getCarouselDateNews);
router.route("/top").get(getTopNews);
router.route("/carouselTop").get(getCarouselTopNews);
router.route("/:idNews").get(getNewsById);
router.route("/category/:category").get(getNewsByCategory);
router.route("/:idNews/comments").get(getCommentsByNews);
router.route("/:idNews/comments/counter").get(newsCommentsCounter);

//PRIVADAS
router.route("/").all(validateAuth).post(createNews);
router.route("/:idNews/vote").all(validateAuth).put(voteNews);
router.route("/:idNews").all(validateAuth).delete(deleteNews);
router.route("/:idNews").all(validateAuth).put(updatePartnerNews);
router.route("/:idNews/comments").all(validateAuth).post(createComment);
router
  .route("/:idNews/comments/:idComment/answer")
  .all(validateAuth)
  .post(createAnswerComment);

module.exports = router;
