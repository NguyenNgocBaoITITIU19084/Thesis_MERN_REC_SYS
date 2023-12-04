const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "category name is required"],
      minlenght: [6, "category length must be greater than 6, got {VALUE}"],
    },
    description: {
      type: String,
      minlenght: [6, "category length must be greater than 6, got {VALUE}"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("categories", categoriesSchema);
