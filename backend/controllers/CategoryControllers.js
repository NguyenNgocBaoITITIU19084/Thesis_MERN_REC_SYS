const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const categorySchema = require("../models/CategoriesModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.createCategory = catchAsync(async (req, res) => {
  const { name, description, images } = req.body;
  const category = await categorySchema.create({
    name,
    description,
    images,
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.category,
        category
      )
    );
});

exports.getAllCategories = catchAsync(async (req, res) => {
  const category = await categorySchema.find();
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.category,
        category
      )
    );
});

exports.getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await categorySchema.findById(id);
  if (!category) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.category,
        category
      )
    );
});
exports.deleteCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await categorySchema.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_delete + message.models.category,
        category
      )
    );
});

exports.updateCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description, isActive, images } = req.body;
  const category = await categorySchema.findByIdAndUpdate(
    id,
    {
      name,
      description,
      isActive,
      images,
    },
    { new: true }
  );
  if (!category) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.category,
        category
      )
    );
});
