const express = require("express");
const ProductControllers = require("../controllers/ProductControllers");

const route = express.Router();

route.post("/", ProductControllers);
route.get("/", ProductControllers);
route.get("/:id", ProductControllers);
route.delete("/:id", ProductControllers);
route.patch("/:id", ProductControllers);

module.exports = route;
