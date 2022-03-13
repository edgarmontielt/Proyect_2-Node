const User = require("../models/userModel");

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
    return res.render("principal", {
      user: data[0],
      hasUsers: data.length > 0 ? true : false,
    });
  }
}

module.exports = UserController;
