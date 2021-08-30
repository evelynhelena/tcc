import { createConnection } from "mysql";
const bdConnect = () => {
  return createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
};

const calcPorcent = (desconto , precoTotal) => {
  let allDesconto = (desconto * precoTotal) / 100;
  return (precoTotal - allDesconto).toFixed(2);
};

module.exports = {
  getPaymentType(req, res) {
    const connection = bdConnect();
    connection.query("select * from tbl_payme_type", function (error, results) {
      if (error) {
        return res.status(500).send({
          error: {
            msg: "Erro ao tentar recuperar os tipos de pagamentos",
          },
          error,
        });
      }
      return res.send(results);
    });
  },
  async insert(req, res) {
    const { paymentType, cliente, products } = req.body;
    if (paymentType.id_payme_type == 4 && !cliente) {
      return res.status(501).send({
        error: {
          msg: "Nenhum Cliente Selecionado",
        },
      });
    } else {
      let fields = [
        null,
        req.body.dateCompra,
        calcPorcent(req.body.desconto,req.body.valorFinal),
        req.body.desconto,
        "0",
        "0",
        (req.body.cliente = req.body.cliente ? req.body.cliente.id : null),
        req.body.paymentType.id_payme_type,
      ];
      const connection = bdConnect();
     await connection.query(
        "insert into tbl_seles values (?, ?, ?, ?, ?, ?, ?, ?)",
        fields,
        function (error, results) {
          if (error) {
            return res.status(500).send({
              error: {
                msg: "Erro ao tentar recuperar os tipos de pagamentos",
              },
              error,
            });
          }
          if (results.insertId) {
            let valueSql = "";
            let data = [];
            products.forEach((prod) => {
              valueSql = `(${null}, ${parseFloat(
                prod.valor.replace(",", ".")
              )}, 0, ${results.insertId},${prod.idProd},${prod.quantidade})`;
              data.push(valueSql);
            });
            let insertValue = data.toString();
            connection.query(
              `insert into tbl_seles_descricao values ${insertValue}`,
              data,
              function (error, results) {
                if (error) {
                  return res.status(500).send({
                    error: {
                      msg: "Erro ao tentar recuperar os tipos de pagamentos",
                    },
                    error,
                  });
                }
                return res.send(results);
              }
            );
          }
        }
      );
    }
  },
};

