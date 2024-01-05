const express = require("express");
const CategoryControllers = require("../controllers/CategoryControllers");
const { isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();

route.post(
  "/",
  isAuthenticated,
  authorize([ROLE.ADMIN]),
  CategoryControllers.createCategory
);
route.get("/", CategoryControllers.getAllCategories);
route.get("/:id", CategoryControllers.getCategoryById);
route.delete("/:id", CategoryControllers.deleteCategoryById);
route.patch("/:id", CategoryControllers.updateCategoryById);

module.exports = route;
