const mysql = require('mysql')

// CONFIGURANDO DATABASE
module.exports = async () => {
        const teste = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB,
        })
        
        return teste
}