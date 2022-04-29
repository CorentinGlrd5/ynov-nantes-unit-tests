const app = require("./src/app");
const PORT = process.env.PORT || 5000;
const express = require("express");
const path = require("path");

app.use(express.static(path.join(__dirname + "/public")));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`);
});
