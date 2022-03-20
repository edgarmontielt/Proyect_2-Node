const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

const userController = new UserController();

router.get("/", (req, res) => {
    return res.render("home")
});

router.get("/principal", userController.getSearchUserView)
router.post("/principal", userController.getSearchUserView)
router.get("/users/:idUser", userController.getProfileView)
router.get("/people", userController.getFilteredUsers)
router.get("/addFriend/:idReceived", userController.addFriend)
router.get("/friends", userController.getFriends)
router.post("/acceptFriend/:idIssue", userController.acceptFriend)
router.get("/deleteFriendReq/:idFriendReq", userController.deleteFriendReq)
router.get("/deleteFriend/:idFriend", userController.deleteFriend)
// router.get("/friendrequest", userController.getFriendsRequest)


module.exports = router;
