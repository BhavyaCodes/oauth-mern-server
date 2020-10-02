const express = require("express");
const proxy = require("express-http-proxy");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/auth/google", authController.getGoogleAuth);

router.get("/auth/google/callback", authController.getGoogleAuthCallback);

router.get("/api/logout", authController.getLogout);

router.get("/api/isloggedin", isAuth, authController.getIsLoggedIn);

module.exports = router;
