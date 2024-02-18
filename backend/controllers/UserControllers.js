const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");
const EmailService = require("../utils/EmailService");
const sendToken = require("../utils/SendToken");

const userSchema = require("../models/UserModel");
const profileSchema = require("../models/ProfilesModel");
const whishListSchema = require("../models/WhishListModel");
const cartListSchema = require("../models/CartListModel");
const { web_url } = require("../contants/server");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../../backend/config/Messages");

exports.register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const existedUser = await userSchema.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, `${message.error.register}`);
  }
  const newProfile = await profileSchema.create({ firstName: null });
  const { id } = newProfile;
  const user = await userSchema.create({
    email,
    password,
    profile: id,
  });
  const { id: userID } = user;
  const whishList = await whishListSchema.create({ createdBy: userID });
  const cartList = await cartListSchema.create({ createdBy: userID });
  // Send Email
  await EmailService.sendGmail(
    process.env.EMAIL,
    email,
    "Create Account At DevShop.",
    `Thanks for creating account at DevShop.`
  );
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
  const refeshToken = await existedEmail.getJwtRefeshToken();
  await userSchema.findOneAndUpdate({ email }, { refesh_token: refeshToken });
  const data = { accessToken, refeshToken };
  sendToken(data, 201, res);
  // return res
  //   .status(200)
  //   .json(
  //     new ResultObject(
  //       STATUS_CODE.SUCCESS,
  //       `${message.models.success_query}${message.models.user}`,
  //       data
  //     )
  //   );
});
exports.getNewAccessToken = catchAsync(async (req, res) => {
  const { refeshToken } = req.body;
  if (!refeshToken) {
    throw new ApiError(401, `${message.error.notExistedRefeshToken}`);
  }
  const existedEmail = await userSchema.findOne({ refesh_token: refeshToken });
  if (!existedEmail) {
    throw new ApiError(403, `${message.error.notExistedRefeshToken}`);
  }
  try {
    await existedEmail.verifyToken();
    const accessToken = await existedEmail.getJwtAccessToken();
    const refeshToken = await existedEmail.getJwtRefeshToken();
    await userSchema.findOneAndUpdate(
      { email: existedEmail.email },
      { refesh_token: refeshToken }
    );
    const data = { accessToken, refeshToken };
    return res
      .status(200)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          `${message.models.success_update}${message.models.user}`,
          data
        )
      );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token is expired!");
    }
    throw new ApiError(403, "Forbiden");
  }
});

exports.logOut = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  await userSchema.findByIdAndUpdate(id, {
    refesh_token: null,
  });
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          `${message.models.success_update}${message.models.user}`,
          null
        )
      );
  } catch (error) {
    throw new ApiError(404, "Already Log-out");
  }
});
exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const existedEmail = await userSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, `${message.error.login.inValid_input}`);
  }
  const newHashedPassword = existedEmail.genRandomPassword();
  const link = `${web_url}/?token=${newHashedPassword}&userId=${existedEmail.id}`;
  // await EmailService.sendGmail(
  //   process.env.EMAIL,
  //   email,
  //   "Reset Password",
  //   `Please click into this link ${link}`
  // );
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        `${message.models.success_update}${message.models.user}`,
        link
      )
    );
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { password, newPassword } = req.body;
  const { id } = req.user;
  const existedEmail = await userSchema.findById(id);
  if (!existedEmail) {
    throw new ApiError(404, `${message.error.user_not_existed}`);
  }
  const isMatchedPassword = await existedEmail.comparePassword(password);
  if (!isMatchedPassword) {
    throw new ApiError(400, `${message.error.notMatchedPass}`);
  }
  existedEmail.password = newPassword;
  const isUpdated = existedEmail.save();

  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        `${message.models.success_update}${message.models.user}`,
        isUpdated
      )
    );
});
exports.isAdmin = catchAsync(async (req, res) => {
  const { roles } = req.user;
  if (roles.includes("admin")) {
    return res
      .status(200)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          `${message.models.success_update}${message.models.user}`,
          true
        )
      );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        `${message.models.success_update}${message.models.user}`,
        false
      )
    );
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await userSchema.find().lean();
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        `${message.models.success_update}${message.models.user}`,
        users
      )
    );
});
exports.bannedUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findById(id).lean();
  if (!user) {
    throw new ApiError(404, `${message.error.user_not_existed}`);
  }
  const userUpdated = await userSchema.findByIdAndUpdate(
    { _id: id },
    { isActive: !user.isActive }
  );
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        `${message.models.success_update}${message.models.user}`,
        userUpdated
      )
    );
});
