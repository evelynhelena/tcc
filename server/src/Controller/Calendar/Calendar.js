import { createConnection } from "mysql";
const bdConnect = () => {
  return createConnection({
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
  getInportanteTasks(req, res) {
    const connection = bdConnect();
    connection.query(
      "select * from tbl_inportance_tasks tit",
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: {
              msg: "Erro ao tentar pesquisar a inportancia das tarefas",
            },
            error,
          });
        }
        return res.send(results);
      }
    );
  },
  getEventsCalendar(req, res) {
    const connection = bdConnect();
    connection.query(
      "select * from tbl_events_calendar tc join tbl_inportance_tasks tit on tc.fk_inportance = tit.idInportance where tc.ind_cance = 0",
      function (error, results) {
        if (error) {
          return res.status(500).send({
            error: { msg: "Erro ao tentar recuperar eventos" },
            error,
          });
        }
        return res.send(results);
      }
    );
  },
  insertEvent(req, res) {
    const connection = bdConnect();
    let fields = [
      null,
      req.body.title,
      req.body.dtInit,
      req.body.dtEnd,
      req.body.place,
      req.body.descricao,
      req.body.inportance,
      "0",
    ];
    if (!verifyRequest(req.body)) {
      return res.status(400).send({
        error: {
          msg: "Dados Vazios não são permitidos",
        },
      });
    } else {
      connection.query(
        "insert into tbl_events_calendar values (?, ?, ?, ?, ?, ?, ?, ?)",
        fields,
        function (error, results) {
          if (error) {
            return res.status(500).send({
              error: { msg: "Erro ao tentar recuperar eventos" },
              error,
            });
          }
          return res.send(results);
        }
      );
    }
  },
};
