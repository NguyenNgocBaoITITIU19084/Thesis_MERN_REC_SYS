const express = require("express");
const userControllers = require("../controllers/UserControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();
route.get(`/is-admin`, isAuthenticated, userControllers.isAdmin);
route.post("/register", userControllers.register);
route.post("/login", userControllers.login);
route.post("/refesh-access-token", userControllers.getNewAccessToken);
route.patch("/forgot-password", userControllers.forgotPassword);
route.patch("/reset-password", isAuthenticated, userControllers.resetPassword);
route.delete("/log-out", isAuthenticated, userControllers.logOut);

route.get(
  "/get-all-users",
  isAuthenticated,
  authorize([ROLE.ADMIN]),
  userControllers.getAllUsers
);
route.patch("/banned-user/:id", userControllers.bannedUserById);

module.exports = route;
