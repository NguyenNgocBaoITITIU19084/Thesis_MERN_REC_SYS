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
      maxlength: [11, "phone number must be less than 11 numbers"],
      minlength: [10, "phone number must be greater than 10 numbers"],
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
