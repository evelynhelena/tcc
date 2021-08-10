import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import DataTable from "react-data-table-component";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import swal from "@sweetalert/with-react";
import server from "../../Config/BaseURL";
import api from "../../services/Api";
import currencyFormatter from "currency-formatter";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Navbar from "../../components/NavBar/Navbar";
import Tooltip from "@material-ui/core/Tooltip";
import "./ListProductType.css";
function ListProducType() {
  const [productsType, setProductsType] = useState([]);
  const columns = [
    {
      name: "ID",
      selector: "id_product_type",
      sortable: true,
    },
    {
      name: "Tipo",
      selector: "type",
      sortable: true,
    },
    {
      name: "Data de Validade Obrigatória",
      selector: "dataValitObrigatorio",
      sortable: true,
    },
    {
      name: "Estoque Mínimo",
      selector: "quantity_minima",
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
          <Tooltip title="Lista de Produtos">
            <Link
              as={Link}
              to={"/EditProductType/" + data.id_product_type}
              className="btn-link-trable btn-link-trable-color-primery"
            >
              <VisibilityIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Editar">
            <Link
              as={Link}
              to={"/EditProductType/" + data.id_product_type}
              className="btn-link-trable btn-link-trable-color-simple"
            >
              <EditIcon />
            </Link>
          </Tooltip>
          {data.ind_cance === 0 ? (
            <Tooltip title="Cadastar Produto">
              <Link
                as={Link}
                to={"/EntradaProduto/" + data.id_product_type}
                className="btn-link-trable btn-link-trable-color-sucess"
              >
                <AddIcon />
              </Link>
            </Tooltip>
          ) : (
            <Button
              disabled
              variant="contained"
              style={{ padding: "5px" }}
              onClick={() => deleteProductType(data.id_product_type)}
            >
              <AddIcon />
            </Button>
          )}

          {data.ind_cance === 0 ? (
            <Tooltip title="Desativar">
              <Button
                className="btn-link-trable btn-link-trable-color-danger btn-normal-denger"
                onClick={() => deleteProductType(data.id_product_type)}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Reativar">
              <Button
                className="btn-link-trable btn-link-trable-color-reative btn-normal-reative"
                onClick={() => reativarProductType(data.id_product_type)}
              >
                <CheckBoxIcon />
              </Button>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const getProductType = async () => {
    try {
      const { data } = await api.get(`${server.url}productsType`);
      if (data) {
        data.forEach((el) => {
          el.dataValitObrigatorio =
            el.ind_isento_data_vality === 1 ? "Sim" : "Não";
          el.valueFormt = currencyFormatter.format(el.value, {
            code: "pt-BR",
            decimal: ",",
            decimalDigits: 2,
          });
        });
        setProductsType(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao listar tipo de produto", "error");
    }
  };

  useEffect(() => {
    getProductType();
  }, []);

  const deleteProductType = async (id) => {
    swal({
      title: "Deseja desativar este tipo produto ?",
      text: "Todos os Produtos com esse tipo serão desativados do sistema.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`${server.url}productsType/` + id).then(function (response) {
          let data = response.data;
          if (data.msg) {
            swal("Tipo de Prduto deletado com sucesso", {
              icon: "success",
            });
            getProductType();
          } else if (data.error.status === 500) {
            swal("Tipo de produto não cadastrado", {
              icon: "error",
            });
            getProductType();
          } else {
            swal("Erro ao desativar o tipo de proodutos", {
              icon: "error",
            });
          }
        });
      }
    });
  };

  const reativarProductType = (id) => {
    swal({
      title: "Confirmar Alteração !",
      text: "Deseja Rativar este tipo de produto",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .put(`${server.url}productsTypeReability/` + id)
          .then(function (response) {
            let data = response.data;
            if (data.msg) {
              swal("Tipo de Prduto reativado com sucesso", {
                icon: "success",
              });
              getProductType();
            } else if (data.error.status === 500) {
              swal("Tipo de produto não cadastrado", {
                icon: "error",
              });
              getProductType();
            } else {
              swal("Erro ao rativar o tipo de proodutos", {
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
                    <h4>Tipo de Produtos</h4>
                    <Card.Subtitle className="mt-1">
                      Lista de tipos de Produtos
                    </Card.Subtitle>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <DataTable
                    columns={columns}
                    data={productsType}
                    defaultSortFieldId={1}
                    sortIcon={<FaIcons.FaAngleUp />}
                    pagination
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Link to={"/NewProductType"}>
          <Button variant="primary" className="btn-plus edit">
            <FaIcons.FaPlus />
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ListProducType;
