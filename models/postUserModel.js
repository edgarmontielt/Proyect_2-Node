const session = require("express-session");
const { DateTime } = require("luxon");
const { query, insert } = require("../config/database");

class PostUserModel {
  // ---- JOIN -----
  static async getPostWithAllUserData() {
    try {
      return await query(
        "SELECT * FROM posts JOIN users ON posts.idUser=users.idUser"
      );
    } catch (error) {
      throw error;
    }
  }

  // Todas las columnas de posts pero de users:name,username,profile_pic
  static async getPostWithUsername() {
    try {
      return await query(
        "SELECT posts.*,users.username,users.name,users.profile_pic FROM posts JOIN users ON posts.idUser=users.idUser"
      );
    } catch (error) {
      throw error;
    }
  }

  static async getPostLikes(idUser) {
    try {
      const posts = await query(
        "SELECT posts.*,users.username,users.name,users.profile_pic FROM posts JOIN users ON posts.idUser=users.idUser ORDER BY date DESC"
      );
      const likes = await query("SELECT * FROM likesPostUser");
      //console.log(posts);
      // console.log(likes);
      let aux = {};
      likes.forEach((element) => {
        if (aux[element.idPost]) {
          aux[element.idPost].likes = aux[element.idPost].likes + 1;
        } else {
          aux[element.idPost] = { likes: 1, likedByUser: false };
        }

        if (element.idUser == idUser) aux[element.idPost].likedByUser = true;
      });
     // console.log(aux);
      posts.forEach((post) => {
        if(aux[post.idPost]){
            post.likes = aux[post.idPost].likes;
            post.likedByUser = aux[post.idPost].likedByUser
        }
        else{
            post.likes = 0;
            post.likedByUser = false;
        }
      });
      //console.log(posts)
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  static async getPostByUsername(username) {
    try {
      return await query(
        "SELECT * FROM posts JOIN users ON posts.idUser=users.idUser AND users.username=?",
        [username]
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostUserModel;
