const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const brandSchema = require("../models/BrandsModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.createBrand = catchAsync(async (req, res) => {
  const { name, description, images } = req.body;
  const brand = await brandSchema.create({
    name,
    description,
    images,
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.brand,
        brand
      )
    );
});

exports.getAllBrands = catchAsync(async (req, res) => {
  const brand = await brandSchema.find();
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.brand,
        brand
      )
    );
});

exports.getBrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const brand = await brandSchema.findById(id);
  if (!brand) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.brand,
        brand
      )
    );
});
exports.deleteBrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const brand = await brandSchema.findByIdAndDelete(id);
  if (!brand) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_delete + message.models.brand,
        brand
      )
    );
});

exports.updateBrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description, isActive, images } = req.body;
  const brand = await brandSchema.findByIdAndUpdate(
    id,
    {
      name,
      description,
      isActive,
      images,
    },
    { new: true }
  );
  if (!brand) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.brand,
        brand
      )
    );
});
