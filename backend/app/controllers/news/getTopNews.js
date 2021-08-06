"use strict";
const { orderForTop } = require("../../repositories/newsRepository");
const createJsonError = require("../../errors/createJsonError");

async function getTopNews(req, res) {
  try {
    const { page } = req.query;
    const top = await orderForTop({ page });
    res.status(200);
    res.send(top);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getTopNews;
