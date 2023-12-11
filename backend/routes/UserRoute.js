const express = require("express");
const userControllers = require("../controllers/UserControllers");
const { jwtAuth } = require("../middlewares/jwtAuth");

const route = express.Router();

route.post("/register", userControllers.register);
route.post("/login", userControllers.login);
route.post("/refesh-access-token", userControllers.getNewAccessToken);
route.patch("/forgot-password", userControllers.forgotPassword);
route.patch("/reset-password", jwtAuth, userControllers.resetPassword);
route.delete("/log-out", jwtAuth, userControllers.logOut);

module.exports = route;
