require("dotenv").config();
const express = require("express");

const Mongoose = require("./config/Mongoose");

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log(
    `Server Back-end running on Port:${PORT} with url: http://localhost:${PORT}`
  );
});
