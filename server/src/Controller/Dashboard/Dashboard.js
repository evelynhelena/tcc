const moment = require("moment");
const mysql = require("mysql");
const bdConnect = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

module.exports = {
    countAllUsers(req, res){
        const connection = bdConnect();
        connection.query(
            'select count(id) as TotalUser FROM tbl_users where ind_cance=0',
            function (error, results, fields) {
                if (error) {
                  return res.status(404).send({
                    error: { msg: "Erro ao tentar recuperar os usuários"},
                  });
                }
                return res.send({totalUser: results[0].TotalUser});
              }
        );
    
    }
}