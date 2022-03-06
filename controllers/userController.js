const User = require('../models/userModel')

class UserController{
    
    async getUsersView(req,res){
        const data = await User.readAll()
        return res.render("home",{
            users:data,
            hasUsers: data.length > 0
        })
    }

    async getSearchUserView(req,res){
         const data = await User.getUsersByUsernameOrName(req.query.search)
         //console.log(data);
         return res.render("home",{
             data,
             hasUsers:data.length > 0
         })
     }
}

module.exports = UserController