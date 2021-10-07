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
    connection.query("select * from tbl_payme_type",(error, results) => {
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
    connection.end();
  },
  async insert(req, res) {
    const { paymentType, cliente, products } = req.body;

    let indBaixa = paymentType.id_payme_type !== 4;
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
        indBaixa,
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
                      msg: "Erro ao realizar uma venda",
                    },
                    error,
                  });
                }
                return res.send(results);
              }
            );
            connection.end();
          }
        }
      );
    }
  },
  findAll(req, res){
    const { dateCompra, clienteId, vandaFiado} = req.body;
    const connection = bdConnect();
    let str = "";
    if(dateCompra && clienteId){
      str = `date_compra = '${dateCompra}' and fk_cliente = ${clienteId}`;
    }else if(dateCompra && !clienteId){
      str = `date_compra = ' ${dateCompra} '`;
    }else if(!dateCompra && clienteId){
      str = `fk_cliente = ${clienteId} `;
    }
    if(vandaFiado){
      str+= "and fk_payment_type = 4";
    }

    connection.query(
      `select * from vw_sales where ${str} and ind_cance = 0 and ind_cance_user = 0`,
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
  },

  baixaPayme(req, res) {
    const id  = req.params.id;
    const connection = bdConnect();
    connection.query(
      `update tbl_seles ts set ts.ind_baixa_payme = "1" where ts.id_sales = ${id}`,
      (error, results) =>{
      if (error) {
        return res.status(500).send({
          error: {
            msg: "Erro ao dar baixa no pagameto",
          },
          error,
        });
      }
      return res.send(results);
    });
    connection.end();
  },

  getVendById(req, res) {
    const id  = req.params.id;
    const connection = bdConnect();
    connection.query(
      `select * from tbl_seles ts 
      join tbl_users tu ON ts.fk_cliente = tu.id
      where ts.id_sales = ${id} and ts.ind_cance = 0`,
      (error, results) =>{
      if (error) {
        return res.status(500).send({
          error: {
            msg: "Erro ao dar baixa no pagameto",
          },
          error,
        });
      }
      return res.send(results);
    });
    connection.end();
  },

  
  getProdByIdVend(req, res) {
    const id  = req.params.id;
    const connection = bdConnect();
    connection.query(
      `select * from tbl_seles_descricao tsd 
      join tbl_product tp on tsd.fk_product_id = tp.id_product 
      join tbl_products_type tpt on tp.fk_product_type_id = tpt.id_product_type 
      where fk_sales_id = ${id}`,
      (error, results) =>{
      if (error) {
        return res.status(500).send({
          error: {
            msg: "Erro ao dar baixa no pagameto",
          },
          error,
        });
      }
      return res.send(results);
    });
    connection.end();
  },

  delete(req, res) {
    const id  = req.params.id;
    const connection = bdConnect();
    connection.query(
      `update tbl_seles ts set ts.ind_cance = "1" where ts.id_sales = ${id}`,
      (error, results) =>{
      if (error) {
        return res.status(500).send({
          error: {
            msg: "Erro ao deletar a venda",
          },
          error,
        });
      }
      return res.send(results);
    });
    connection.end();
  }
};

