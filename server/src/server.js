const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
// server.use(express.urlencoded({ extended: true, limit: '50mb' }));
// server.use(express.json({ limit: '50mb' }));
// server.use(cookieParser());
server.use(cors());

//main router ---> /routes/index.js
server.use(router);

module.exports = server;
