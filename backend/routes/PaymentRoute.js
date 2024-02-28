const express = require("express");

const PayementController = require("../controllers/PaymentControllers");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();

route.post("/process", PayementController.PaymentProcess);
route.get("/api_key", PayementController.getApiKey);

module.exports = route;
