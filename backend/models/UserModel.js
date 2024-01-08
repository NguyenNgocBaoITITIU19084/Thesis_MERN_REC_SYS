require("dotenv").config();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
const bcrypt = require("bcryptjs");

const { ROLE } = require("../contants/role");
const ApiError = require("../utils/ApiError");
const { hashString } = require("../utils/HashString");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      minlength: [3, "email must be greater than 3 letters"],
      maxlength: [100, "email must be less than 30 letters"],
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [9, "password must be greater than 9 letters"],
      maxlength: [30, "password must be less than 30 letters"],
      required: [true, "password is required"],
    },
    roles: {
      type: [String],
      enum: ROLE,
      default: ROLE.GUEST,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refesh_token: {
      type: String,
      default: null,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profiles",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "stores",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const hashedPassword = hashString(this.password);
    this.password = hashedPassword;
    next();
  }
});

// jwt token
UserSchema.methods.getJwtAccessToken = function () {
  if (!this.isActive) {
    throw new ApiError(400, "this account is not active");
  }
  return jwt.sign(
    { id: this._id, roles: this.roles },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_ACCESS,
    }
  );
};

UserSchema.methods.getJwtRefeshToken = function () {
  if (!this.isActive) {
    throw new ApiError(400, "this account is not active");
  }
  return jwt.sign(
    { id: this._id, roles: this.roles },
    process.env.JWT_SECRET_KEY_REFESH,
    {
      expiresIn: process.env.JWT_EXPIRES_REFESH,
    }
  );
};

UserSchema.methods.verifyToken = function () {
  if (!this.isActive) {
    throw new ApiError(400, "this account is not active");
  }
  return jwt.verify(this.refesh_token, process.env.JWT_SECRET_KEY_REFESH);
};

// compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate new random password
UserSchema.methods.genRandomPassword = function () {
  if (!this.isActive) {
    throw new ApiError(400, "this account is not active");
  }
  const randoomToken = randomString.generate(10);
  const hashedToken = hashString(randoomToken);
  return hashedToken;
};

module.exports = mongoose.model("users", UserSchema);
