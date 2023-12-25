const express = require("express");
const uploadCloudinaryCtlrs = require("../controllers/UploadCloudinaryControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");
const cloud = require("../middlewares/cloudinary");
const route = express.Router();

route.post(
  "/upload",
  cloud.array("image"),
  uploadCloudinaryCtlrs.uploadCloudinary
);
route.delete("/remove", uploadCloudinaryCtlrs.removeCloudinary);

module.exports = route;
