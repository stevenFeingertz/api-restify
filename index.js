// env vars
require("dotenv").config();

const restify = require("restify");
// const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/config.js");

// const app = express();
const server = restify.createServer();

// middleware
// app.use(bodyParser.json());

server.use(restify.plugins.bodyParser());

// start server/coonect to mongoDB
server.listen(config.PORT, () => {
	mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true});
	mongoose.set("useCreateIndex", true);
});

// setup db
const db = mongoose.connection;

db.on("error", err => console.log(err));
db.once("open", () => {
	// routes
	require("./routes/contacts")(server);

	console.log(`Server started on port ${config.PORT}`);
});