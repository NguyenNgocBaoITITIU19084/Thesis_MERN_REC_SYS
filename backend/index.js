require("dotenv").config();
const express = require("express");

const ConnectMongoose = require("./config/ConnectMongoose");
const catchError = require("./middlewares/catchErrors");
const { server } = require("./contants/server");
const messages = require("./config/Messages");

const CategoryRoutes = require("./routes/CategoryRoutes");

const PORT = process.env.PORT;

ConnectMongoose();

const app = express();

app.use(express.json());

app.use(`${server}/category`, CategoryRoutes);

app.use(catchError);

app.listen(PORT, () => {
  console.log(
    `${messages.server.success} ${PORT} with ${messages.server.url}${PORT}`
  );
});
