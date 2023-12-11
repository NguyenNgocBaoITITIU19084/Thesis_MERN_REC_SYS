const express = require("express");
const storeControllers = require("../controllers/StoreControllers");
const { jwtAuth } = require("../middlewares/jwtAuth");

const route = express.Router();

route.post("/register-store", jwtAuth, storeControllers.registerStore);
route.get("/", jwtAuth, storeControllers.getStore);
route.delete("/");
route.delete("/");
route.patch("/");
route.patch("/", jwtAuth, storeControllers.updateStoreDetail);

module.exports = route;
