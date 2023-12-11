const express = require("express");
const profileControllers = require("../controllers/ProfileControllers");
const { jwtAuth } = require("../middlewares/jwtAuth");

const route = express.Router();

route.get("/", jwtAuth, profileControllers.getProfile);
route.delete("/delete-phone", jwtAuth, profileControllers.deletePhoneNuber);
route.delete("/delete-address", jwtAuth, profileControllers.deleteAddress);
route.patch("/update-profile", jwtAuth, profileControllers.updateProfile);
route.patch("/add-phone-address", jwtAuth, profileControllers.addPhoneAddress);

module.exports = route;
