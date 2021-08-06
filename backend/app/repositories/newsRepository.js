"use strict";
const database = require("../infrastructure/database");
const axios = require("axios");
const charset = require("charset");
const iconv = require("iconv-lite");
const { JSDOM } = require("jsdom");

const PAGE_SIZE = 3;

async function addNews(news, idUser) {
  const pool = await database.getPool();
  const now = new Date();
  const consulta = `INSERT INTO news(
      news_title,
      news_lead,
      news_text,
      picture,
      category,
      created_at,
      id_user
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const [created] = await pool.query(consulta, [
    ...Object.values(news),
    now,
    idUser,
  ]);
  return created.insertId;
}

async function updateNews(data) {
  const { title, lead, text, picture, category, idNews } = data;
  const pool = await database.getPool();
  const now = new Date();
  const consulta = `UPDATE news SET
  news_title = ?,
  news_lead =?,
  news_text =?,
  picture=?,
  category=?,
  updated_at =?
  WHERE id = ?;`;

  await pool.query(consulta, [
    title,
    lead,
    text,
    picture,
    category,
    now,
    idNews,
  ]);
  return true;
}

axios.interceptors.response.use((response) => {
  const ctype = charset(response.headers).toLowerCase();
  if (ctype !== "utf-8" && iconv.encodingExists(ctype)) {
    response.data = iconv.decode(response.data, ctype);
  }
  return response;
});

async function getHtmlContent(url) {
  const html = await axios({
    url,
    responseType: "arraybuffer",
  });
  const dom = new JSDOM(html.data);
  return dom;
}

async function findAllNews({ page = 0 }) {
  const pool = await database.getPool();
  const consulta = `
  SELECT * FROM (SELECT news.*, users.name as user_name, users.avatar as user_avatar,count(comments.id_news) as comment_counter FROM news
  INNER JOIN users ON news.id_user = users.id LEFT JOIN comments on news.id = comments.id_news group by news.id) as tablaNueva
  GROUP BY tablaNueva.id ORDER BY tablaNueva.created_at DESC LIMIT ? OFFSET ?
    `;
  const [news] = await pool.query(consulta, [PAGE_SIZE, PAGE_SIZE * page]);

  return news;
}

async function findNewsById(idNews) {
  const pool = await database.getPool();
  const consulta = `
  SELECT * FROM (SELECT news.*, users.name as user_name, users.avatar as user_avatar,count(comments.id_news) as comment_counter FROM news
  INNER JOIN users ON news.id_user = users.id LEFT JOIN comments on news.id = comments.id_news WHERE news.id = ? group by news.id) as tablaNueva
  GROUP BY tablaNueva.id  ORDER BY tablaNueva.counter_news DESC;
  `;
  const [news] = await pool.query(consulta, idNews);

  return news[0];
}

async function findNewsByCategory(category, page = 0) {
  const pool = await database.getPool();
  const consulta = `
  SELECT * FROM (SELECT news.*, users.name as user_name, users.avatar as user_avatar,count(comments.id_news) as comment_counter FROM news
  INNER JOIN users ON news.id_user = users.id LEFT JOIN comments on news.id = comments.id_news WHERE category = ?  group by news.id) as tablaNueva
  GROUP BY tablaNueva.id  ORDER BY tablaNueva.counter_news DESC LIMIT ? OFFSET ?;
  `;
  const [news] = await pool.query(consulta, [
    category,
    PAGE_SIZE,
    PAGE_SIZE * page,
  ]);

  return news;
}
async function findNewsComments(idNews) {
  const pool = await database.getPool();
  const consulta = `SELECT news.news_title, comments.* , users.name, users.avatar FROM news 
  RIGHT JOIN comments ON news.id = comments.id_news
  RIGHT JOIN users ON users.id = comments.id_user WHERE news.id = ?`;
  const [news] = await pool.query(consulta, idNews);

  return news;
}

async function orderForTop({ page = 0 }) {
  const pool = await database.getPool();
  const consulta = `
  SELECT * FROM (SELECT news.*, users.name as user_name, users.avatar as user_avatar,count(comments.id_news) as comment_counter FROM news
  INNER JOIN users ON news.id_user = users.id LEFT JOIN comments on news.id = comments.id_news group by news.id) as tablaNueva
  GROUP BY tablaNueva.id ORDER BY tablaNueva.counter_news DESC LIMIT ? OFFSET ?
  `;
  const [news] = await pool.query(consulta, [PAGE_SIZE, PAGE_SIZE * page]);

  return news;
}

async function getCarouselForTop() {
  const pool = await database.getPool();
  const consulta = `
  SELECT * FROM (SELECT news.*, users.name as user_name, users.avatar as user_avatar,count(comments.id_news) as comment_counter FROM news
  INNER JOIN users ON news.id_user = users.id LEFT JOIN comments on news.id = comments.id_news group by news.id) as tablaNueva
  GROUP BY tablaNueva.id ORDER BY tablaNueva.counter_news DESC
  `;
  const [news] = await pool.query(consulta);

  return news;
}

async function findNewsById(idNews) {
  const pool = await database.getPool();
  const consulta = `
  SELECT * FROM (SELECT news.*, users.name as user_name, users.avatar as user_avatar,count(comments.id_news) as comment_counter FROM news
  INNER JOIN users ON news.id_user = users.id LEFT JOIN comments on news.id = comments.id_news WHERE news.id = ? group by news.id) as tablaNueva
  GROUP BY tablaNueva.id  ORDER BY tablaNueva.counter_news DESC;
  `;
  const [news] = await pool.query(consulta, idNews);

  return news[0];
}

async function getCarouselForDate() {
  const pool = await database.getPool();
  const consulta = `
  SELECT * FROM (SELECT news.*, users.name as user_name, users.avatar as user_avatar,count(comments.id_news) as comment_counter FROM news
  INNER JOIN users ON news.id_user = users.id LEFT JOIN comments on news.id = comments.id_news group by news.id) as tablaNueva
  GROUP BY tablaNueva.id ORDER BY tablaNueva.created_at DESC
    `;
  const [news] = await pool.query(consulta);

  return news;
}

async function removeNewsById(idNews) {
  const pool = await database.getPool();
  const consulta = "DELETE FROM news WHERE id = ?";
  await pool.query(consulta, idNews);

  return true;
}

async function upCounterNews(idNews) {
  const pool = await database.getPool();
  const updateQuery = `
  update news set counter_news=counter_news+1 where id=?`;
  await pool.query(updateQuery, [idNews]);

  return await findNewsById(idNews);
}

async function downCounterNews(idNews) {
  const pool = await database.getPool();
  const updateQuery = `
  update news set counter_news=counter_news-1 where id=?`;
  await pool.query(updateQuery, [idNews]);

  return await findNewsById(idNews);
}

async function saveUserVote(idUSer, idNews) {
  const pool = await database.getPool();
  const query = `INSERT INTO votes
  SET vote = true, id_user = ?, id_news = ?`;
  const [voted] = await pool.query(query, [idUSer, idNews]);

  return voted.insertId;
}

async function checkUserVote(idUser, idNews) {
  const pool = await database.getPool();
  const query = `SELECT vote FROM votes WHERE id_user =? and id_news=?`;
  const [voted] = await pool.query(query, [idUser, idNews]);

  return voted[0];
}

module.exports = {
  addNews,
  getHtmlContent,
  findNewsById,
  findAllNews,
  removeNewsById,
  upCounterNews,
  downCounterNews,
  orderForTop,
  saveUserVote,
  checkUserVote,
  findNewsByCategory,
  findNewsComments,
  updateNews,
  getCarouselForTop,
  getCarouselForDate,
};
