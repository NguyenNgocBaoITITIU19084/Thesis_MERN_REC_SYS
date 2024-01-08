const express = require("express");
const ReadDataController = require("../csv_data/ReadDataController");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");
const route = express.Router();

route.get(`/read-data-csv`, ReadDataController.ReadCSVDataFile_Category);
route.get(`/read-product`, ReadDataController.ReadCSVDataFile_product);
route.get(`/read-users`, ReadDataController.ReadCSVDataFile_Users);
module.exports = route;
