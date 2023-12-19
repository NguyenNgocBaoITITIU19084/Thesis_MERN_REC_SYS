const express = require("express");
const productControllers = require("../controllers/ProductControllers");
const { isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");
const route = express.Router();

route.post(
  "/",
  isAuthenticated,
  authorize([ROLE.SUPPLIER, ROLE.ADMIN]),
  productControllers.createProduct
);
route.get("/", productControllers.getAllproducts);
// get product by store id (supplier side)
route.get(
  "/store-side",
  isAuthenticated,
  productControllers.getProductsByStoreId
);

route.get("/:id", productControllers.getProductById);
route.delete("/:id", productControllers.deleteProductById);
route.patch("/:id", productControllers.updateProductById);

module.exports = route;
