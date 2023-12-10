const express = require("express");
const userControllers = require("../controllers/UserControllers");
const { jwtAuth } = require("../middlewares/jwtAuth");

const route = express.Router();

route.post("/register", userControllers.register);
route.post("/login", userControllers.login);
route.patch("/forgot-password", userControllers.forgotPassword);
route.delete("/:id");
route.patch("/:id");

module.exports = route;
