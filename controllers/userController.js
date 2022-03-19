const User = require("../models/userModel");
const Post = require("../models/postUserModel")



class UserController {
  // async getUsersView(req, res) {
  //   const data = await User.readAll();
  //   return res.render("home", {
  //     users: data,
  //     hasUsers: data.length > 0,
  //   });
  // }

  async getSearchUserView(req, res) {
    const data = await User.getUsersByUsername(req.body.username);
    const posts = await Post.getPostWithUsername()
    return res.render("principal", {
      user: data[0],
      posts: posts,
      hasUsers: data.length > 0 ? true : false,
    });
  }

  async getProfileView(req, res) {
    const idUser = req.params.idUser;
    const data = await User.getUserById(idUser);
    const posts = await Post.getPostByUsername(data[0].username);
    console.log(data)
    return res.render("Profile", {
      user: data[0],
      posts: posts,
      hasUser: data.length > 0,
      hasPosts: posts.length > 0
    })
  }
}

module.exports = UserController;
