"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const fs = require("fs");
// const path = require("path");
const fileUpload = require("express-fileupload");
app.use(express.json());

app.use(cors());

app.use(fileUpload());

app.use(express.static("public"));

const usersRouter = require("./app/routes/userRoutes");
const newsRouter = require("./app/routes/newsRoutes");
const commentsRouter = require("./app/routes/commentsRouter");

const port = process.env.SERVER_PORT || 3000;

app.use("/api/v1/users/", usersRouter);
app.use("/api/v1/news/", newsRouter);
app.use("/api/v1/comments/", commentsRouter);

app.listen(port, () => console.log(`Escuchando puerto ${port}`));
