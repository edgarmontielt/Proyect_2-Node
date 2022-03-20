const { query, insert } = require("../config/database");

class User {
  idUser;
  constructor(user) {
    this.username = user.username;
    this.name = user.name;
    this.birthday = user.birthday;
    this.profile_pic = user.profile_pic;
    this.occupation = user.occupation;
    this.email = user.email;
    this.password = user.password;
    this.passwordRepeat = user.passwordRepeat;
    this.gender = user.gender;
  }

  static async readAll() {
    try {
      const users = await query("SELECT * FROM users");
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async readFilteredUsers(idUser) {
    try {
      const users = await query(
        "SELECT * FROM users WHERE idUser != ? AND idUser NOT IN (SELECT users.idUser FROM users JOIN friendsrequests ON users.idUser = friendsrequests.idReceivedUser WHERE friendsrequests.idIssueUser = ?);",
        [idUser, idUser]
      );
      const requestSend = await query(
        "SELECT * FROM users JOIN friendsrequests ON users.idUser=friendsrequests.idReceivedUser AND friendsrequests.status = 0  WHERE friendsrequests.idIssueUser=?",
        idUser
      );
      // const friends = await query ("SELECT * FROM users JOIN friendsrequests ON users.idUser=friendsrequests.idReceivedUser AND friendsrequests.status = 1 WHERE friendsrequests.idIssueUser=?", idUser)
      const friendsReq = await this.getFriendsRequest(idUser);
      return { users, requestSend, friendsReq };
    } catch (error) {
      console.log(error);
    }
  }

  static async getFriendsRequest(idReceived) {
    try {
      const friendsrequest = await query(
        "SELECT * FROM users JOIN friendsrequests ON users.idUser=friendsrequests.idIssueUser AND status=0 WHERE friendsrequests.idReceivedUser=?",
        idReceived
      );
      return friendsrequest;
    } catch (error) {}
  }

  static async getFriends(idUser) {
    try {
      const friends = await query(
        "SELECT * FROM users JOIN friendsrequests ON users.idUser=friendsrequests.idReceivedUser AND friendsrequests.status = 1 WHERE friendsrequests.idIssueUser=?",
        idUser
      );
      return friends;
    } catch (error) {
      console.log(error);
    }
  }

  async save() {
    try {
      const newUser = await insert("users", {
        username: this.username,
        name: this.name,
        birthday: this.birthday,
        profile_pic: this.profile_pic,
        email: this.email,
        password: this.password,
        gender: this.gender,
        occupation: this.occupation,
      });
      this.idUser = newUser.result;
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async update(newUser) {
    try {
      const id = await query("UPDATE users SET ? WHERE idUser ?", [
        newUser,
        this.idUser,
      ]);
      return id;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    try {
      return await query("DELETE FROM users WHERE idUser = ?", [this.idUser]);
    } catch (error) {
      throw error;
    }
  }

  validate() {
    let result = { success: true, errors: [] };
    if (
      !(
        this.name &&
        this.username &&
        this.email &&
        this.password &&
        this.passwordRepeat
      )
    ) {
      result.success = false;
      result.errors.push("Rellena todos los campos");
    }
    if (this.password !== this.passwordRepeat) {
      result.success = false;
      result.errors.push("Las contraseñas no coinciden");
    }
    return result;
  }

  static async addFriend(idIssue, idReceived) {
    try {
      const result = await insert("friendsrequests", {
        idIssueUser: idIssue,
        idReceivedUser: idReceived,
        status: false,
      });
      return result;
    } catch (error) {}
  }

  static acceptFriend(idReceived, idIssue) {
    const result = query("UPDATE friendsrequests SET status = true WHERE idIssueUser = ? AND idReceivedUser = ?", [idIssue, idReceived])
    const accept = insert("friendsrequests", {
      idIssueUser: idReceived,
      idReceivedUser: idIssue,
      status: true,
    });
    return result
  }

  static async deleteFriendReq(idfriendReq) {
    try {
      const result = await query("DELETE FROM friendsrequests WHERE idfriendReq = ? AND status = 0", idfriendReq);
      // await query(`DELETE FROM friendsrequest WHERE idIssueUser = ? AND idReceivedUser = ?`,[idFriend,idUser]);
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteFriend(idUser, idFriend) {
    try {
      const result = await query(`DELETE FROM friendsrequests WHERE idIssueUser = ? AND idReceivedUser = ? AND status = 1`,[idUser, idFriend]);
      await query(`DELETE FROM friendsrequests WHERE idIssueUser = ? AND idReceivedUser = ? AND status = 1`,[idFriend,idUser]);
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  // Others
  static async getUserById(id) {
    try {
      const data = await query(`SELECT * FROM users WHERE idUser = ?`, [id]);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const data = await query(`SELECT * FROM users WHERE email = ?`, [email]);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUsersByUsername(username) {
    try {
      const data = await query(`SELECT * FROM users WHERE username = ?`, [
        username,
      ]);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUsersByUsername(username) {
    try {
      const data = await query(`SELECT * FROM users WHERE username = ?`, [
        username,
      ]);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
