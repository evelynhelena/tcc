const mysql = require("mysql");
const bdConnect = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

const verifyRequest = (obj) => {
  for (var [key, value] of Object.entries(obj)) {
    if (null === value || undefined === value || value.length === 0) {
      return false;
    }
  }
  return true;
};

module.exports = {
  insert(req, res) {
    let fields = [
      null,
      req.body.type,
      req.body.indeIsentoDataVality,
      req.body.quantidadeMin,
      "0",
      req.body.value,
    ];
    const connection = bdConnect();
    connection.query(
      "insert into tbl_products_type values (?, ?, ?, ?, ?, ?)",
      fields,
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao tentar inserir um tipo de produto",
              error,
            },
          });
        }
        return res.send(results);
      }
    );
  },

  findAll(req, res) {
    const connection = bdConnect();
    connection.query(
      "select * from tbl_products_type where ind_cance = 0",
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao recuperar os tipos de produto",
              error,
            },
          });
        }
        return res.send(results);
      }
    );
  },
};
