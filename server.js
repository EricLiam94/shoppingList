const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("mongoose");
const items = require("./routes/api/item");
const path = require("path");
require("dotenv").config();

const app = express();

//Bodyparser
app.use(bodyParser.json());

app.use("/api/items", items);
mongo.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
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
  console.log("port 5000 is listened ...");
});
