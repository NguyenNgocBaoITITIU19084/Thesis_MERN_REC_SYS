require("dotenv").config();
const express = require("express");

const ConnectMongoose = require("./config/ConnectMongoose");
const catchError = require("./middlewares/catchErrors");
const { server } = require("./contants/server");
const messages = require("./config/Messages");

const CategoryRoutes = require("./routes/CategoryRoutes");
const BrandRoutes = require("./routes/BrandRoute");
const DiscountRoutes = require("./routes/DiscountRoute");
const ProductRoutes = require("./routes/ProductRoutes");

const PORT = process.env.PORT;

ConnectMongoose();

const app = express();

app.use(express.json());

app.use(`${server}/category`, CategoryRoutes);
app.use(`${server}/brand`, BrandRoutes);
app.use(`${server}/discount`, DiscountRoutes);
app.use(`${server}/product`, ProductRoutes);

app.use(catchError);

app.listen(PORT, () => {
  console.log(
    `${messages.server.success} ${PORT} with ${messages.server.url}${PORT}`
  );
});
