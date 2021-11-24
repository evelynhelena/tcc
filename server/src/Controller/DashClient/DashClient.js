const mysql = require("mysql");
import DateUtil from "../../helpers/DataUtil";
const bdConnect = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

module.exports = {
    countPayme(req, res) {
    const connection = bdConnect();
    const date = new Date();
    const dateOne = (new Date(DateUtil.countDateLess(date, 0)).getMonth() + 1).toString();
    const dateTow = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const id = req.params.id;
    let totalPagos = 0;
    let totalAbertos = 0;
    const filds = [
        id,
        year,
        dateOne,
        dateTow
    ];
   connection.query(
      "call pc_count_payme_dash_client(?,?,?,?)",
      filds,
      function (error, results, fields) {
        if (error) {
          return res.status(404).send({
            error: { msg: "Erro ao tentar recuperar os usuários", erro: error },
          });
        }

        const arrayMesPago = results[0].filter(el => el.statusCompra === "Pago");
        const arrayMesAberto = results[0].filter(el => el.statusCompra === "Em Aberto");
        arrayMesPago.forEach((el) => totalPagos += el.total);
        arrayMesAberto.forEach((el)=> totalAbertos += el.total);
        return res.send({pagos: totalPagos, emAberto: totalAbertos});
      }
    );
    connection.end();
  },

  findAllSales(req, res){
    const {id , paymeOpen} = req.body;
    const fields = [
      id,
      paymeOpen ? 0 : 1,
    ];
    const connection = bdConnect();
    connection.query(
      'select * from tbl_seles ts where ts.fk_cliente = ? and ts.ind_cance = 0 and ts.ind_baixa_payme = ?',
      fields,
      (error, results) =>{
      if (error) {
        return res.status(500).send({
          error: {
            msg: "Erro ao recupertar as Vendas",
          },
          error,
        });
      }
      return res.send(results);
    });
    connection.end();
  }

}