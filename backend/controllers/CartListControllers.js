const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const cartListSchema = require("../models/CartListModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.addProductToCartListIncreasing = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  const quantity = 1;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  const existedCartList = await cartListSchema.findOne({ createdBy: _id });
  if (!existedCartList) {
    const data = { productId, quantity };
    const cartList = await cartListSchema.create({
      cartList: data,
      createdBy: _id,
    });
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          "Success Add Producct To Cart List",
          cartList
        )
      );
  } else {
    const { cartList } = existedCartList;
    // checking if productId is existed in cart list, then increasing quantity of productId by 1
    const existedProduct = cartList.filter((item) =>
      item.productId.equals(productId)
    );
    if (existedProduct.length) {
      existedCartList.cartList.map((item) => {
        if (item.productId.equals(productId)) {
          item.quantity = item.quantity + 1;
        }
      });
      const newCartList = await cartListSchema.findOneAndUpdate(
        { createdBy: _id },
        { cartList: existedCartList.cartList },
        { new: true }
      );
      return res
        .status(201)
        .json(
          new ResultObject(
            STATUS_CODE.SUCCESS,
            "Increasing Quantity of Product",
            newCartList
          )
        );
    }
    const data = { productId, quantity };
    cartList.push(data);
    const newCartList = await cartListSchema.findOneAndUpdate(
      { createdBy: _id },
      { cartList },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          "Success Add Producct To Cart List",
          newCartList
        )
      );
  }
});

exports.addProductToWhishList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  const quantity = 1;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  const existedCartList = await cartListSchema.findOne({ createdBy: _id });
  if (!existedCartList) {
    const data = { productId, quantity };
    const cartList = await cartListSchema.create({
      cartList: data,
      createdBy: _id,
    });
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.models.success_create + message.models.whishList,
          cartList
        )
      );
  }
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        "Product Already Existed In Cart List",
        existedCartList
      )
    );
});

exports.getCartListByUser = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const cartList = await cartListSchema
    .findOne({ createdBy: _id })
    .populate("cartList.productId");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.whishList,
        cartList
      )
    );
});

exports.removeProductFromCartList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  const existedCartList = await cartListSchema.findOne({ createdBy: _id });
  if (!existedCartList) {
    throw new ApiError(400, "Cart List Does not Exist");
  }
  const newList = existedCartList.cartList.filter(
    (item) => !item.productId.equals(productId)
  );
  const newCartList = await cartListSchema
    .findOneAndUpdate({ createdBy: _id }, { cartList: newList }, { new: true })
    .populate("cartList.productId");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.whishList,
        newCartList
      )
    );
});

exports.decreasingProductFromCartList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  const existedCartList = await cartListSchema.findOne({ createdBy: _id });
  if (!existedCartList) {
    throw new ApiError(400, "Cart List Does not Exist");
  }
  existedCartList.cartList.map((item) => {
    if (item.productId.equals(productId)) {
      if (item.quantity > 1) {
        item.quantity = item.quantity - 1;
      }
    }
  });
  const newCartList = await cartListSchema.findOneAndUpdate(
    { createdBy: _id },
    { cartList: existedCartList.cartList },
    { new: true }
  );
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.whishList,
        newCartList
      )
    );
});

exports.increasingProductFromCartList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  const existedCartList = await cartListSchema.findOne({ createdBy: _id });
  if (!existedCartList) {
    throw new ApiError(400, "Cart List Does not Exist");
  }
  existedCartList.cartList.map((item) => {
    if (item.productId.equals(productId)) {
      if (item.quantity >= 1) {
        item.quantity = item.quantity + 1;
      }
    }
  });
  const newCartList = await cartListSchema.findOneAndUpdate(
    { createdBy: _id },
    { cartList: existedCartList.cartList },
    { new: true }
  );
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.whishList,
        newCartList
      )
    );
});
