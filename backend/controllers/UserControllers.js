const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");
const EmailService = require("../utils/EmailService");

const userSchema = require("../models/UserModel");
const profileSchema = require("../models/ProfilesModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.register = catchAsync(async (req, res) => {
  const { email, password, avatar } = req.body;
  const existedUser = await userSchema.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, `${message.error.register}`);
  }
  const newProfile = await profileSchema.create({ avatar });
  const { id } = newProfile;
  const newUser = await userSchema.create({
    email,
    password,
    profile: id,
  });
  // Send Email
  // await EmailService.sendGmail(
  //   process.env.EMAIL,
  //   email,
  //   "Create Account At DevShop.",
  //   `Thanks for creating account at DevShop.`
  // );
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        `${message.models.success_create}${message.models.user}`,
        null
      )
    );
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const existedEmail = await userSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, `${message.error.login.inValid_input}`);
  }
  const isMatch = await existedEmail.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(400, `${message.error.login.inValid_input}`);
  }
  const accessToken = await existedEmail.getJwtAccessToken();
  const data = { accessToken };
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        `${message.models.success_query}${message.models.user}`,
        data
      )
    );
});

exports.testAuth = catchAsync(async (req, res) => {
  return res.json({ user: req.user });
});
