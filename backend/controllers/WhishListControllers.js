const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const ProductSchema = require("../models/ProductsModel");
const cartListSchema = require("../models/CartListModel");
const whishListSchema = require("../models/WhishListModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.AddProductToWhishList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  // checking existed whishlist of user, if the whishlish doest not existed craete a new one, if it existed checking other condition
  const existedWhishList = await whishListSchema.findOne({ createdBy: _id });
  if (!existedWhishList) {
    const whishListData = await whishListSchema.create({
      productId,
      createdBy: _id,
    });
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.models.success_create + message.models.whishList,
          whishListData
        )
      );
  }
  //  checking duplicated product, if product is duplicated, then does not add product to whish list (retrun old data of whish list)
  const DuplicatedProduct = existedWhishList.productId.filter((item) =>
    item.equals(productId)
  );
  if (DuplicatedProduct.length) {
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          "Product Already Existed In Whish List",
          existedWhishList
        )
      );
  }

  const { productId: listProducts } = existedWhishList;
  listProducts.push(productId);
  const whishlistData = await whishListSchema.findOneAndUpdate(
    { createdBy: _id },
    { productId: listProducts },
    {
      new: true,
    }
  );
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.whishList,
        whishlistData
      )
    );
});
exports.getAllWhishListByUser = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const whishList = await whishListSchema
    .findOne({ createdBy: _id })
    .populate("productId");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.whishList,
        whishList
      )
    );
});

exports.removeProductFromWhishList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  const existedWhishList = await whishListSchema.findOne({ createdBy: _id });
  if (!existedWhishList) {
    throw new ApiError(
      404,
      message.models.whishList + message.models.not_founded
    );
  }
  const listNew = existedWhishList.productId.filter(
    (item, index) => !item.equals(productId)
  );
  const whishlistData = await whishListSchema
    .findOneAndUpdate(
      { createdBy: _id },
      { productId: listNew },
      {
        new: true,
      }
    )
    .populate("productId");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.whishList,
        whishlistData
      )
    );
});

exports.addProductFromWhishListToCartList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  const quantity = 1;
  if (!productId) {
    throw new ApiError(400, message.error.missing_fields);
  }
  const existedWhishList = await whishListSchema.findOne({ createdBy: _id });
  if (!existedWhishList) {
    throw new ApiError(
      404,
      message.models.whishList + message.models.not_founded
    );
  }
  const listNew = existedWhishList.productId.filter(
    (item, index) => !item.equals(productId)
  );
  const whishlistData = await whishListSchema
    .findOneAndUpdate(
      { createdBy: _id },
      { productId: listNew },
      {
        new: true,
      }
    )
    .populate("productId");
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
  }
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.whishList,
        whishlistData
      )
    );
});
