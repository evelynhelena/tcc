const mysql = require("mysql");

module.exports = async () => {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: "root",
      password: "",
      database: process.env.MYSQL_DB,
    });
    
    connection.end();
     
    return connection
}