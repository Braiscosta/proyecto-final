"use strict";

const express = require("express");
const router = express.Router();
const activateUser = require("../controllers/users/activationUser");
const { getUsers } = require("../controllers/users/getUsers");
const getUser = require("../controllers/users/getUser");
const { loginUser } = require("../controllers/users/loginUser");
const { registerUser } = require("../controllers/users/registerUser");
const { updateUser } = require("../controllers/users/updateUser");
const deleteUser = require("../controllers/users/deleteUser");
const {
  getUserCommentsById,
} = require("../controllers/users/getUserCommentsById");

const validateAuth = require("../middlewares/validateAuth");
const { getUserprofile } = require("../controllers/users/getUserProfile");
const {
  uploadImageProfile,
} = require("../controllers/users/uploadImageProfile");

//Publicas
router.route("/").get(getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/activation").get(activateUser);
router.route("/:id/comments").get(getUserCommentsById);
router.route("/:idUser/profile").get(getUser);

//Privadas
router.route("/").all(validateAuth).get(getUsers).put(updateUser);
router.route("/profile").all(validateAuth).get(getUserprofile);
router.route("/:idUSer").all(validateAuth).delete(deleteUser);
router.route("/upload/image").all(validateAuth).post(uploadImageProfile);
router.route("/update/profile").all(validateAuth).put(updateUser);

module.exports = router;
