const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

app.listen(5999, () => {
  console.log("服务器端口在5999");
});
