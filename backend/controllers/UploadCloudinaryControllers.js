const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");
const EmailService = require("../utils/EmailService");

const storeSchema = require("../models/StoresModel");
const userSchema = require("../models/UserModel");
const { STATUS_CODE } = require("../contants/statusCode");
const { ROLE } = require("../contants/role");
const message = require("../config/Messages");

exports.uploadCloudinary = catchAsync(async (req, res) => {
  const fileData = req.files;
  const fileLink = fileData.map((file) => {
    return file.path;
  });
  console.log(fileLink);
  res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.uploadCloudinary.success,
        fileLink
      )
    );
});
