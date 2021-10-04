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
  countAllUsers(req, res) {
    const connection = bdConnect();
    connection.query(
      "select count(id) as TotalUser FROM tbl_users where ind_cance=0",
      function (error, results, fields) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os usuários" },
          });
        }
        return res.send({ totalUser: results[0].TotalUser });
      }
    );
    connection.end();
  },

  countProductsEstoqueBaixo(req, res){
    const connection = bdConnect();
    connection.query(
      `select tp.quantity as estoqueBaixo , tpt.quantity_minima from tbl_product tp join tbl_products_type tpt on 
      tp.fk_product_type_id = tpt.id_product_type 
      where tp.ind_cance = 0 and tpt.ind_cance = 0 group by tp.fk_product_type_id`,
      function (error, results, fields) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os produtos com estoque baixo" },
          });
        }
        let countProducts = results.filter(el => el.estoqueBaixo < el.quantity_minima);
        return res.send({ totalProduct: countProducts.length});
      }
    );
    connection.end();
  },

  getProductsEstoqueBaixo(req, res){
    const connection = bdConnect();
    connection.query(
      `select * from vw_estoque_baixo`,
      function (error, results, fields) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os produtos com estoque baixo" },
          });
        }
        return res.send(results.filter(el => el.quantity < el.quantity_minima));
      }
    );
    connection.end();
  },

  getPendentePayment(req, res){
    const connection = bdConnect();
    const date = new Date();
    const dateByGet = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    connection.query(
      `select sum(ts.value) as pagamentos_pendentes from tbl_seles ts 
      join tbl_users tu on ts.fk_cliente = tu.id
      where ts.ind_baixa_payme = 0 and ts.ind_cance = 0 and tu.ind_cance = 0 and ts.date_compra = "${dateByGet}"`,
      function (error, results, fields) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os pagamentos pendentes", erro: error },
          });
        }
        return res.send(results);
      }
    ); 
    connection.end();
  }

};
