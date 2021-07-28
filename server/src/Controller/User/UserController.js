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

const verifyRequest = (obj) => {
  for (var [key, value] of Object.entries(obj)) {
    if (null === value) return false;
  }
  return true;
};

module.exports = {
  findAll(req, res) {
    const connection = bdConnect();
    connection.query(
      "select tu.fk_user_name , tu.id , tu.ind_cance , tu.last_name , tu.last_update , tu.name , tu.phone , tu.user_name , tu.email," +
        "tu.cpf, tu.endereco, tu.cidade, tu.cep, tu.numero, tu.uf,tu.bairro, tu.url_foto_perfil,tu.senha, tu.complemento," +
        "ttu.type_user  from tbl_users tu  join tbl_type_users ttu on ttu.id = tu.fk_user_name where tu.ind_cance=0 order by tu.id asc",

      function (error, results, fields) {
        if (error) {
          console.log(error);
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os usuários" },
          });
        }
        return res.send(results);
      }
    );
  },

  findUserType(req, res) {
    const connection = bdConnect();
    connection.query(
      "select * from tbl_type_users",
      function (error, results, fields) {
        if (error) {
          return res
            .status(404)
            .send({
              error: { msg: "Erro ao tentar recuperar tipos de usuários" },
            });
        }
        return res.send(results);
      }
    );
  },

  findById(req, res) {
    const connection = bdConnect();
    const id = req.params.id;

    connection.query(
      "select tu.fk_user_name , tu.id , tu.ind_cance , tu.last_name , tu.last_update , tu.name , tu.phone , tu.user_name , tu.email," +
        "tu.cpf, tu.endereco, tu.cidade, tu.cep, tu.numero, tu.uf,tu.bairro, tu.url_foto_perfil, tu.senha, tu.complemento," +
        "ttu.type_user  from tbl_users tu  join tbl_type_users ttu on ttu.id = tu.fk_user_name where tu.id='" +
        id +
        "' and tu.ind_cance=0",

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
    let fields = [
      null,
      req.body.name,
      req.body.user_name,
      req.body.last_name,
      req.body.phone,
      "0",
      date,
      req.body.user_type,
      req.body.email,
      req.body.cpf,
      req.body.endereco,
      req.body.cidade,
      req.body.cep,
      req.body.numero,
      req.body.uf,
      req.body.bairro,
      req.body.imagem,
      req.body.senha,
      req.body.complemento,
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
          if (!verifyRequest(req.body)) {
            return res.status(400).send({
              error: {
                msg: "Dados Vazios não são permitidos",
              },
            });
          } else {
            connection.query(
              "insert into tbl_users values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          return res.send({
            error: {
              erro: 400,
              msg: "Nome de usuário ja cadastrado no sistéma",
            },
          });
        }
      }
    );
  },

  update(req, res) {
    const connection = bdConnect();
    const id = req.params.id;
    let userName;
    let fields = [
      req.body.name,
      req.body.user_name,
      req.body.last_name,
      req.body.phone,
      req.body.user_type,
      req.body.email,
      req.body.cpf,
      req.body.endereco,
      req.body.cidade,
      req.body.cep,
      req.body.numero,
      req.body.uf,
      req.body.bairro,
      req.body.imagem,
      req.body.senha,
      req.body.complemento,
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
        if (userName.length == 0) {
          if (!verifyRequest(req.body)) {
            return res.status(400).send({
              error: {
                msg: "Dados Vazios não são permitidos",
              },
            });
          } else {
            connection.query(
              "update tbl_users set name = ?, user_name = ? , last_name = ?, phone = ?, fk_user_name = ?," +
                "email = ?, cpf = ?, endereco = ?, cidade = ?, cep = ?, numero = ?, uf = ?, bairro = ?," +
                "url_foto_perfil = ? , senha = ?, complemento = ?, last_update = ?, ind_cance = ? where id ='" +
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
          }
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
            .send({ error: { msg: "Erro ao tentar excluir" } });
        } else if (results.changedRows === 0) {
          return res.send({
            error: { msg: "Usuário não cadastrado", status: 500 },
          });
        }
        return res.send({
          msg: "Registro excluído com sucesso",
        });
      }
    );
  },
};
