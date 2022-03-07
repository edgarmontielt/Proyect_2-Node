const express = require("express");
const AuthController = require('../controllers/authController');

const router = express.Router();
const authController = new AuthController();
/*
router.get("/", (req, res) => {
    return res.render("home")
})*/
router.get('/login', authController.getLoginView);
router.get('/signup', authController.getSignUpView);
router.post('/signup', authController.signUp);

router.get("/login", (req, res) =>{
    return res.render("login")
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

module.exports = router;
