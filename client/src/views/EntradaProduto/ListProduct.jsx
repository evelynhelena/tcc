import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import * as FaIcons from "react-icons/fa";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Navbar from "../../components/NavBar/Navbar";
import Tooltip from "@material-ui/core/Tooltip";
import server from "../../Config/BaseURL";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import currencyFormatter from "currency-formatter";
import dateFormat from "dateformat";

function ListProduct() {
  const { id } = useParams();
  const { estoqueBaixo } = useParams();
  const [products, setProducts] = useState([]);
  const [typeProducts, setTypeProducts] = useState([]);
  const columns = [
    {
      name: "ID",
      selector: "id_product",
      sortable: true,
    },
    {
      name: "Data de Validade",
      selector: "data_validy",
      sortable: true,
    },
    {
      name: "Qauntidade",
      selector: "quantity",
      sortable: true,
    },
    {
      name: "Valor(R$)",
      selector: "valueFormt",
      sortable: true,
    },
    {
      name: "Ações",
      cell: (data) => (
        <>
          <Tooltip title="Editar">
            <Link
              as={Link}
              to={"/EditPtoduto/" + data.id_product}
              className="btn-link-trable btn-link-trable-color-simple"
            >
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Deletar">
            <Button
              className="btn-link-trable btn-link-trable-color-danger btn-normal-denger"
              onClick={() => deleteProduct(data.id_product)}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  if(estoqueBaixo){
    columns.splice(1,0, {name: "Tipo", selector: "type",sortable: true,});
    columns[3].selector = "quantidadeEstoque"
    columns[3].name = "Quantidade em Estoque"
  }

  const getProduc = async () => {
    let str = ""
    if(estoqueBaixo){
      str = `${server.url}getProductsEstoqueBaixo`;
    }else{
      str = `${server.url}entradaProduto/${id}`;
    }
    try {
      const { data } = await api.get(`${str}`);
      if (data) {
        setTypeProducts(data[0] ? data[0].type : "");
        data.forEach((el) => {
          el.data_validy = el.data_validy
            ? dateFormat(el.data_validy, "dd/mm/yyyy")
            : "-";
          el.valueFormt = currencyFormatter.format(el.value, {
            code: "pt-BR",
            decimal: ",",
            decimalDigits: 2,
          });
        });
        setProducts(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao listar os Prdutos", "error");
    }
  };

  useEffect(() => {
    getProduc();
    if (id || estoqueBaixo) {
    }
  }, []);

  const deleteProduct = async (id) => {
    swal({
      title: "Confirmar Alteração !",
      text: "Deseja excluir este produto?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${server.url}entradaProduto/${id}`)
          .then(function (response) {
            let data = response.data;
            if (data.msg) {
              swal("Prduto deletado com sucesso", {
                icon: "success",
              });
              getProduc();
            } else if (data.error.status === 500) {
              swal("Produto não cadastrado", {
                icon: "error",
              });
              getProduc();
            } else {
              swal("Erro ao excluir o produto", {
                icon: "error",
              });
            }
          });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="content wrapper-product-type">
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4>Prdutos</h4>
                    <Card.Subtitle className="mt-1">
                      {estoqueBaixo
                        ? "Lista de Produtos com estoque Baixo"
                        : typeProducts
                        ? "Lista de Prdutos do Tipo - " + typeProducts
                        : "Nnehum produtos cadastrado"}
                    </Card.Subtitle>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <DataTable
                    columns={columns}
                    data={products}
                    defaultSortFieldId={1}
                    sortIcon={<FaIcons.FaAngleUp />}
                    pagination
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ListProduct;
