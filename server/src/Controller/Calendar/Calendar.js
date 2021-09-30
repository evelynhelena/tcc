import { createConnection } from "mysql";
import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
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
    connection.end();
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
    connection.end();
  },
  insertEvent(req, res) {
    const connection = bdConnect();
    let dtIni = moment.tz(req.body.dtInit,'America/Sao_Paulo');
    let dtEnd = moment.tz(req.body.dtEnd,'America/Sao_Paulo');
    let fields = [
      null,
      req.body.title,
      dtIni.format(),
      dtEnd.format(),
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
              error: { msg: "Erro ao tentar inserir um eventos" },
              error,
            });
          }
          return res.send(results);
        }
      );
      connection.end();
    }
  },
  updateEvent(req, res) {
    const connection = bdConnect();
    let dtIni = moment.tz(req.body.dtInit,'America/Sao_Paulo');
    let dtEnd = moment.tz(req.body.dtEnd,'America/Sao_Paulo');
    const id = req.params.id;
    let fields = [
      req.body.title,
      dtIni.format(),
      dtEnd.format(),
      req.body.place,
      req.body.descricao,
      req.body.inportance,
    ];
    if (!verifyRequest(req.body)) {
      return res.status(400).send({
        error: {
          msg: "Dados Vazios não são permitidos",
        },
      });
    } else {
      connection.query(
        `update tbl_events_calendar set title = ?, dt_init = ? , dt_end = ?, 
        place = ?, descricao = ?, fk_inportance = ?, ind_cance = 0 where idEvent = ${id}`,
        fields,
        function (error, results) {
          if (error) {
            return res.status(500).send({
              error: { msg: "Erro ao editar os eventos" },
              error,
            });
          }
          return res.send(results);
        }
      );
      connection.end();
    }
  },

  delete(req, res) {
    const connection = bdConnect();
    const id = req.params.id;

    connection.query(
      `update tbl_events_calendar set ind_cance = '1' where idEvent = ${id}`,
      function (error, results) {
        if (error) {
          return res
            .status(404)
            .send({ error: { msg: "Erro ao tentar excluir" } });
        } else if (results.changedRows === 0) {
          return res.send({
            error: { msg: "Evento não cadastrado", status: 500 },
          });
        }
        return res.send({
          msg: "Registro excluído com sucesso",
        });
      }
    );
    connection.end();
  },
};
