const express = require("express");
const DiscountControllers = require("../controllers/DiscountControllers");

const route = express.Router();

route.post("/", DiscountControllers.createDiscount);
route.get("/", DiscountControllers.getAllDiscounts);
route.get("/:id", DiscountControllers.getDiscountById);
route.delete("/:id", DiscountControllers.deleteDiscountById);
route.patch("/:id", DiscountControllers.updateDiscountById);

module.exports = route;
