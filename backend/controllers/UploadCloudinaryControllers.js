const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");
const cloudinary = require("cloudinary").v2;

const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.uploadCloudinary = catchAsync(async (req, res) => {
  const fileData = req.files;
  const fileLink = fileData.map((file) => {
    return { link: file.path, fileName: file.filename };
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.uploadCloudinary.success,
        fileLink
      )
    );
});

exports.removeCloudinary = catchAsync(async (req, res) => {
  const { fileName } = req.body;
  cloudinary.uploader.destroy(fileName, function (error, result) {
    return res
      .status(200)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.removeCloudinary.success,
          result
        )
      );
  });
});
