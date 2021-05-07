const mysql = require('mysql')

// CONFIGURANDO DATABASE
module.exports = async () => {
        const teste = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "db_mercadinho"
        })
        
        return teste
}