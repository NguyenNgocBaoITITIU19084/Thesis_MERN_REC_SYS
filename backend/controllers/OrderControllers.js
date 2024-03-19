const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const productSchema = require("../models/ProductsModel");
const discountSchema = require("../models/DiscountsModel");
const OrderSchema = require("../models/OrdersModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.createOrderByUser = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { orderList, notes, phoneNumber, address, discountApplied } = req.body;
  if (!orderList.length || !phoneNumber || !address) {
    throw new ApiError(400, "some field is null");
  }

  const newOrders = await orderList.reduce(async (memo, order) => {
    const results = await memo;
    try {
      const productInfor = await productSchema.findById({
        _id: order.productId,
      });
      const { createdBy } = productInfor;
      const res = { ...order, shopOwner: createdBy.toString() };
      return [...results, res];
    } catch (error) {
      return new ApiError(400, "Error from create Orders");
    }
  }, []);

  const order = await OrderSchema.create({
    orderList: newOrders,
    notes,
    phoneNumber,
    address,
    discountApplied,
    createdBy: userId,
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        order
      )
    );
});

exports.getAllOrdersByAdmin = catchAsync(async (req, res) => {
  const orders = await OrderSchema.find()
    .populate("orderList.productId")
    .populate("orderList.shopOwner");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        orders
      )
    );
});

exports.getOrderById = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    throw new ApiError(400, "order id is null");
  }
  const orderInfor = await OrderSchema.findById({ _id: orderId })
    .populate("orderList.productId")
    .populate("orderList.shopOwner");
  if (!orderInfor) {
    throw new ApiError(404, "Not Found");
  }
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        orderInfor
      )
    );
});

exports.getOrderBySupplier = catchAsync(async (req, res) => {
  const { store: storeId } = req.user;
  const orders = await OrderSchema.findOne({
    orderList: { $elemMatch: { shopOwner: storeId } },
  })
    .populate("orderList.productId")
    .populate("orderList.shopOwner");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        orders
      )
    );
});

exports.getOrderByUser = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const orders = await OrderSchema.findOne({ createdBy: userId })
    .populate("orderList.productId")
    .populate("orderList.shopOwner");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        orders
      )
    );
});
exports.getOrders = catchAsync(async (req, res) => {
  const orders = await OrderSchema.find()
    .populate("orderList.productId")
    .populate("orderList.shopOwner");
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        orders
      )
    );
});
