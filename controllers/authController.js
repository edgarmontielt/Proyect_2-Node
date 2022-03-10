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
    req.session.loggedIn = true;
    req.session.name = userData[0].name;
    req.session.idUser = userData[0].idUser;
    return res.redirect("/principal");
  }
}

module.exports = AuthController;
