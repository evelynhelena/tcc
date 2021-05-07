module.exports = async () =>  {
    const mysql = require("mysql");

    const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    });

    return connection.end();
}