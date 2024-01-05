const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const whishListSchema = new Schema(
  {
    productId: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: [true, "productId of product is required"],
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("whishList", whishListSchema);
