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
  },

  countProductsEstoqueBaixo(req, res){
    const connection = bdConnect();
    connection.query(
      `select sum(tp.quantity) as estoqueBaixo , tpt.quantity_minima from tbl_product tp join tbl_products_type tpt on 
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
  },

  getProductsEstoqueBaixo(req, res){
    const connection = bdConnect();
    connection.query(
      `select tp.id_product,
      tp.quantity,
      tp.data_validy, 
      tp.fk_product_type_id,
      tp.ind_cance as status_product,
      tpt.id_product_type,
      tpt.type,
      tpt.ind_isento_data_vality,
      tpt.quantity_minima,
      tpt.ind_cance as status_product_type,
      tpt.value,
      sum(tp.quantity) as quantidadeEstoque
      from tbl_product tp join tbl_products_type tpt on tp.fk_product_type_id = tpt.id_product_type 
      where tp.ind_cance = 0 and tpt.ind_cance = 0  group by tp.fk_product_type_id`,
      function (error, results, fields) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os produtos com estoque baixo" },
          });
        }
        return res.send(results.filter(el => el.quantidadeEstoque < el.quantity_minima));
      }
    );
  }

};
