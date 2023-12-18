require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/UserModel");
const ApiError = require("../utils/ApiError");

exports.jwtAuth = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    throw new ApiError(401, "Unauthorized");
  }
  const token = headerToken.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token is expired!");
    }
    throw new ApiError(403, "Forbiden");
  }
};

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Please login to continue");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id } = decoded;
    req.user = await UserSchema.findById(id);
  } catch (error) {
    console.log("error from is authen", error);
  }

  next();
};
