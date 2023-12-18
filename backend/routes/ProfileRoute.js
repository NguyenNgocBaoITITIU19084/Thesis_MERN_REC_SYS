const express = require("express");
const profileControllers = require("../controllers/ProfileControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");

const route = express.Router();

route.get("/", isAuthenticated, profileControllers.getProfile);
route.delete(
  "/delete-phone",
  isAuthenticated,
  profileControllers.deletePhoneNuber
);
route.delete(
  "/delete-address",
  isAuthenticated,
  profileControllers.deleteAddress
);
route.patch(
  "/update-profile",
  isAuthenticated,
  profileControllers.updateProfile
);
route.patch(
  "/add-phone-address",
  isAuthenticated,
  profileControllers.addPhoneAddress
);

module.exports = route;
