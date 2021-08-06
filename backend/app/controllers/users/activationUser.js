"use strict";
const createJsonError = require("../../errors/createJsonError");
const {
  activateValidation,
  getUserByVerificationCode,
} = require("../../repositories/usersRepository");
const { sendEmailCorrectValidation } = require("../../helpers/mailSmtp");

async function activateUser(req, res) {
  try {
    const { verification_code: verificationCode } = req.query;

    if (!verificationCode) {
      return res.status(400).json({
        message: "Código de verificacion no valido",
      });
    }

    const isActivated = await activateValidation(verificationCode);

    if (!isActivated) {
      res.send({
        message: "Cuenta no activada. Código de verificacion caducado",
      });
    }

    const user = await getUserByVerificationCode(verificationCode);
    const { name, email } = user;
    await sendEmailCorrectValidation(name, email);

    res.send({ message: "Cuenta activada!" });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = activateUser;
