"use strict";

const { object } = require("joi");
const database = require("../infrastructure/database");

async function addComment(comment, idUser, idNews) {
  const pool = await database.getPool();
  const now = new Date();
  const insertQuery = `INSERT
    INTO comments (comment,created_at,id_user,id_news)
    VALUES (?,?,?,?)`;

  const [created] = await pool.query(insertQuery, [
    comment,
    now,
    idUser,
    idNews,
  ]);

  return created.insertId;
}

async function updateComment(id, comment) {
  const now = new Date();
  const pool = await database.getPool();
  const updateQuery = `
    UPDATE comments
    SET comment = ?, updated_at = ?
    WHERE id = ?`;
  await pool.query(updateQuery, [comment, now, id]);

  return true;
}

async function addAnswerComment(comment, idUser, idNews, idCommentToAnswer) {
  const pool = await database.getPool();
  const now = new Date();
  console.log("comment", comment, idUser, idNews, idCommentToAnswer);
  const insertQuery = `INSERT
    INTO comments (comment,created_at,id_user,id_news,id_answered)
    VALUES (?,?,?,?,?)`;

  const [created] = await pool.query(insertQuery, [
    comment,
    now,
    idUser,
    idNews,
    idCommentToAnswer,
  ]);

  return created.insertId;
}

async function findCommentsWithAnswers(idComment) {
  const pool = await database.getPool();

  const query = `SELECT comment, id, id_answered FROM comments WHERE id_answered=?`;
  const [comments] = await pool.query(query, idComment);

  return comments;
}

async function findAllComments() {
  const pool = await database.getPool();

  const query = `SELECT comments.*, users.name,users.avatar, news.news_title, news.news_lead, news.created_at
    FROM comments
    INNER JOIN users ON users.id = comments.id_user
    INNER JOIN news ON news.id = comments.id_news`;
  const [comments] = await pool.query(query);

  return comments;
}

async function deleteCommentById(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM comments WHERE id = ?";
  const [comments] = await pool.query(query, id);

  return comments;
}

async function findCommentById(idComment) {
  const pool = await database.getPool();
  const query = `SELECT comments.*, users.name,users.avatar, news.news_title, news.news_lead, news.created_at as created_at_news
  FROM comments
  INNER JOIN users ON users.id = comments.id_user
  INNER JOIN news ON news.id = comments.id_news WHERE comments.id = ?`;
  const [comments] = await pool.query(query, idComment);
  return comments[0];
}

async function findCommentByUserId(idUser) {
  const pool = await database.getPool();
  const query = `SELECT * 
    FROM comments
    WHERE id_user = ?`;
  const [comments] = await pool.query(query, idUser);

  return comments;
}

async function counterNewsComments(id) {
  const pool = await database.getPool();
  const query = `SELECT count(id_news) as total
  FROM comments
  WHERE id_news = ?;`;
  const [comments] = await pool.query(query, id);

  const [{ total }] = comments;
  return total;
}

async function giveLikeComment(idComment) {
  const pool = await database.getPool();
  const updateQuery = `
  UPDATE comments SET comment_like = comment_like+1 where id=?`;
  await pool.query(updateQuery, [idComment]);

  return await findCommentById(idComment);
}

async function giveDislikeComment(idComment) {
  const pool = await database.getPool();
  const updateQuery = `
  UPDATE comments SET comment_dislike = comment_dislike+1 where id=?`;
  await pool.query(updateQuery, [idComment]);

  return await findCommentById(idComment);
}

async function saveCommentReaction(idUSer, idComment) {
  const pool = await database.getPool();
  const query = `INSERT INTO reaction_comments
  SET reaction = true, id_user = ?, id_comment = ?`;
  const [reaction] = await pool.query(query, [idUSer, idComment]);

  return reaction.insertId;
}

async function checkUserCommentReaction(idUser, idComment) {
  const pool = await database.getPool();
  const query = `SELECT reaction FROM reaction_comments WHERE id_user =? and id_comment=?`;
  const [reaction] = await pool.query(query, [idUser, idComment]);

  return reaction[0];
}

module.exports = {
  addComment,
  findAllComments,
  deleteCommentById,
  findCommentById,
  findCommentByUserId,
  updateComment,
  counterNewsComments,
  giveDislikeComment,
  giveLikeComment,
  addAnswerComment,
  findCommentsWithAnswers,
  checkUserCommentReaction,
  saveCommentReaction,
};
