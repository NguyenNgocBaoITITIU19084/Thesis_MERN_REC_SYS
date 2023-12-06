const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: [true, "disocunt's code is required"],
      minlength: [6, "disocunt's code  must be greater than 6 letters"],
    },
    description: {
      type: String,
    },
    persentDiscount: {
      type: Number,
      required: true,
      min: [5, "discount persent must be greater than 5%"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("discounts", discountSchema);
