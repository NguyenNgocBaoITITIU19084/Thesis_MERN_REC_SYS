const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

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
  const whishList = await whishListSchema.findOne({ createdBy: _id });
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
