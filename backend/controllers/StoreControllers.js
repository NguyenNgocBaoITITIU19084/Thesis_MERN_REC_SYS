const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");
const EmailService = require("../utils/EmailService");

const storeSchema = require("../models/StoresModel");
const userSchema = require("../models/UserModel");
const { STATUS_CODE } = require("../contants/statusCode");
const { ROLE } = require("../contants/role");
const message = require("../config/Messages");

exports.registerStore = catchAsync(async (req, res) => {
  const {
    name,
    description,
    address,
    phoneNumber,
    avatar,
    instagram,
    facebook,
    email,
  } = req.body;
  const { id } = req.user;
  const existedEmail = await userSchema.findById(id);
  if (!existedEmail) {
    throw new ApiError(401, `${message.error.user_not_existed}`);
  }
  const {
    store: existedStoreId,
    email: ownerEmail,
    roles: oldRoles,
  } = existedEmail;
  if (existedStoreId) {
    throw new ApiError(
      400,
      `${message.models.store} ${message.error.already_existed}`
    );
  }
  // if (
  //   ROLE.GUEST &&
  //   [ROLE.GUEST].some((substring) => oldRoles.includes(substring))
  // ) {
  //   throw new ApiError(
  //     400,
  //     `${ROLE.GUEST?.toString()} ${message.error.already_existed}`
  //   );
  // }
  const store = await storeSchema.create({
    name,
    description,
    address,
    phoneNumber,
    avatar,
    instagram,
    facebook,
    email,
  });
  await userSchema.findByIdAndUpdate(
    id,
    {
      store: store._id,
      roles: [...oldRoles, ROLE.SUPPLIER],
    },
    {
      new: true,
    }
  );
  //   Send Email
  await EmailService.sendGmail(
    process.env.EMAIL,
    ownerEmail,
    "Create a New Store At DevShop.",
    `Thanks for becoming a new store at DevShop.`
  );
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.store,
        store
      )
    );
});

exports.getStore = catchAsync(async (req, res) => {
  const { id } = req.user;
  const existedEmail = await userSchema
    .findById(id)
    .populate("store")
    .select("store");
  if (!existedEmail) {
    throw new ApiError(401, `${message.error.user_not_existed}`);
  }
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.store,
        existedEmail
      )
    );
});

exports.updateStoreDetail = catchAsync(async (req, res) => {
  const {
    name,
    description,
    address,
    phoneNumber,
    avatar,
    instagram,
    facebook,
    email,
  } = req.body;
  const { id } = req.user;
  const existedEmail = await userSchema.findById(id);
  if (!existedEmail) {
    throw new ApiError(401, `${message.error.user_not_existed}`);
  }
  const { store: existedStoreId } = existedEmail;
  if (!existedStoreId) {
    throw new ApiError(
      404,
      `${message.models.not_founded}${message.models.store}`
    );
  }
  const updatedStoreDetail = await storeSchema.findByIdAndUpdate(
    { _id: existedStoreId },
    {
      name,
      description,
      address,
      phoneNumber,
      avatar,
      instagram,
      facebook,
      email,
    },
    { new: true }
  );
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.store,
        updatedStoreDetail
      )
    );
});
