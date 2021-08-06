"use strict";

const { findAllComments } = require("../../repositories/commentsRepository");
const createJsonError = require("../../errors/createJsonError");

async function getComments(req, res) {
  try {
    const comments = await findAllComments();

    res.send(comments);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getComments;
