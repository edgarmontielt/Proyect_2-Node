const {query,insert} = require("../config/database")

class User{
    constructor(user){
        this.iduser = user.iduser //no agregarlo al crear
        this.username = user.username
        this.name = user.name
        this.birthday = user.birthday
        this.profile_pic = user.profile_pic
        this.email = user.email
        this.password = user.password
        this.gender = user.gender
    }

    static async readAll(){
        try {
            return await query("SELECT * FROM users")
        }catch(error){
            console.log(error);
            throw error;
        }
        
    }

    async save(){
        try {
            const newUser = await insert("users",this)
            this.iduser = newUser
            return newUser; 
        }catch(error){
            throw error;
        }
        
    }

    async update(newUser){
        try{
            const id = await query("UPDATE users SET ? WHERE iduser ?" ,[newUser,this.iduser])
            return id;
        }catch(error){
            throw error;
        }
        
    }

    async delete(){
        try{
            return await query("DELETE FROM users WHERE iduser = ?",[this.iduser])
        } catch(error){
            throw error;
        }
        
    }

    // otras
    static async getUserById(id){
        try{
            const data =  await query(`SELECT *,DATE_FORMAT(birthday,'%d/%m/%Y') as birthdayForm FROM users WHERE iduser = ?`,[id])
            return data //acá llama a su contructor??
        }catch(error){
            throw error;
        }
    }
    async getUserByEmailAndPassword(email,password){
        try{
            const data =  await query(`SELECT * FROM users WHERE email = ? and password = ? `,[email,password])
            return data
        }catch(error){
            throw error;
        }
    }
    async getUsersByUsername(username){
        try{
            const data =  await query(`SELECT *,DATE_FORMAT(birthday,'%d/%m/%Y') as birthdayForm FROM users WHERE username = ?`,[username])
            return data
        }catch(error){
            throw error;
        }
    }

    async getUsersByUsernameOrName(username, name){
        try{
            const data =  await query(`SELECT *,DATE_FORMAT(birthday,'%d/%m/%Y') as birthdayForm FROM users WHERE username = ? OR name= ?`,[username, name])
            return data
        }catch(error){
            throw error;
        }
    }

}

module.exports = User