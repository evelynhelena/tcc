const mysql = require("mysql");
import DateUtil from "../../helpers/DataUtil";
const bdConnect = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

module.exports = {
    countPayme(req, res) {
    const connection = bdConnect();
    const date = new Date();
    const dateOne = (new Date(DateUtil.countDateLess(date, 1)).getMonth() + 1).toString();
    const dateTow = (new Date(DateUtil.countDateLess(date, 0)).getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const id = req.params.id;
    const filds = [
        id,
        year,
        dateOne,
        dateTow
    ];
   connection.query(
      "call pc_count_payme_dash_client(?,?,?,?)",
      filds,
      function (error, results, fields) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os usuários", erro: error },
          });
        }
        return res.send(results[0]);
      }
    );
    connection.end();
  },

}