"use strict";

const database = require("../infrastructure/database");

async function getUserByEmail(email) {
  const pool = await database.getPool();
  const consulta = `SELECT id, email
  FROM users
  WHERE email = ?`;
  const [user] = await pool.query(consulta, email);

  return user[0];
}
async function getUserByName(name) {
  const pool = await database.getPool();
  const consulta = `SELECT name
  FROM users
  WHERE name = ?`;
  const [user] = await pool.query(consulta, name);

  return user[0];
}
async function createUser(user) {
  const pool = await database.getPool();
  const now = new Date();
  const consulta = `
    INSERT INTO users(
      name,
      email,
      password,
      verification_code,
      rol,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [created] = await pool.query(consulta, [
    ...Object.values(user),
    "reader",
    now,
  ]);

  return created.insertId;
}

async function activateValidation(verificationCode) {
  const now = new Date();

  const pool = await database.getPool();
  const updateQuery = `UPDATE users
    SET verified_at = ?
    WHERE verification_code = ?
    AND verified_at IS NULL`;

  const [resultActivation] = await pool.query(updateQuery, [
    now,
    verificationCode,
  ]);

  return resultActivation.affectedRows === 1;
}

async function getUserByVerificationCode(verificationCode) {
  const pool = await database.getPool();
  const consulta = `SELECT name, email
  FROM users
  WHERE verification_code = ?`;
  const [user] = await pool.query(consulta, verificationCode);

  return user[0];
}

// async function findAllUsers() {
//   const pool = await database.getPool();
//   const consulta = "SELECT id, name, avatar, rol, verified_at FROM users";
//   const [users] = await pool.query(consulta);

//   return users;
// }

async function findAllUsers() {
  const pool = await database.getPool();
  const consulta = `select avg(tablaNueva.contador )as mediaTop,tablaNueva.id, tablaNueva.name,tablaNueva.rol, tablaNueva.avatar, tablaNueva.fecha from  (SELECT users.id as id, users.name as name, users.avatar as avatar, users.rol as rol, users.verified_at as fecha, news.counter_news as contador FROM users
   INNER JOIN news ON news.id_user = users.id) tablaNueva group by tablaNueva.id ORDER BY mediaTop DESC`;
  const [users] = await pool.query(consulta);

  return users;
}

async function login(username) {
  const pool = await database.getPool();
  const consulta = `SELECT id, name, rol, avatar, verified_at, password
    FROM users
    WHERE email = ? OR name = ?`;
  const [user] = await pool.query(consulta, [username, username]);

  console.log(user);
  return user[0];
}
async function removeUserById(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM users WHERE id = ?";
  await pool.query(query, id);

  return true;
}

async function findUserNews(idUser) {
  const pool = await database.getPool();
  const query = `SELECT * from news
  WHERE id_user = ? ORDER BY created_at DESC`;
  const [news] = await pool.query(query, idUser);
  console.log(news);
  return news;
}

async function findUserComments(idUser) {
  const pool = await database.getPool();
  const query = `SELECT comments.*, news.news_title FROM comments INNER JOIN news ON news.id = comments.id_news
  WHERE comments.id_user = ?`;
  const [news] = await pool.query(query, idUser);
  console.log(news);
  return news;
}

async function udpateUserById(data) {
  const { id, name, email, password, bio } = data;
  const pool = await database.getPool();
  const now = new Date();
  const updateQuery = `UPDATE users
  SET name = ?, email = ?, password = ?,bio = ?, updated_at = ? 
  WHERE id = ?`;
  await pool.query(updateQuery, [name, email, password, bio, now, id]);

  return true;
}

async function findUserProfileImage(id) {
  const pool = await database.getPool();
  const query = "SELECT picture FROM users WHERE id = ?";
  const [users] = await pool.query(query, id);

  return users[0];
}

async function addVerificationCode(id, code) {
  const now = new Date();
  const pool = await database.getPool();
  const insertQuery = `
    UPDATE INTO users SET verification_code = ?,
    updated_at = ?,
    verified_at = ?
    WHERE id = ?
  `;
  const [created] = await pool.query(insertQuery, [code, NULL, now, id]);

  return created.insertId;
}

///// id para comentarios

async function findUserById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM users WHERE id = ?";
  const [users] = await pool.query(query, id);

  return users[0];
}
//// funciones imagenes

async function findUserProfileImage(id) {
  const pool = await database.getPool();
  const query = "SELECT avatar FROM users WHERE id = ?";
  const [users] = await pool.query(query, id);

  return users[0];
}

async function uploadUserProfileImage(id, image) {
  const pool = await database.getPool();
  const updateQuery = "UPDATE users SET avatar = ? WHERE id = ?";
  await pool.query(updateQuery, [image, id]);

  return true;
}

module.exports = {
  activateValidation,
  addVerificationCode,
  createUser,
  removeUserById,
  findAllUsers,
  findUserNews,
  findUserComments,
  findUserProfileImage,
  getUserByEmail,
  getUserByName,
  getUserByVerificationCode,
  login,
  udpateUserById,
  findUserById,
  uploadUserProfileImage,
};
