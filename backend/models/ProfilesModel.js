const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      maxlength: [30, "firstName must be less than 30 letters"],
    },
    lastName: {
      type: String,
      maxlength: [30, "firstName must be less than 30 letters"],
    },
    address: {
      type: [String],
      maxlength: [150, "address must be less than 150 characters"],
    },
    phoneNumber: {
      type: String,
      maxlength: [11, "phone number must be less than 11 numbers"],
      minlength: [10, "phone number must be greater than 10 numbers"],
    },
    points: {
      type: Number,
      default: 0,
      min: [0, "points of user must be greater than 0"],
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("profiles", profileSchema);
