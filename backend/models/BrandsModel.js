const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "brand name is required"],
      minlength: [3, "brand must be greater than 3 letters"],
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("brands", brandSchema);
