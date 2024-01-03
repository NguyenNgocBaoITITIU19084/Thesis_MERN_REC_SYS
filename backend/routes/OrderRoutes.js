const express = require("express");
const OrderControllers = require("../controllers/OrderControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();

route.post(
  `/create-order`,
  isAuthenticated,
  authorize([ROLE.GUEST]),
  OrderControllers.createOrderByUser
);

module.exports = route;
