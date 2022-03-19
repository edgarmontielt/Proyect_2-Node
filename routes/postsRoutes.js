const express = require("express")
const PostController = require("../controllers/postController")
const UserController = require("../controllers/userController")

const router = express.Router()

const postController = new PostController()

router.get("/all-posts",postController.getAllPostsView)
// router.get("/principal", )
// router.get("/posts/search",postController.getSearchPostsView)

router.post("/newpost/:idUser", postController.newPost)
router.post("/post/delete", postController.deletePost)
router.post("/post/unlike", postController.unlikePost)
router.post("/post/like", postController.addLikePost)

module.exports = router