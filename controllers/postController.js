const Post = require("../models/postModel");
const PostUser = require("../models/postUserModel");
const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");

class PostController {
  async getAllPostsView(req, res) {
    const data = await Post.readAll();
    return res.render("posts", {
      posts: data,
      hasPosts: data.length > 0,
    });
  }

  async getPostsView(req, res) {
    //const data = await Post.readAll();
    const data = await PostUser.getPostWithUsername();
    return res.render("posts", {
      posts: data,
      hasPosts: data.length > 0,
    });
  }

  async getSearchPostsView(req, res) {
    //console.log(req.query.search)
    const data = await PostUser.getPostByUsername(req.query.search);
    // console.log(data);
    return res.render("posts", {
      posts: data,
      hasPosts: data.length > 0,
    });
  }

  async newPost(req, res) {
    const idUser = req.params.idUser
    const newPost = new Post(req.body, idUser);
    const data = await newPost.addPost();
    return res.redirect("/principal")
  }

  async deletePost(req, res) {
    const id = req.body.idPost;
    const data = await Post.delete(id);
    
    return res.redirect("/principal")
  }

  async unlikePost(req, res) {
    const idPost = req.body.idPost;
    const idUser = req. body.idUser;
    const data = await Like.deleteLike(idPost,idUser);
    
    return res.redirect("/principal")
  }

  async addLikePost(req, res) {
    const idPost = req.body.idPost;
    const idUser = req. body.idUser;
    const data = await Like.addLike(idPost,idUser);
    
    return res.redirect("/principal")
  }

  async getAllComments(req, res) {
    const idPost = req.params.idPost;
    const data = await Comment.getCommentsByPost(idPost);
    //console.log(data)
    return res.redirect("/principal")
  }
}

module.exports = PostController;
