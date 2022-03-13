const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();
const authController = new AuthController();

router.get("/login", authController.getLoginView);
router.post("/login", authController.login);
router.get("/signup", authController.getSignUpView);
router.post("/signup", authController.signUp);
router.get("/logout", authController.logout);


module.exports = router;
