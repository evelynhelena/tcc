const moment = require("moment");
const mysql = require("mysql");
const date = moment().utc().format("yyyy-MM-DD hh:mm:ss");
const bdConnect = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

module.exports = {
  findAll(req, res) {
    const connection = bdConnect();
    connection.query(
      "select * from tbl_users where ind_cance=0",
      function (error, results, fields) {
        console.log(results);
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os usuários"},
          });
        }
        return res.send(results);
      }
    );
  },

  findUserType(req,res){
    const connection = bdConnect();
    connection.query(
      "select * from tbl_type_users",
      function(error,results,fields){
        if(error){
          return res.status(404).send({error: {msg: "Erro ao tentar recuperar tipos de usuários"}});
        }
        return res.send(results);
      }
    )
  },

  findById(req, res) {
    const connection = bdConnect();
    const id = req.params.id;

    connection.query(
      "select * from tbl_users where id='" + id + "' and ind_cance=0",
      function (error, results) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar pesquisar usuário" },
            error,
          });
        }
        return res.send(results);
      }
    );
  },

  findOne(req, res) {},

  insert(req, res) {
    const connection = bdConnect();
    let userName;
    fields = [
      null,
      req.body.name,
      req.body.user_name,
      req.body.last_name,
      req.body.phone,
      "0",
      date,
      req.body.user_type,
    ];

    connection.query(
      "select * from tbl_users where user_name='" + req.body.user_name + "'",
      function (error, results) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar pesquisar usuário" },
            error,
          });
        }
        userName = results;
        if (userName.length == 0) {
          if (
            !req.body.name ||
            req.body.name === null ||
            req.body.name === undefined
          )
            return res
              .status(404)
              .send({ error: { msg: "O campo nome é inválido" } });
          else if (
            !req.body.last_name ||
            req.body.last_name === null ||
            req.body.last_name === undefined
          )
            return res
              .status(404)
              .send({ error: { msg: "O campo de sobrenome é inválido" } });
          else if (
            !req.body.phone ||
            req.body.phone === null ||
            req.body.phone === undefined
          )
            return res
              .status(404)
              .send({ error: { msg: "O campo de telefone é inválido" } });
          else {
            connection.query(
              "insert into tbl_users values (?, ?, ?, ?, ?, ?, ?, ?)",
              fields,
              function (error, results) {
                if (error) {
                  return res.status(404).send({
                    error: {
                      msg: "Erro ao tentar inserir os dados no banco de dados",
                      error,
                    },
                  });
                }
                return res.send({
                  ...req.body,
                  id: results.insertId,
                });
              }
            );
          }
        } else {
          return res.status(400).send({
            error: { msg: "Nome de usuário ja cadastrado no sistéma" },
          });
        }
      }
    );
  },

  update(req, res) {
    const connection = bdConnect();
    const id = req.params.id;
    let userName;
    fields = [
      req.body.name,
      req.body.user_name,
      req.body.last_name,
      req.body.phone,
      date,
      "0",
    ];

    connection.query(
      "select * from tbl_users where user_name='" +
        req.body.user_name +
        "' and id != '" +
        id +
        "'",
      function (error, results) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar pesquisar usuário" },
            error,
          });
        }
        userName = results;
        console.log(userName);
        if (userName.length == 0) {
          connection.query(
            "update tbl_users set name = ?, user_name = ? , last_name = ?, phone = ?, last_update = ?, ind_cance = ? where id ='" +
              id +
              "'",
            fields,
            function (error, results) {
              if (error) {
                return res.status(404).send({
                  error: {
                    msg: "Erro ao tentar alterar o usuario",
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
        } else {
          return res.status(400).send({
            error: { msg: "Nome de usuário ja cadastrado no sistéma" },
          });
        }
      }
    );
  },

  delete(req, res) {
    const connection = bdConnect();
    const id = req.params.id;

    connection.query(
      "update tbl_users set ind_cance = '1' where id = ? and ind_cance = '0'",
      [id],
      function (error, results) {
        if (error) {
          return res
            .status(404)
            .send({ error: { msg: "Erro ao tentar excluir"}});
        }else if(results.changedRows === 0){
          return res
          .send({ error: { msg: "Usuário não cadastardo", status: 500} });
        }
        return res.send({
          msg: "Registro excluído com sucesso",
        });
      }
    );
  },
};
