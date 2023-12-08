const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const userSchema = require("../models/UserModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.register = catchAsync(async (req, res) => {});
