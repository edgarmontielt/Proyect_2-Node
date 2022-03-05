const {query,insert} = require("../config/database")

class Post{
    constructor(post){
        this.idPost = post.idPost //no agregarlo al crear
        this.idUser = post.idUser
        this.title = post.title
        this.text = post.text
        this.date = post.date
          
    }

    
}

module.exports = Post