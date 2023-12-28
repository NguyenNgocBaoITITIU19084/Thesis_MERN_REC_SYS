const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: [true, "code of discount is required"],
      minlength: [6, "code of discount  must be greater than 6 letters"],
    },
    description: {
      type: String,
    },
    persentDiscount: {
      type: Number,
      required: [true, "persentage of discount is required"],
      min: [5, "persentage of discount must be greater than 5%"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
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

module.exports = mongoose.model("discounts", discountSchema);
