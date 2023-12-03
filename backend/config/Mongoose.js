require("dotenv").config();
const mongoose = require("mongoose");

const Mongoose = () => {
  mongoose
    .connect(process.env.Mongoose_URL)
    .then(console.log("Success Connection to DB"))
    .catch("Failed to Connection to DB");
};

module.exports = Mongoose;
