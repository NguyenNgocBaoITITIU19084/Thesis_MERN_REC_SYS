const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "category name is required"],
      minlength: [3, "category must be greater than 3 letters"],
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

module.exports = mongoose.model("categories", categoriesSchema);
