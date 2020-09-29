const express = require("express");

const isAuth = require("../middleware/isAuth");
const feedController = require("../controllers/feed");

const router = express.Router();

router.get("/posts", isAuth, feedController.getPosts);

router.post("/post", isAuth, feedController.createPost);

module.exports = router;
