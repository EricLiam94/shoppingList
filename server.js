const express = require("express");
const mongo = require("mongoose");
const items = require("./routes/api/item");
const users = require("./routes/api/user");
const auth = require("./routes/api/auth");
const img = require("./routes/api/img");
const path = require("path");
require("dotenv").config();

const app = express();
//Bodyparser
app.use(express.json());

//Router
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/img", img);

//Connect MongoDB
mongo.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  err => {
    console.log("mondodb is connected ...");
  }
);

//server static assets if in production
if (process.env.NODE_ENV == "production") {
  //set Static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port ${port} is listened ...`);
});
