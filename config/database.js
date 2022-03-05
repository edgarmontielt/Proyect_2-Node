const mysql = require("mysql2");
const { dbName, dbPort, dbUser, dbPass, dbHost } = require(".");

const connection = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName,
});

function query(sql, data) {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (error, results) => {
      // Error first callback
      if (error) {
        console.error(error.sqlMessage);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function insert(tableName,data){
  try{
      await query(`INSERT INTO ${tableName}(??) VALUES(?)`,[Object.keys(data),Object.values(data)])
      return {data,success:true}
  }catch(error){
      return {error,success:false} 
  }
}

module.exports = {query,insert}
