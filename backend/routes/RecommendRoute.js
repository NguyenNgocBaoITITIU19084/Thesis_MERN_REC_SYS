const express = require("express");
const RecController = require("../controllers/RecommendationController");
const { jwtAuth, isAuthenticated } = require("../middlewares/jwtAuth");

const route = express.Router();

route.get(`/recommend-content-based/:name`, RecController.contentBased);
route.get(
  "/recommend-collaborative-based/",
  isAuthenticated,
  RecController.Collaborative
);

module.exports = route;
