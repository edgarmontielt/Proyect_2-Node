const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

const userController = new UserController();

router.get("/", (req, res) => {
    return res.render("home")
});

router.get("/principal", userController.getSearchUserView)
router.post("/principal", userController.getSearchUserView)

module.exports = router;
