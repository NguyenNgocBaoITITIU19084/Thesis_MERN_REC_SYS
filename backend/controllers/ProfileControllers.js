const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const profileSchema = require("../models/ProfilesModel");
const userSchema = require("../models/UserModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.updateProfile = catchAsync(async (req, res) => {
  const { firstName, lastName, address, phoneNumber, gender, age } = req.body;
  const { id } = req.user;
  const existedEmail = await userSchema.findById(id).populate("profile");
  if (!existedEmail) {
    throw new ApiError(
      400,
      `${message.models.not_founded}${message.models.user}`
    );
  }
  const { id: profileId } = existedEmail.profile;
  const updatedProfile = await profileSchema.findByIdAndUpdate(
    { _id: profileId },
    {
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      age,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.profile,
        updatedProfile
      )
    );
});

exports.addPhoneAddress = catchAsync(async (req, res) => {
  const { address, phoneNumber } = req.body;
  const { id } = req.user;
  const existedEmail = await userSchema.findById(id).populate("profile");
  if (!existedEmail) {
    throw new ApiError(
      400,
      `${message.models.not_founded}${message.models.user}`
    );
  }
  const {
    id: profileId,
    phoneNumber: oldPhone,
    address: oldAddr,
  } = existedEmail.profile;

  if (address && [address].some((substring) => oldAddr.includes(substring))) {
    throw new ApiError(
      400,
      `${address?.toString()} ${message.error.already_existed}`
    );
  }
  if (
    phoneNumber &&
    [phoneNumber].some((substring) => oldPhone.includes(substring))
  ) {
    throw new ApiError(
      400,
      `${phoneNumber?.toString()} ${message.error.already_existed}`
    );
  }
  const newPhone = [...oldPhone, phoneNumber];
  const newAddr = [...oldAddr, address];
  const updatedProfile = await profileSchema.findByIdAndUpdate(
    { _id: profileId },
    {
      address: newAddr,
      phoneNumber: newPhone,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.profile,
        updatedProfile
      )
    );
});

exports.deleteAddress = catchAsync(async (req, res) => {
  const { address } = req.body;
  const { id } = req.user;
  const existedEmail = await userSchema.findById(id).populate("profile");
  if (!existedEmail) {
    throw new ApiError(
      400,
      `${message.models.not_founded}${message.models.user}`
    );
  }
  const { address: oldAddr, id: profileId } = existedEmail.profile;
  const newAddr = oldAddr.filter((item) => item !== address);
  const updatedProfile = await profileSchema.findByIdAndUpdate(
    { _id: profileId },
    {
      address: newAddr,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.profile,
        updatedProfile
      )
    );
});

exports.deletePhoneNuber = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;
  const { id } = req.user;
  const existedEmail = await userSchema.findById(id).populate("profile");
  if (!existedEmail) {
    throw new ApiError(
      400,
      `${message.models.not_founded}${message.models.user}`
    );
  }
  const { phoneNumber: oldPhone, id: profileId } = existedEmail.profile;
  const newPhone = oldPhone.filter((item) => item !== phoneNumber);
  const updatedProfile = await profileSchema.findByIdAndUpdate(
    { _id: profileId },
    {
      phoneNumber: newPhone,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.profile,
        updatedProfile
      )
    );
});

exports.getProfile = catchAsync(async (req, res) => {
  const { id } = req.user;
  const existedEmail = await userSchema
    .findById(id)
    .populate("profile")
    .select("-password -roles -isActive -refesh_token");
  if (!existedEmail) {
    throw new ApiError(
      400,
      `${message.models.not_founded}${message.models.user}`
    );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.profile,
        existedEmail
      )
    );
});
