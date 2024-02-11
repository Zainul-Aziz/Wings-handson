const express = require("express");
const sellandBuyRouter = require("./routers/sellandbuy");
const bodyParser = require("body-parser");
require("./mongoose/connect_DB/mongoose");
const PORT = 3001;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/", sellandBuyRouter);

app.get("/", (req, res) => {
  res.send("Application running...");
});

module.exports = app;
