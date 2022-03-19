const User = require("../models/userModel");
const Post = require("../models/postUserModel");

class UserController {
  // async getUsersView(req, res) {
  //   const data = await User.readAll();
  //   return res.render("home", {
  //     users: data,
  //     hasUsers: data.length > 0,
  //   });
  // }

  async getFilteredUsers(req, res) {
    let data;
    if (req.session.loggedIn) {
      const result = await User.readFilteredUsers(req.session.user.idUser);
      data = {
        users: result,
        hasUsers: result.length > 0,
        loggedIn: req.session.user.loggedIn
      };
      return res.render("people", data);
    } else {
      const result = await User.readAll();
      data = {
        users: result,
        hasUsers: result.length > 0,
        loggedIn: false
      };
      return res.render("people", data)
    }
  }

  async getSearchUserView(req, res) {
    const data = await User.getUsersByUsername(req.body.username);
    const posts = await Post.getPostWithUsername();
    return res.render("principal", {
      user: data[0],
      posts: posts,
      hasUsers: data.length > 0,
    });
  }

  async addFriend() {
    // const result = await User.
  }
}

module.exports = UserController;
