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
route.get("/get-all-orders", OrderControllers.getOrders);
route.get(
  "/get-all-orders-by-admin",
  isAuthenticated,
  authorize([ROLE.ADMIN]),
  OrderControllers.getAllOrdersByAdmin
);

route.get(
  "/get-order-by-id/:orderId",
  isAuthenticated,
  OrderControllers.getOrderById
);
route.get(
  "/get-order-by-supplier",
  isAuthenticated,
  authorize([ROLE.SUPPLIER]),
  OrderControllers.getOrderBySupplier
);

route.get(
  "/get-order-by-user",
  isAuthenticated,
  authorize([ROLE.GUEST]),
  OrderControllers.getOrderByUser
);
module.exports = route;
