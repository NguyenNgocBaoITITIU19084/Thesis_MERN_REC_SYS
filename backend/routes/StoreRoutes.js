const express = require("express");
const storeControllers = require("../controllers/StoreControllers");
const { jwtAuth } = require("../middlewares/jwtAuth");

const route = express.Router();

route.get("/");
route.delete("/");
route.delete("/");
route.patch("/");
route.patch("/");

module.exports = route;
