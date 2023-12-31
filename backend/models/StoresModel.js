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
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      type: [String],
      maxlength: [250, "address must be less than 150 characters"],
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
      type: [Object],
      default:
        "https://media.istockphoto.com/id/1315110986/vector/store-editable-stroke-outline-icon-isolated-on-white-background-flat-vector-illustration.jpg?s=612x612&w=0&k=20&c=mCrUUX3bWTZOvKrr3ontPWJKO_9HAOmboDxxd_XeIRI=",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("stores", storeSchema);
