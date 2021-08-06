const createJsonError = require("../../errors/createJsonError");
const {
  findUserById,
  findUserNews,
  findUserComments,
} = require("../../repositories/usersRepository");

async function getUserprofile(req, res) {
  try {
    const { id } = req.auth;

    const user = await findUserById(id);

    const userNews = await findUserNews(id);

    const userComments = await findUserComments(id);

    const datos = {
      user: user,
      news: userNews,
      comments: userComments,
    };
    res.status(200);
    res.send(datos);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { getUserprofile };
