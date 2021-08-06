"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { login } = require("../../repositories/usersRepository");
const createJsonError = require("../../errors/createJsonError");

const schema = Joi.object({
  userName: Joi.alternatives()
    .try(Joi.string().email(), Joi.string().alphanum().min(3).max(30))
    .required(),
  password: Joi.string().min(4).max(20).required(),
});

async function loginUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { userName, password } = body;

    const user = await login(userName, password);

    if (!user) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );

      error.status = 403;
      throw error;
    }
    const { id, name, rol, avatar, verified_at: verifiedAt } = user;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );
      error.status = 403;
      throw error;
    }

    if (!verifiedAt) {
      const error = new Error(
        "Verifique su cuenta para poder acceder a nuestros servicios"
      );

      error.status = 401;
      throw error;
    }
    const { JWT_SECRET } = process.env;

    const tokenPayload = { id, name, rol, avatar };
    const token = jwt.sign(tokenPayload, JWT_SECRET);

    const response = {
      accessToken: token,
    };

    res.status(200);
    res.send(response);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { loginUser };
