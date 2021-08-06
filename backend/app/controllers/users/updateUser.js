"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const {
  getUserByEmail,
  udpateUserById,
  findUserById,
  addVerificationCode,
} = require("../../repositories/usersrepository");
const createJsonError = require("../../errors/createJsonError");
const { sendEmailRegistration } = require("../../helpers/mailSmtp");
const throwJsonError = require("../../errors/throwJsonError");

const schemaBody = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
  bio: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref("password"),
});

async function updateUser(req, res) {
  try {
    const { id } = req.auth;
    const { body } = req;
    console.log(body);
    await schemaBody.validateAsync(body);
    const { name, email, password, repeatPassword, bio } = req.body;

    const userById = await findUserById(id);
    const user = await getUserByEmail(email);

    if (user.id !== id) {
      throwJsonError("Usuario con ese email ya existe", 409);
    }

    let updatedPassword = userById.password;

    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      updatedPassword = passwordHash;
    }

    if (email !== userById.email) {
      const verificationCode = cryptoRandomString({ length: 64 });
      await sendEmailRegistration(name, email, verificationCode);
      await addVerificationCode(id, verificationCode);
    }

    await udpateUserById({ id, name, email, password: updatedPassword, bio });

    res.send({ id, name, email, bio });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = { updateUser };
