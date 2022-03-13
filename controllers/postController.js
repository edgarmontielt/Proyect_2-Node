const Post = require('../models/postModel')
const PostUser = require('../models/postUserModel')

class PostController{
    
    async getAllPostsView(req,res){
        const data = await Post.readAll();
        return res.render("posts",{
            posts:data,
            hasPosts: data.length > 0
        })
    }

    async getPostsView(req,res){
        //const data = await Post.readAll();
        const data = await PostUser.getPostWithUsername();
        return res.render("posts",{
            posts:data,
            hasPosts: data.length > 0
        })
    }

    async getSearchPostsView(req,res){
        //console.log(req.query.search)
         const data = await PostUser.getPostByUsername(req.query.search)
        // console.log(data);
         return res.render("posts",{
             posts: data,
             hasPosts:data.length > 0
         })
     }

}

module.exports = PostController