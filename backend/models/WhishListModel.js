const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const whishListSchema = new Schema(
  {
    productId: {
      type: [Schema.Types.ObjectId],
      required: [true, "product id is required"],
      ref: "products",
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

module.exports = mongoose.model("whishList", whishListSchema);
