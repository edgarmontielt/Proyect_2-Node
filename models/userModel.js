const res = require("express/lib/response")
const {query,insert} = require("../config/database")

class User{
    idUser
    constructor(user){
        this.username = user.username
        this.name = user.name
        this.birthday = user.birthday
        this.profile_pic = user.profile_pic
        this.email = user.email
        this.password = user.password
        this.passwordRepeat = user.password
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
            const newUser = await insert("users",{
                username : this.username,
                name : this.name,
                birthday : this.birthday,
                profile_pic : this.profile_pic,
                email : this.email,
                password : this.password,
                gender : this.gender
    
            })
            this.idUser = newUser
            return newUser; 
        }catch(error){
            throw error;
        }
        
    }

    async update(newUser){
        try{
            const id = await query("UPDATE users SET ? WHERE idUser ?" ,[newUser,this.idUser])
            return id;
        }catch(error){
            throw error;
        }
        
    }

    async delete(){
        try{
            return await query("DELETE FROM users WHERE idUser = ?",[this.idUser])
        } catch(error){
            throw error;
        }
        
    }

    validate() {
        let result = {success:true, errors:[]}
        if(!(this.name && this.username && this.email && this.password && this.passwordRepeat)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        if(this.password !== this.passwordRepeat){
            result.success = false
            result.errors.push("Las contraseñas no coinciden")
        }
        return result;
    }
    
    // otras
    static async getUserById(id){
        try{
            const data =  await query(`SELECT *,DATE_FORMAT(birthday,'%d/%m/%Y') as birthdayForm FROM users WHERE idUser = ?`,[id])
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