const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);

const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.PaymentProcess = catchAsync(async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Becodemy",
    },
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        { client_secret: myPayment.client_secret }
      )
    );
});

exports.getApiKey = catchAsync(async (req, res) => {
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.order,
        { api_key: process.env.STRIPE_PUBLIC_KEY }
      )
    );
});
