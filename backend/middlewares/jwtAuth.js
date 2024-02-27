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
      return new ApiError(401, "Token is expired!");
    }
    return new ApiError(403, "Forbiden");
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token", token);
    console.log("type of token", typeof token === "string");
    if (typeof token !== "string") {
      return next(new ApiError(401, "Please login to continue"));
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { id } = decoded;
        req.user = await UserSchema.findById(id).catch((error) => {
          return next(new ApiError(404, "Not Found User"));
        });
        next();
      } catch (error) {
        return next(new ApiError(401, "Please login to continue"));
      }
    } else {
      return next(new ApiError(401, "Please login to continue"));
    }
  } catch (error) {
    next(error);
    if (error.name === "TokenExpiredError") {
      return new ApiError(401, "Token is expired!");
    }
    return new ApiError(403, "Forbiden");
  }
};
