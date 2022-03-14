const express = require("express")
const PostController = require("../controllers/postController")

const router = express.Router()

const postController = new PostController()


router.get("/all-posts",postController.getAllPostsView)

router.get("/posts",postController.getPostsView)

router.get("/posts/search",postController.getSearchPostsView)

module.exports = router