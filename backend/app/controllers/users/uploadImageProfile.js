"use strict";

const cryptoRandomString = require("crypto-random-string");
const createJsonError = require("../../errors/createJsonError");
const path = require("path");
const fs = require("fs");
const {
  findUserProfileImage,
  uploadUserProfileImage,
} = require("../../repositories/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");

const validExtensions = [".jpeg", ".jpg", ".png"];

async function uploadImageProfile(req, res) {
  try {
    const { id } = req.auth;

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError("No se ha seleccionado ningún fichero", 400);
    }

    const { profileImage } = files;
    const extension = path.extname(profileImage.name);

    if (!validExtensions.includes(extension)) {
      throwJsonError("Formato no valido", 400);
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;

    const user = await findUserProfileImage(id);

    const pathProfileImageFolder = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;

    if (user.avatar) {
      await fs.unlink(`${pathProfileImageFolder}/${user.avatar}`, () => {
        console.log("Borrada imagen de perfil correctamente");
      });
    }

    const random = cryptoRandomString({ length: 10, type: "alphanumeric" });
    const imageName = `${id}-${random}${extension}`;

    const pathImage = `${pathProfileImageFolder}/${imageName}`;

    profileImage.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      await uploadUserProfileImage(id, imageName);

      res.send({
        url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${imageName}`,
      });
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = { uploadImageProfile };
