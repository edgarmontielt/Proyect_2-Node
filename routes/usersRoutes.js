const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

const userController = new UserController();

router.get("/", userController.getUsersView);
router.get("/search", userController.getSearchUserView);

router.get("/principal", userController.getUserPrincipalPage);

module.exports = router;
