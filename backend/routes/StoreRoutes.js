const express = require("express");
const storeControllers = require("../controllers/StoreControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");
const route = express.Router();

route.post(
  "/register-store",
  isAuthenticated,
  authorize([ROLE.GUEST]),
  storeControllers.registerStore
);
route.get(
  "/",
  isAuthenticated,
  authorize([ROLE.GUEST]),
  storeControllers.getStore
);
route.delete("/");
route.delete("/");
route.patch("/");
route.patch(
  "/",
  isAuthenticated,
  authorize([ROLE.GUEST]),
  storeControllers.updateStoreDetail
);

module.exports = route;
