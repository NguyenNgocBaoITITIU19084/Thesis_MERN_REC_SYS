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
  const Cat = mongoose.model("Cat", { name: String });
  const kitty = new Cat({ name: "Zildjian" });
  const kitty123 = new Cat({ name: "123" });
  kitty.save().then(() => console.log("meow"));
  kitty123.save().then(() => console.log("meow"));
};

module.exports = ConnectMongoose;
