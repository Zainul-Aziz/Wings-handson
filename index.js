// import express from "express";
const app = require("./app");
const PORT = 3001;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Application running on ` + PORT);
  } else {
    console.log(err);
  }
});
