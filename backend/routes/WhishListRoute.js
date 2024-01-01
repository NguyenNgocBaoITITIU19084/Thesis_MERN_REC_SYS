const express = require("express");
const WhishListControllers = require("../controllers/WhishListControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();

route.post(
  "/add-product",
  isAuthenticated,
  authorize([ROLE.GUEST]),
  WhishListControllers.AddProductToWhishList
);

route.get(
  `/get-whish-list`,
  isAuthenticated,
  authorize([ROLE.GUEST]),
  WhishListControllers.getAllWhishListByUser
);

module.exports = route;
