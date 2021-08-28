import { createConnection } from "mysql";
const bdConnect = () => {
  return createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

module.exports = {
    getPaymentType(req, res) {
      const connection = bdConnect();
      connection.query(
        "select * from tbl_payme_type",
        function (error, results) {
          if (error) {
            return res.status(500).send({
              error: {
                msg: "Erro ao tentar recuperar os tipos de pagamentos",
              },
              error,
            });
          }
          return res.send(results);
        }
      );
    },
}