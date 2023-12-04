require("dotenv").config();
const express = require("express");

const ConnectMongoose = require("./config/ConnectMongoose");
const messages = require("./config/Messages");
const PORT = process.env.PORT;

ConnectMongoose();

const app = express();

app.listen(PORT, () => {
  console.log(
    `${messages.server.success} ${PORT} with ${messages.server.url}${PORT}`
  );
});
