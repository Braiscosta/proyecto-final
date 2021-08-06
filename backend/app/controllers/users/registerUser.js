"use strict";
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const createJsonError = require("../../errors/createJsonError");
const { sendEmailRegistration } = require("../../helpers/mailSmtp");
const {
  createUser,
  getUserByEmail,
  getUserByName,
} = require("../../repositories/usersRepository");
const schema = Joi.object({
  name: Joi.string().min(1).max(240).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref("password"),
});
async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password } = body;
    const user = await getUserByEmail(email);
    if (user) {
      const error = new Error("Ya existe un usuario registrado con ese email!");
      error.status = 400;
      throw error;
    }
    const nick = await getUserByName(name);
    if (nick) {
      const error = new Error("Ya existe un usario registrado con ese nombre!");
      error.status = 400;
      throw error;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationCode = await cryptoRandomString({ length: 64 });
    const userDB = { name, email, passwordHash, verificationCode };
    const userId = await createUser(userDB);
    console.log(userId);
    await sendEmailRegistration(name, email, verificationCode);
    res.status(200);
    res.send({ userId });
  } catch (error) {
    createJsonError(error, res);
  }
}
module.exports = { registerUser };
