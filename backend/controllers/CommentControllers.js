const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const commentSchema = require("../models/CommentsModel");
const productSchema = require("../models/ProductsModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.createComment = catchAsync(async (req, res) => {
  const { title, content, stars, productApplied } = req.body;
  if (!productApplied) {
    throw new ApiError(400, message.models.not_founded);
  }
  const comment = await commentSchema.create({
    title,
    content,
    stars,
    productApplied,
  });
  //   const { id } = comment;
  //   const appliedComment = await productSchema.findByIdAndUpdate(
  //     { _id: productApplied },
  //     {
  //       comments: id,
  //     }
  //   );
  //   if (!appliedComment) {
  //     throw new ApiError(400, message.models.not_founded);
  //   }
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.comment,
        comment
      )
    );
});

exports.getAllCommentsByProductId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const commentsByProductId = await commentSchema.find({
    productApplied: id,
  });
  if (!commentsByProductId) {
    return res
      .status(200)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.models.not_yet + message.models.comment,
          commentsByProductId
        )
      );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.comment,
        commentsByProductId
      )
    );
});

exports.getCommentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const commentById = await commentSchema
    .findById(id)
    .populate("productApplied");
  if (!commentById) {
    throw new ApiError(
      400,
      message.models.not_founded + message.models.comment
    );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.comment,
        commentById
      )
    );
});

exports.updateCommentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content, stars } = req.body;
  const comment = await commentSchema.findByIdAndUpdate(
    id,
    { title, content, stars },
    { new: true }
  );
  if (!comment) {
    throw new ApiError(
      400,
      message.models.not_founded + message.models.comment
    );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.comment,
        comment
      )
    );
});

exports.deleteCommentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const comment = await commentSchema.findByIdAndDelete(id);
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_delete + message.models.comment,
        comment
      )
    );
});
