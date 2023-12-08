const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title of comment is required"],
    },
    content: {
      type: String,
    },
    stars: {
      type: Number,
      required: [true, "stars of comment is required"],
      min: [1, "star must be greater than 1"],
    },
    like: {
      type: Number,
    },
    productApplied: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: [true, "productApplied of comment is required"],
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

module.exports = mongoose.model("comments", commentSchema);
