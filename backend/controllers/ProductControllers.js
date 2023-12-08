const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const productSchema = require("../models/ProductsModel");
const discountSchema = require("../models/DiscountsModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.createProduct = catchAsync(async (req, res) => {
  const {
    name,
    price,
    actualPrice,
    description,
    images,
    discountApplied,
    brand,
    categories,
  } = req.body;

  if (discountApplied) {
    const discount = await discountSchema.findById({ _id: discountApplied });
    if (!discount) {
      throw new ApiError(
        400,
        message.models.not_founded + message.models.discount
      );
    }
    const { persentDiscount } = discount;
    const newPrice = price - (price * persentDiscount) / 100;
    const product = await productSchema.create({
      name,
      price: newPrice,
      actualPrice,
      description,
      images,
      discountApplied,
      brand,
      categories,
    });
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.models.success_create + message.models.product,
          product
        )
      );
  }

  const product = await productSchema.create({
    name,
    price,
    actualPrice,
    description,
    images,
    discountApplied,
    brand,
    categories,
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.product,
        product
      )
    );
});

exports.getAllproducts = catchAsync(async (req, res) => {
  const products = await productSchema
    .find()
    .populate("discountApplied")
    .populate("brand")
    .populate("categories");
  if (!products) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        products
      )
    );
});

exports.getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findById(id).populate("discountApplied");
  if (!product) {
    throw new ApiError(
      400,
      message.models.not_founded + message.models.product
    );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        product
      )
    );
});

exports.deleteProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findByIdAndDelete(id);
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_delete + message.models.product,
        product
      )
    );
});

exports.updateProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price, actualPrice, description, images, discountApplied } =
    req.body;
  const product = await productSchema.findByIdAndUpdate(
    id,
    {
      name,
      price,
      actualPrice,
      description,
      images,
      discountApplied,
      brand,
      categories,
    },
    { new: true }
  );
  if (!product) {
    throw new ApiError(
      400,
      message.models.not_founded + message.models.product
    );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.product,
        product
      )
    );
});
