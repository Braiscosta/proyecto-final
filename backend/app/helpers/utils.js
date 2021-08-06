"use strict";

async function isAdmin(rol) {
  if (rol !== "admin") {
    const error = new Error("No tienes permisos para realizar esta acción");
    error.status = 401;
    throw error;
  }

  return true;
}

module.exports = {
  isAdmin,
};
