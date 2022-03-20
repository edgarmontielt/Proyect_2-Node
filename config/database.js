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
        if (error.errno == 1062) {
          const errorData = error.sqlMessage.split("'");
          const value = errorData[1];
          const field = errorData[3].split(".")[1].split("_")[0];
          const message = `El ${field}: '${value}' ya esta en uso`;
  
          reject(message);
        }
        reject(error.sqlMessage);
      } else {
        resolve(results);
      }
    });
  });
}

async function insert(tableName, data) {
  try {
    const result = await query(`INSERT INTO ${tableName}(??) VALUES(?)`, [
      Object.keys(data),
      Object.values(data),
    ]);
    return {result: result.insertId, success:true};
  } catch (error) {
    return { error, success: false };
  }
}

// async function deleteInf(tableName, data){
//   try{
//     const result = await query(`DELETE FROM ${tableName} WHERE idIssueUser = ? AND idReceivedUser = ?;`)
//   } catch (error){}
// }

module.exports = { query, insert };
