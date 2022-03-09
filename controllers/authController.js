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
    console.log(validation);
    if (validation.success) {
      const resultBD = await newUser.save();
      console.log(resultBD);
      if (resultBD.success) {
        return res.redirect("/");
      } else {
        validation.success = false;
        validation.errors = [resultBD.error];
      }
    }
    return res.render("signup", { validation, user: newUser });
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

    return res.redirect("/");
  }
}

module.exports = AuthController;
