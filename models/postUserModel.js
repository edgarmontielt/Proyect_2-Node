const session = require("express-session");
const { DateTime } = require("luxon");
const { query, insert } = require("../config/database");

class PostUserModel {

    // ---- JOIN -----
    static async getPostWithAllUserData(){
        try {
            return await query("SELECT * FROM posts JOIN users ON posts.idUser=users.idUser");
        }catch(error){
            throw error;
        }
    }

    // Todas las columnas de posts pero de users:name,username,profile_pic
    static async getPostWithUsername(){
        try {
            return await query("SELECT posts.*,users.username,users.name,users.profile_pic FROM posts JOIN users ON posts.idUser=users.idUser");
        }catch(error){
            throw error;
        }
    }

    static async getPostByUsername(username){
        try {
            return await query("SELECT * FROM posts JOIN users ON posts.idUser=users.idUser AND users.username=?",[username]);
        }catch(error){
            throw error;
        }
    }


}

module.exports = PostUserModel;