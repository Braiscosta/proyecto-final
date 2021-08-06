"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const {
  findUserById,
  removeUserById,
} = require("../../repositories/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");

const schemaIdParam = Joi.number().integer().positive().required();

async function deleteUser(req, res) {
  try {
    const { idUSer } = req.params;
    const { id: idToken } = req.auth;
    await schemaIdParam.validateAsync(idUSer);

    const user = await findUserById(idUSer);
    if (!user) {
      throwJsonError("Usuario no existe", 400);
    }

    if (user.id !== idToken) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    await removeUserById(idUSer);

    res.status(200).send("Borrado correctamente");
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUser;
