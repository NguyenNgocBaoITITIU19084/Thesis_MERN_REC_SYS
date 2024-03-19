const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderList: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: [true, "ProductId of Product is Required"],
        },
        quantity: {
          type: Number,
          default: 1,
          required: [true, "quantity of Product is Required"],
        },
        shopOwner: {
          type: Schema.Types.ObjectId,
          ref: "stores",
        },
      },
    ],
    notes: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address of Product is Required"],
    },
    discountApplied: [
      {
        type: Schema.Types.ObjectId,
        ref: "discounts",
      },
    ],
    status: {
      type: String,
      default: "pending",
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

module.exports = mongoose.model("order", orderSchema);
