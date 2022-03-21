const { DateTime } = require("luxon");
const { query, insert } = require("../config/database");

class Comment {
  idcomment;

  constructor(idPost, idUser, data) {
    this.iduser = idUser;
    this.idpost = idPost;
    this.comment_text = data.comment;
    this.date = DateTime.now();
  }

  static async readAll() {
    try {
      return await query("SELECT * FROM comments ORDER BY date desc");
    } catch (error) {
      throw error;
    }
  }

  async addComment() {
    try {
      const newComment = await insert("comments", {
        iduser: this.iduser,
        idpost: this.idpost,
        comment_text: this.comment_text,
        date: this.date,
      });
      this.idcomment = newComment.result;
      return newComment;
    } catch (error) {
      console.log(error);
    }
  }


  static async delete() {
    try {
      return await query("DELETE FROM comments WHERE idcomment = ?", [this.idcomment]);
    } catch (error) {
      throw error;
    }
  }
 
  static async getCommentsByPost(idpost){
    try {
        const data = await query("SELECT comments.*,users.username,users.name,users.profile_pic FROM comments JOIN users ON comments.iduser=users.idUser and comments.idpost=? ORDER BY date desc", [idpost]);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

 static async countComments(idpost){
    return await query("SELECT COUNT(comment_text) FROM comments WHERE idpost=?",[idpost])
 }
}

module.exports = Comment;