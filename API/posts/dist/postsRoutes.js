"use strict";
exports.__esModule = true;
var express_1 = require("express");
var postsCtrl_1 = require("./postsCtrl");
var router = express_1["default"].Router();
router
    .get("", postsCtrl_1.getAllPosts)
    .get("/:id", postsCtrl_1.getPostById)
    .post("/add", postsCtrl_1.postAddNewPost)
    .post("/search", postsCtrl_1.searchPost)
    .patch("/:id", postsCtrl_1.patchUpdatePost)["delete"]("/:id", postsCtrl_1.deletePostByID);
exports["default"] = router;
