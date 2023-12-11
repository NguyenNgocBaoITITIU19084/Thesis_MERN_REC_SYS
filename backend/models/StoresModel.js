const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "store name is required"],
      minlength: [3, "store must be greater than 3 letters"],
    },
    description: {
      type: String,
      maxlength: [
        100,
        "description of the store must be less than 100 letters",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      type: [String],
      maxlength: [150, "address must be less than 150 characters"],
    },
    phoneNumber: {
      type: [String],
      maxlength: [11, "phone number must be less than 11 numbers"],
      minlength: [10, "phone number must be greater than 10 numbers"],
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("stores", storeSchema);
