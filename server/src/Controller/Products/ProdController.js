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
    const connection = bdConnect();
    let fields = [
      null,
      req.body.type,
      req.body.indeIsentoDataVality,
      req.body.quantidadeMin,
      "0",
      req.body.value,
    ];
    if(verifyRequest(req.body)){
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
      connection.end();
    }else{
      return res.status(500).send({
        error: {
          msg: "Campus vazios não são permitidos"
        },
      });
    }
  },

  findAll(req, res) {
    const connection = bdConnect();
    connection.query(
      "select * from tbl_products_type",
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
    connection.end();
  },

  validaProdCadastrado(req, res){
    const connection = bdConnect();
    connection.query(
      `select tp.id_product,
      tp.fk_product_type_id
      from tbl_product tp join tbl_products_type tpt on tp.fk_product_type_id = tpt.id_product_type
      where tp.ind_cance = 0`,
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao recuperar os produto",
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
      `select * from tbl_products_type where id_product_type = ${id}`,
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
    connection.end();
  },

  update(req, res) {
    const connection = bdConnect();
    const id = req.params.id;
    let fields = [
      req.body.type,
      req.body.indeIsentoDataVality,
      req.body.quantidadeMin,
      "0",
      req.body.value,
    ];
    if(verifyRequest(req.body)){
      connection.query(
        `update tbl_products_type set type = ?, ind_isento_data_vality = ? ,quantity_minima = ?, ind_cance = ?, 
        value = ? where id_product_type = ${id}`,
        fields,
        function (error, results) {
          if (error) {
            return res.status(404).send({
              error: {
                msg: "Erro ao tentar alterar o tipo de produto",
                error,
              },
            });
          }
          return res.send({
            ...req.body,
            id,
          });
        }
      );
      connection.end();
    }else{
      return res.status(500).send({
        error: {
          msg: "Campus vazios não são permitidos"
        },
      });
    }
  },

  delete(req, res) {
    const connection = bdConnect();
    const id = req.params.id;

    connection.query(
      "update tbl_products_type set ind_cance = '1' where id_product_type = ?",
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
  
  reability(req, res) {
    const connection = bdConnect();
    const id = req.params.id;

    connection.query(
      "update tbl_products_type set ind_cance = '0' where id_product_type = ?",
      [id],
      function (error, results) {
        if (error) {
          return res
            .status(501)
            .send({ error: { msg: "Erro ao tentar reativar tipo de produto",erro: error } });
        } else if (results.changedRows === 0) {
          return res.send({
            error: { msg: "Tipo de Produto  não cadastrado", status: 500 },
          });
        }
        return res.send({
          msg: "Registro rativado com sucesso",
        });
      }
    );
    connection.end();
  },


};
