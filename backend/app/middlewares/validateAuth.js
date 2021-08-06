"use strict";
const jwt = require("jsonwebtoken");
const createJsonError = require("../errors/createJsonError");
const { JWT_SECRET } = process.env;

function extractAccessToken(headers) {
  const { authorization } = headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Debes crear una cuenta para participar");
    error.status = 403;
    throw error;
  }

  return authorization.split(" ")[1];
}

function decodeToken(token) {
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch {
    throw new Error("Se ha terminado la sesión");
  }
}

function validateAuth(req, res, next) {
  try {
    const token = extractAccessToken(req.headers);

    const { id, name, rol, avatar } = decodeToken(token);

    req.auth = { id, name, rol, avatar };

    next();
  } catch (error) {
    error.status = 401;
    createJsonError(error, res);
  }
}

module.exports = validateAuth;
