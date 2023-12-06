const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "product name is required"],
      minlength: [3, "product must be greater than 3 letters"],
    },
    price: {
      type: Number,
      min: [1, "price of product must be greater than 1"],
      required: true,
      default: 1,
    },
    actualPrice: {
      type: Number,
      min: [1, "actual price of product must be greater than 1"],
      required: true,
      default: 1,
    },
    description: {
      type: String,
    },
    inStock: {
      type: Number,
      default: 1,
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

module.exports = mongoose.model("products", productSchema);
