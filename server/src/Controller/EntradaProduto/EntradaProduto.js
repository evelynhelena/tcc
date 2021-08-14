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
      tpt.value
      from tbl_product tp join tbl_products_type tpt on tp.fk_product_type_id = tpt.id_product_type 
      where tp.fk_product_type_id = ${id} and tp.ind_cance = 0 and tpt.ind_cance = 0`,
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
  }

}