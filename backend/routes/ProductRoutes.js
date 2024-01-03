const express = require("express");
const productControllers = require("../controllers/ProductControllers");
const { isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");
const route = express.Router();

route.get("/", productControllers.getAllproducts);
// get product by store id (supplier side)

route.get(
  "/store-side",
  isAuthenticated,
  productControllers.getProductsByStoreId
);
route.post(
  "/",
  isAuthenticated,
  authorize([ROLE.SUPPLIER]),
  productControllers.createProduct
);
// =================================================
// AdminRoutes
route.get(
  `/get-products-admin`,
  isAuthenticated,
  authorize([ROLE.ADMIN]),
  productControllers.getAllproductsByAdmin
);
route.post(
  "/create-product-admin",
  isAuthenticated,
  authorize([ROLE.ADMIN]),
  productControllers.createProductByAdmin
);
// =======================================

route.get("/:id", productControllers.getProductById);
route.delete("/:id", isAuthenticated, productControllers.deleteProductById);
route.patch(
  "/:id",
  isAuthenticated,
  authorize([ROLE.SUPPLIER, ROLE.ADMIN]),
  productControllers.updateProductById
);

module.exports = route;
