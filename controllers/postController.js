const Post = require("../models/postModel");
const PostUser = require("../models/postUserModel");
const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

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
    // console.log(req.body)
    const data = await newPost.addPost();
    return res.redirect("/principal")
  }

  async newComment(req, res) {
    const newComment = new Comment( req.params.idPost, req.session.user.idUser, req.body)
    const data = await newComment.addComment()
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
    const comentarios = await Comment.getCommentsByPost(idPost);
    const data = await User.getUsersByUsername(req.body.username);

    if (req.session.loggedIn){
      const posts= await PostUser.getPostLikes(req.session.user.idUser);
      return res.render("principal", {
        user: data[0],
        posts: posts,
        hasUsers: data.length > 0 ? true : false,
        idComments: idPost,
        comments: comentarios,
        hasComments: comentarios.length > 0,
      });
    } else {
      return res.render("home")
    }
  }
}

module.exports = PostController;
