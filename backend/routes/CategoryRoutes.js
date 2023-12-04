const express = require("express");
const CategoryControllers = require("../controllers/CategoryControllers");

const route = express.Router();

route.post("/", CategoryControllers.createCategory);
route.get("/", CategoryControllers.getAllCategories);
route.get("/:id", CategoryControllers.getCategoryById);
route.delete("/:id", CategoryControllers.deleteCategoryById);
route.patch("/:id", CategoryControllers.updateCategoryById);

module.exports = route;
