const User = require("../models/userModel");
const Post = require("../models/postUserModel");


class UserController {

  async getFilteredUsers(req, res) {
    let data;
    if (req.session.loggedIn) {
      const result = await User.readFilteredUsers(req.session.user.idUser);
      data = {
        hasUsers: result.users.length > 0,
        users: result.users,
        hasReqSend: result.requestSend.length > 0,
        requestSend: result.requestSend,
        hasFriendReq: result.friendsReq.length > 0,
        friendsReq: result.friendsReq,
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

  async acceptFriend(req, res){
    const result = await User.acceptFriend(req.body.idReceived, req.params.idIssue)
    return res.redirect("/people")
  }

  async getSearchUserView(req, res) {
    const data = await User.getUsersByUsername(req.body.username);

    if (req.session.loggedIn){
      //const posts = await Post.getPostWithUsername();
      const posts= await Post.getPostLikes(req.session.user.idUser);
      return res.render("principal", {
        user: data[0],
        posts: posts,
        hasUsers: data.length > 0 ? true : false,

      });
    } else {
      return res.render("home")
    }
  }

  async getProfileView(req, res) {
    const idUser = req.params.idUser;
    const data = await User.getUserById(idUser);
    const posts = await Post.getPostByUsername(data[0].username);
    
    return res.render("Profile", {
      user: data[0],
      posts: posts,
      hasUser: data.length > 0,
      hasPosts: posts.length > 0
    })
  }
  
  async addFriend(req, res) {
    const idIssue = req.session.user.idUser
    const idReceived = req.params.idReceived
    const result = await User.addFriend(idIssue, idReceived) 

    return res.redirect("/people")
  }

  async getFriends(req, res){
    const friends = await User.getFriends(req.session.user.idUser)
    return res.render("friends", {
      hasFriends: friends.length > 0,
      friends: friends
    })
  }

  async deleteFriendReq(req, res) {
    if(req.session.loggedIn){
      const result = await User.deleteFriendReq(req.params.idFriendReq)
      return res.redirect("/people")
    }
    return res.redirect("/people")
  }

  async deleteFriend(req, res){
    if (req.session.loggedIn) {
      const result = await User.deleteFriend(req.session.user.idUser, req.params.idFriend)
      return res.redirect("/friends")
    }
  }

}

module.exports = UserController;
