const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const discountSchema = require("../models/DiscountsModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.createDiscount = catchAsync(async (req, res) => {
  const { code, description, persentDiscount } = req.body;
  const discount = await discountSchema.create({
    code,
    description,
    persentDiscount,
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.discount,
        discount
      )
    );
});

exports.getAllDiscounts = catchAsync(async (req, res) => {
  const discounts = await discountSchema.find();
  if (!discounts) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.discount,
        discounts
      )
    );
});

exports.getDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const discount = await discountSchema.findById(id);
  if (!discount) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.discount,
        discount
      )
    );
});

exports.updateDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { code, description, persentDiscount } = req.body;
  const discount = await discountSchema.findByIdAndUpdate(
    id,
    {
      code,
      description,
      persentDiscount,
    },
    {
      new: true,
    }
  );
  if (!discount) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.discount,
        discount
      )
    );
});

exports.deleteDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const discount = await discountSchema.findByIdAndDelete(id);
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_delete + message.models.discount,
        discount
      )
    );
});
