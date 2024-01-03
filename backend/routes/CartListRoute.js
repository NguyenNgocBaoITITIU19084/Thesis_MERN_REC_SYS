const express = require("express");
const CartListControllers = require("../controllers/CartListControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();

route.post(
  "/add-product-increasing",
  isAuthenticated,
  authorize([ROLE.GUEST]),
  CartListControllers.addProductToCartListIncreasing
);
route.post(
  "/add-product",
  isAuthenticated,
  authorize([ROLE.GUEST]),
  CartListControllers.addProductToWhishList
);
route.get(
  `/get-cart-list`,
  isAuthenticated,
  authorize([ROLE.GUEST]),
  CartListControllers.getCartListByUser
);
route.patch(
  `/remove-product`,
  isAuthenticated,
  authorize([ROLE.GUEST]),
  CartListControllers.removeProductFromCartList
);
route.patch(
  `/decreasing-product`,
  isAuthenticated,
  authorize([ROLE.GUEST]),
  CartListControllers.decreasingProductFromCartList
);
route.patch(
  `/increasing-product`,
  isAuthenticated,
  authorize([ROLE.GUEST]),
  CartListControllers.increasingProductFromCartList
);
module.exports = route;
