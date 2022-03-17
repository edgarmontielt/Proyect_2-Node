const { query } = require("../config/database");
const User = require("../models/userModel");

class AuthController {
  getLoginView(req, res) {
    return res.render("login");
  }

  getSignUpView(req, res) {
    return res.render("signup");
  }

  async signUp(req, res) {
    const newUser = new User(req.body);
    const validation = newUser.validate();
    if (validation.success) {
      const resultBD = await newUser.save();
      if (resultBD.success) {
        return res.redirect("/");
      } else {
        validation.success = false;
        validation.errors = [resultBD.error];
      }
    }
    return res.render("signup", { validation, user: newUser });
  }

  logout(req, res){
    req.session.destroy()
    return res.redirect("/")
  }

  async login(req, res) {
    const credentials = req.body;
    const userData = await User.getUserByEmail(credentials.email);
    if (userData.length === 0) {
      return res.render("login", {
        validation: {
          errors: ["Usuario no encontrado"],
        },
      });
    }

    if (userData[0].password !== credentials.password) {
      return res.render("login", {
        validation: {
          errors: ["Credenciales inválidas"],
        },
      });
    }
    console.log(userData[0])

    req.session.user = {
      idUser:userData[0].idUser,
      name: userData[0].name,
      username: userData[0].username,
      profilePic: userData[0].profile_pic,
      birthday: userData[0].birthday,
      occupation: userData[0].occupation,
      loggedIn:true
    }
    
    return res.redirect("/principal");
  }
}

module.exports = AuthController;
