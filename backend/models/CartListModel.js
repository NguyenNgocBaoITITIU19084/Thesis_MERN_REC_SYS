const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartListSchema = new Schema(
  {
    cartList: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: [true, "ProductId of Product is Required"],
        },
        quantity: {
          type: Number,
          default: 1,
          required: [true, "InStock of Product is Required"],
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("cartList", cartListSchema);
