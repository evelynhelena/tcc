import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import DescriptionIcon from "@material-ui/icons/Description";
import Navbar from "../../components/NavBar/Navbar";
import currencyFormatter from "currency-formatter";
import * as FaIcons from "react-icons/fa";
import DataTable from "react-data-table-component";
import { Container, Row, Col, Card } from "react-bootstrap";
import api from "../../services/Api";
import swal from "@sweetalert/with-react";
import server from "../../Config/BaseURL";
import "./DescricaoVenda.css";

function DescricaoVenda() {
  const { id } = useParams();
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  const [sale, setSale] = useState([]);
  const [products, setProducts] = useState([]);

  const columns = [
    {
      name: "Produto",
      selector: "type",
      sortable: true,
    },
    {
      name: "Preço(R$)",
      selector: "valueFormate",
      sortable: true,
    },
    {
      name: "Quantidade",
      selector: "qauntidade",
      sortable: true,
    },
  ];

  const getprodctByIdVend = async () => {
    try {
      const { data } = await api.get(`${server.url}productVend/` + id, config);
      if (data) {
        data.forEach(
          (el) =>
            (el.valueFormate = currencyFormatter.format(
              el.value * el.qauntidade,
              { code: "pt-BR", decimal: ",", decimalDigits: 2 }
            ))
        );
        setProducts(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

  const getVendById = async () => {
    try {
      const { data } = await api.get(`${server.url}venda/` + id, config);
      if (data) {
        data[0].valueFormate = currencyFormatter.format(data[0].value, {
          code: "pt-BR",
          decimal: ",",
          decimalDigits: 2,
        });
        setSale(data[0]);
        getprodctByIdVend();
      }
    } catch (err) {
      swal("Erro", "Erro ao Resgatar os dados da venda", "error");
    }
  };

  useEffect(() => {
    getVendById();
  }, []);

  const baixaPayme = () => {
    swal({
      title: "Atenção !",
      text: "Deseja indicar que está conts esta paga ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willBaixaPayme) => {
      if (willBaixaPayme) {
        try {
          const { data } = await api.put(
            `${server.url}baixaPayme/` + sale.id_sales,
            {},
            config
          );
          if (data) {
            swal("Sucesso", "Pagamento confirmado com sucesso", "success");
            getVendById();
          }
        } catch {
          swal("Erro ao confirmar o pagamento", {
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="wrapper-descricao-venda">
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Card className="mb-0">
                <Card.Body>
                  <Row>
                    <Col xs={12} md={12}>
                      <Row>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Nome:</strong>{" "}
                            {sale.name + " " + sale.last_name}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>CPF:</strong> {sale.cpf}
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>E-mail:</strong> {sale.email}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>Cel:</strong> {sale.phone}
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Rua:</strong> {sale.endereco}
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Cidade:</strong> {sale.cidade}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>Nº:</strong> {sale.numero}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>UF:</strong> {sale.uf}
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>CEP:</strong> {sale.cep}
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Complemento:</strong> {sale.complemento}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Card className="mt-2">
                <Card.Body>
                  <Row>
                    <Col xs={12} md={12} className="text-right">
                      <Tooltip title="Exportar Relátorio">
                        <IconButton color="primary">
                          <DescriptionIcon />
                        </IconButton>
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} className="pr-5">
                      <DataTable
                        columns={columns}
                        data={products}
                        defaultSortFieldId={1}
                        sortIcon={<FaIcons.FaAngleUp />}
                        noDataComponent="Nenhum Registro Encontrado"
                      />
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row className="bg-secondary p-1">
                    <Col xs={12} md={10} className="text-light">
                      <span>Total</span>
                    </Col>
                    <Col xs={12} md={2} className="text-light">
                      <span>R${sale.valueFormate}</span>
                    </Col>
                  </Row>
                </Card.Body>
                {sale.ind_baixa_payme === 0 ? (
                  <Card.Footer className="text-right">
                    <Button
                      variant="contained"
                      className="bg-success text-light"
                      startIcon={<CheckIcon />}
                      onClick={baixaPayme}
                    >
                      Baixa Pagamento
                    </Button>
                  </Card.Footer>
                ) : (
                  ""
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DescricaoVenda;
