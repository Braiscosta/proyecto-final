"use strict";

const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const createComment = require("../controllers/comments/createComment");
const deleteComment = require("../controllers/comments/deleteComments");
const getComments = require("../controllers/comments/getComments");
const getCommentById = require("../controllers/comments/getCommentById");
const updateCommentById = require("../controllers/comments/updateCommentById");
const opineComment = require("../controllers/comments/opineComment");
const getCommentAndAnswers = require("../controllers/comments/getCommentAndAnswers");

const router = express.Router();
//publicas
router.route("/").get(getComments);
router.route("/:idComment").get(getCommentById);
router.route("/:idComment/answers").get(getCommentAndAnswers);

//Privadas
router.route("/").all(validateAuth).post(createComment);
router.route("/:idComment").all(validateAuth).delete(deleteComment);
router.route("/:idComment").all(validateAuth).put(updateCommentById);
router.route("/opinion/:idComment").all(validateAuth).post(opineComment);

module.exports = router;
