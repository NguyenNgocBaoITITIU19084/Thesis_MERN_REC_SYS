const express = require("express");
const BrandControllers = require("../controllers/BrandControllers");

const route = express.Router();

route.post("/", BrandControllers.createBrand);
route.get("/", BrandControllers.getAllBrands);
route.get("/:id", BrandControllers.getBrandById);
route.delete("/:id", BrandControllers.deleteBrandById);
route.patch("/:id", BrandControllers.updateBrandById);

module.exports = route;
