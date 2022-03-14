const {query,insert} = require("../config/database")

class Post{
    idPost; //no agregarlo al crear
    constructor(post){      
        this.idUser = post.idUser
        this.title = post.title
        this.text = post.text
        this.date = post.date
          
    }

    static async readAll(){
        try {
            return await query("SELECT * FROM posts");
        }catch(error){
            throw error;
        }
    }

    static async save(){
        try {
            const newPost = await insert("posts",{
                idUser: this.idUser,
                title: this.title,
                text: this.text,
                date: this.date
            });
            this.idPost = newPost.result;
            return newPost;
        }catch(error){
            throw error;
        }

    }

    async update(newPost){
        try {
            const id = await query("UPDATE posts SET ? WHERE idPost ?" ,[newPost,this.idPost]);
            return id;
        }catch(error){
            throw error;
        }
        
    }

    async delete(){
        try {
            return await query("DELETE FROM posts WHERE idPost = ?",[this.idPost]);
        }catch (error) {
            throw error;
        }
       
    }

    // otras
    async getPostById(id){
        try{
            const data =  await query(
                `SELECT * FROM posts WHERE idPost = ?`,[id]);
            return data;
        }catch(error){
            throw error;
        }
    }

    async getPostsByIdUser(id){
        try{
            const data =  await query(`SELECT * FROM posts WHERE idUser = ?`,[id])
            return data
        }catch(error){
            throw error;
        }
    }


}

module.exports = Post