const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
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
    soldOut: {
      type: Number,
      default: 0,
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
    discountApplied: {
      type: [Schema.Types.ObjectId],
      ref: "discounts",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: [true, "brand of product is required"],
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "categories",
      required: [, "category of product is required"],
    },
    total_rating: {
      type: Number,
      default: 0,
    },
    // comments: {
    //   type: [Schema.Types.ObjectId],
    //   ref: "comments",
    // },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "stores",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("products", productSchema);
