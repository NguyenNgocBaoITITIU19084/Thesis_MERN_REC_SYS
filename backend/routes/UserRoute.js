const express = require("express");
const userControllers = require("../controllers/UserControllers");

const route = express.Router();

route.post("/", userControllers.register);
route.get("/");
route.get("/:id");
route.delete("/:id");
route.patch("/:id");

module.exports = route;
