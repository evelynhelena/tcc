import { createConnection } from "mysql";
import { generateToken,generatePasswords,sendEmail } from "../../helpers/userFeatures";
const bdConnect = () => {
  return createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

module.exports = {
  getUser(req, res) {
    const connection = bdConnect();
    let fields = [req.body.login, req.body.password, req.body.typeUser];
    connection.query(
      "select * from tbl_users tu where tu.user_name = ? and tu.senha = ? and tu.fk_user_name = ?",
      fields,
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao recuperar o usuário",
            },
            error,
          });
        }
        try {
          if (results.length > 0) {
            const { id, user_name, fk_user_name } = results[0];
            const token = generateToken(id, user_name, fk_user_name);
            return res
              .status(200)
              .send({ Message: "Login efetuado com sucesso", token, idUser: id });
          } else {
            res.status(401).send({ error: "Usuário ou Senha Incorretos" });
          }
        } catch {
          res.status(500).send({ error: "Internal Server Error" });
        }
      }
    );
    connection.end();
  },

  resetPassword(req, res){
    const connection = bdConnect();
    const { userEmail } = req.body;
    const newPassword = generatePasswords();
    let fields = [newPassword,userEmail];

    connection.query(
      "update tbl_users tu set tu.senha = ? where tu.email = ?",
      fields,
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao alterar a senha",
            },
            error,
          });
        }
        if(results.affectedRows > 0){
          sendEmail(userEmail,newPassword);
          return res.status(200).send({ Message: "Senha Alterada com sucesso" });
        }else{
          return res.status(501).send({ Message: "Email não cadastrado" });
        }
      }
    );
    connection.end();
  }
};
