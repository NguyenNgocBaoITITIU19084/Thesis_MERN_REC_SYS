require("dotenv").config();
const mongoose = require("mongoose");

const messages = require("./Messages");
const Mongoose_URL = process.env.Mongoose_URL;

const ConnectMongoose = () => {
  mongoose
    .connect(Mongoose_URL)
    .then(console.log(`${messages.mongoose.success} ${Mongoose_URL}`))
    .catch((error) => {
      console.log(`${messages.mongoose.failed}`);
      console.log(`${messages.mongoose.error}`);
    });
};

module.exports = ConnectMongoose;
