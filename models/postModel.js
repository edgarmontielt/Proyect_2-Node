const { DateTime } = require("luxon");
const { query, insert } = require("../config/database");

class Post {
  idPost;

  constructor(post, idUser) {
    this.idUser = idUser;
    this.content = post.content;
    this.title = post.title;  
    this.date = DateTime.now();
  }

  static async readAll() {
    try {
      return await query("SELECT * FROM posts");
    } catch (error) {
      throw error;
    }
  }

  async addPost() {
    try {
      const newPost = await insert("posts", {
        idUser: this.idUser,
        text: this.content,
        title: this.title,
        date: this.date,
      });
      this.idPost = newPost.result;
    //   console.log(newPost)
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  async update(newPost) {
    try {
      const id = await query("UPDATE posts SET ? WHERE idPost ?", [
        newPost,
        this.idPost,
      ]);
      return id;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    try {
      return await query("DELETE FROM posts WHERE idPost = ?", [this.idPost]);
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      return await query("DELETE FROM posts WHERE idPost = ?", [id]);
    } catch (error) {
      throw error;
    }
  }
  // otras
  static async getPostById(id) {
    try {
      const data = await query(`SELECT * FROM posts WHERE idPost = ?`, [id]);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getPostsByIdUser(id) {
    try {
      const data = await query(`SELECT * FROM posts WHERE idUser = ?`, [id]);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Post;
