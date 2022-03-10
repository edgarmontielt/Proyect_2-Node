const Post = require('../models/postModel')

class PostController{
    
    async getPostsView(req,res){
        const data = await Post.readAll();
        return res.render("posts",{
            posts:data,
            hasPosts: data.length > 0
        })
    }

}

module.exports = PostController