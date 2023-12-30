const express = require("express");
const userControllers = require("../controllers/UserControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");

const route = express.Router();

route.post("/register", userControllers.register);
route.post("/login", userControllers.login);
route.post("/refesh-access-token", userControllers.getNewAccessToken);
route.patch("/forgot-password", userControllers.forgotPassword);
route.patch("/reset-password", isAuthenticated, userControllers.resetPassword);
route.delete("/log-out", isAuthenticated, userControllers.logOut);

module.exports = route;
