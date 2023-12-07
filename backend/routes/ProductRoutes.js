const express = require("express");
const productControllers = require("../controllers/ProductControllers");

const route = express.Router();

route.post("/", productControllers.createProduct);
route.get("/", productControllers.getAllproducts);
route.get("/:id", productControllers.getProductById);
route.delete("/:id", productControllers.deleteProductById);
route.patch("/:id", productControllers.updateProductById);

module.exports = route;
