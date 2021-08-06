"use strict";

const createJsonError = require("../../errors/createJsonError");
const { findAllUsers } = require("../../repositories/usersRepository");

async function getUsers(req, res) {
  try {
    const users = await findAllUsers();

    res.status(200);
    res.send(users);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { getUsers };
