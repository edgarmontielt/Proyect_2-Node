const User = require('../models/userModel')

class AuthController{
    getLoginView(req,res){
        return res.render('login')
    }

    getSignUpView(req,res){
        return res.render("signup")
    }

    async signUp(req,res){
        const newUser = new User(req.body)
        const validation = newUser.validate()
        if(validation.success){
            await newUser.save()
            return res.redirect('/')
        }
        return res.render('signup',{validation, user:newUser})
    }
}
module.exports = AuthController