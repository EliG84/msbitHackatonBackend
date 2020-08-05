const express = require("express");
const mongoConnect = require("./mongo/mongoConnect");

mongoConnect();

const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("connected");
});
