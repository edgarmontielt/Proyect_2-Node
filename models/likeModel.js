const { query, insert } = require("../config/database");

class Like {
  idLike;

  constructor(idPost, idUser) {
    this.idUser = idUser;
    this.idPost = idPost;
  }

  static async readAll() {
    try {
      return await query("SELECT * FROM likesPostUser");
    } catch (error) {
      throw error;
    }
  }

  static async addLike(idPost, idUser) {
    try {
      const newLike = await query("INSERT INTO likesPostUser(idPost,idUser) VALUES(?,?)",[idPost, idUser]);
      //console.log(newLike);
      return newLike;

      } catch (error) {
      console.log(error);
    }
  }


  static async deleteLike(idPost, idUser) {
    try {
      return await query("DELETE FROM likesPostUser WHERE idPost=? AND idUser=?", [idPost, idUser]);
    } catch (error) {
      throw error;
    }
  }
 
// Likes que dió un usuario
  static async getLikeByIdUser(idUser) {
    try {
      const data = await query(`SELECT idPost FROM likesPostUser WHERE idUser = ?`, [idUser]);
      return data;
    } catch (error) {
      throw error;
    }
  }
// Devuelve cantidad de likes del post y si el usuario logueado dió like o no
  static async getLikesByIdPost(idPost,idUser) {
    try {
      const data = await query(`SELECT idUser FROM likesPostUser WHERE idPost = ?`, [idPost]);
      console.log(data)
      const res = {
        includeUser: true
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Like;
