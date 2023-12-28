const express = require("express");
const DiscountControllers = require("../controllers/DiscountControllers");
const { isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();

route.post(
  "/",
  isAuthenticated,
  authorize([ROLE.SUPPLIER, ROLE.ADMIN]),
  DiscountControllers.createDiscount
);

route.get(
  "/by-store",
  isAuthenticated,
  authorize([ROLE.SUPPLIER]),
  DiscountControllers.getAllDiscountsByStore
);

route.get("/", DiscountControllers.getAllDiscounts);
route.get("/:id", DiscountControllers.getDiscountById);
route.delete(
  "/:id",
  isAuthenticated,
  authorize([ROLE.SUPPLIER]),
  DiscountControllers.deleteDiscountById
);
route.patch(
  "/:id",
  isAuthenticated,
  authorize([ROLE.SUPPLIER]),
  DiscountControllers.updateDiscountById
);

module.exports = route;
