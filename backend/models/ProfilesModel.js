const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      maxlength: [30, "firstName must be less than 30 letters"],
      default: null,
    },
    lastName: {
      type: String,
      maxlength: [30, "firstName must be less than 30 letters"],
      default: null,
    },
    address: {
      type: [String],
      maxlength: [150, "address must be less than 150 characters"],
      default: null,
    },
    phoneNumber: {
      type: String,
      maxlength: [11, "phone number must be less than 11 numbers"],
      minlength: [10, "phone number must be greater than 10 numbers"],
      default: null,
    },
    points: {
      type: Number,
      default: 0,
      min: [0, "points of user must be greater than 0"],
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("profiles", profileSchema);
