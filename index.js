// env vars
require("dotenv").config();

const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

// start server/mongoose
server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI,
    {
      useNewUrlParser: true
    }
  );
  mongoose.set("useCreateIndex", true);
});

// setup db
const db = mongoose.connection;

db.on("error", err => console.log(err));
db.once("open", () => {
  require("./routes/contacts")(server);

  console.log(`Server started on port ${config.PORT}`);
});
