require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const ConnectMongoose = require("./config/ConnectMongoose");
const EmailService = require("./utils/EmailService");
const catchError = require("./middlewares/catchErrors");
const { server } = require("./contants/server");
const messages = require("./config/Messages");

const CategoryRoutes = require("./routes/CategoryRoutes");
const BrandRoutes = require("./routes/BrandRoute");
const DiscountRoutes = require("./routes/DiscountRoute");
const ProductRoutes = require("./routes/ProductRoutes");
const CommentRoutes = require("./routes/CommentRoute");
const UserRoutes = require("./routes/UserRoute");
const ProfileRoutes = require("./routes/ProfileRoute");
const StoreRoutes = require("./routes/StoreRoutes");
const CloudinaryRoutes = require("./routes/UploadCloudinary");
const WhishListRoutes = require("./routes/WhishListRoute");
const CartListRoutes = require("./routes/CartListRoute");

const PORT = process.env.PORT;

ConnectMongoose();
EmailService.init();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(`${server}/category`, CategoryRoutes);
app.use(`${server}/brand`, BrandRoutes);
app.use(`${server}/discount`, DiscountRoutes);
app.use(`${server}/product`, ProductRoutes);
app.use(`${server}/comment`, CommentRoutes);
app.use(`${server}/auth`, UserRoutes);
app.use(`${server}/profile`, ProfileRoutes);
app.use(`${server}/store`, StoreRoutes);
app.use(`${server}/uploadCloudinary`, CloudinaryRoutes);
app.use(`${server}/whish-list`, WhishListRoutes);
app.use(`${server}/cart-list`, CartListRoutes);

app.use(catchError);

app.listen(PORT, () => {
  console.log(
    `${messages.server.success} ${PORT} with ${messages.server.url}${PORT}`
  );
});
