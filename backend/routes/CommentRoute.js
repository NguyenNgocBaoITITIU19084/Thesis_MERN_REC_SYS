const express = require("express");
const commentControllers = require("../controllers/CommentControllers");

const route = express.Router();

route.post("/", commentControllers.createComment);
route.get(
  "/comments-by-product-id/:id",
  commentControllers.getAllCommentsByProductId
);
route.get("/:id", commentControllers.getCommentById);
route.delete("/:id", commentControllers.deleteCommentById);
route.patch("/:id", commentControllers.updateCommentById);

module.exports = route;
