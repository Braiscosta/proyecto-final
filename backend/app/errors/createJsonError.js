"use strict";

function createJsonError(err, res) {
  if (err.name === "ValidationError") {
    err.status = 400;
  }

  res.status(err.status || 500);
  const { message } = err;
  res.send({
    error: message,
  });
}

module.exports = createJsonError;
