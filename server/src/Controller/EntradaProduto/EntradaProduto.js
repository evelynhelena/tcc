const mysql = require("mysql");
import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
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
    if ((null === value || undefined === value || value.length === 0) 
    && (key !== 'dataValidy')) {
      return false;
    }
  }
  return true;
};
module.exports = {
  insert(req, res) {
    const connection = bdConnect();
    let dtValidy = null;
    let fields = [
      null,
      req.body.quantidade,
      dtValidy,
      req.body.idTypeProd,
      "0",
    ];
    if(req.body.dataValidy){
      dtValidy = moment.tz(req.body.dataValidy,'America/Sao_Paulo');
      fields[2] = dtValidy.format();
    }

    if(verifyRequest(req.body)){
      connection.query(
        "insert into tbl_product values (?, ?, ?, ?, ?)",
        fields,
        function (error, results) {
          if (error) {
            return res.status(500).send({
              error: {
                msg: "Erro ao tentar inserir um produto",
                error,
              },
            });
          }
          return res.send(results);
        }
      );
      connection.end();
    }else{
      return res.status(501).send({
        error: {
          msg: "Campus vazios não são permitidos"
        },
      });
    }
  },

  update(req, res){
    const connection = bdConnect();
    let dtValidy = null;
    const id = req.params.id;
    let fields = [
      req.body.quantidade,
      dtValidy,
      req.body.idTypeProd,
      "0",
    ];
    if(req.body.dataValidy){
      dtValidy = moment.tz(req.body.dataValidy,'America/Sao_Paulo');
      fields[1] = dtValidy.format();
    }

    if(verifyRequest(req.body)){
      connection.query(
        `update tbl_product set quantity = ?, data_validy = ? , fk_product_type_id = ?, ind_cance = ? where id_product = ${id}`,
        fields,
        function (error, results) {
          if (error) {
            return res.status(500).send({
              error: {
                msg: "Erro ao tentar editar o produto",
                error,
              },
            });
          }
          return res.send(results);
        }
      );
      connection.end();
    }else{
      return res.status(501).send({
        error: {
          msg: "Campus vazios não são permitidos"
        },
      });
    }
  },

  findByIdPrductType(req, res){
    const connection = bdConnect();
    const id = req.params.id;
    connection.query(
      `select * from vw_find_by_id_prod_type where fk_product_type_id = ${id}`,
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao recuperar produtos",
              error,
            },
          });
        }
        return res.send(results);
      }
    );
    connection.end();
  },
  
  findAll(req, res){
    const connection = bdConnect();
    connection.query(
      `select * from tbl_product tp
      join tbl_products_type tpt on tp.fk_product_type_id = tpt.id_product_type
      where tp.ind_cance = 0 and tpt.ind_cance = 0`,
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao recuperar os produtos",
              error,
            },
          });
        }
        return res.send(results);
      }
    );
    connection.end();
  },

  findById(req, res){
    const connection = bdConnect();
    const id = req.params.id;
    connection.query(
      `select * from vw_find_by_idProd where id_product = ${id}`,
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao recuperar produtos",
              error,
            },
          });
        }
        return res.send(results);
      }
    );
    connection.end();
  }, 

  delete(req, res) {
    const connection = bdConnect();
    const id = req.params.id;
    connection.query(
      "update tbl_product set ind_cance = '1' where id_product = ?",
      [id],
      function (error, results) {
        if (error) {
          return res
            .status(501)
            .send({ error: { msg: "Erro ao tentar excluir",erro: error } });
        } else if (results.changedRows === 0) {
          return res.send({
            error: { msg: "Tipo de Produto  não cadastrado", status: 500 },
          });
        }
        return res.send({
          msg: "Registro excluído com sucesso",
        });
      }
    );
    connection.end();
  },

}