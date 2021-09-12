import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import server from "../../Config/BaseURL";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import currencyFormatter from "currency-formatter";
import Alerts from "../../components/Alerts/Alerts";

function EntradaProduto() {
  const [idPrduto, setIdPrduto] = useState("");
  const [value, setValue] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [estoqueMin, setEstoqueMin] = useState("");
  const [produtoSemDataValid, setProdutoSemDataValid] = useState(false);
  const [quantidade, setQuantidade] = useState(0);
  const [date, setDate] = useState(new Date());
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const config = {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
  };

  const { id } = useParams();
  const { idProduct } = useParams();
  const handleDateChange = (date) => {
    setDate(date);
  };
  let history = useHistory();

  const validaCampus = () => {
    const data = {
      idTypeProd: idPrduto,
      quantidade: parseInt(quantidade),
    };
    if (produtoSemDataValid) {
      data.dataValidy = date;
    } else {
      data.dataValidy = null;
    }

    if (produtoSemDataValid && !data.dataValidy) {
      return false;
    }

    for (var [key, value] of Object.entries(data)) {
      if (
        (null === value || undefined === value || value.length === 0) &&
        key !== "dataValidy"
      ) {
        return false;
      }
    }
    return data;
  };

  const getProductTypeByID = async () => {
    try {
      const { data } = await api.get(`${server.url}productsType/${id}`,config);
      if (data) {
        setTypeProduct(data[0].type);
        setIdPrduto(data[0].id_product_type);
        setValue(
          currencyFormatter.format(data[0].value, {
            code: "pt-BR",
            decimal: ".",
            decimalDigits: 2,
          })
        );
        setEstoqueMin(data[0].quantity_minima);
        setProdutoSemDataValid(data[0].ind_isento_data_vality === 0);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

  useEffect(() => {
    if (id) {
      getProductTypeByID();
    }
  }, []);

  const getByIdProduct = async () => {
    try {
      const { data } = await api.get(`${server.url}findById/${idProduct}`,config);
      if (data) {
        setTypeProduct(data[0].type);
        setIdPrduto(data[0].fk_product_type_id);
        setQuantidade(data[0].quantity);
        setDate(data[0].data_validy);
        setValue(
          currencyFormatter.format(data[0].value, {
            code: "pt-BR",
            decimal: ".",
            decimalDigits: 2,
          })
        );
        setEstoqueMin(data[0].quantity_minima);
        setProdutoSemDataValid(data[0].ind_isento_data_vality === 0);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

  useEffect(() => {
    if (idProduct) {
      getByIdProduct();
    }
  }, []);

  const insertProduct = async (product) => {
    try {
      const { data } = await api.post(`${server.url}entradaProduto/`, product,config);
      if (data) {
        swal("Sucesso", "Produdo inserido com sucesso", "success").then(
          () => {
            if (validaCampus().quantidade < estoqueMin) {
              setVisibleAlert(true);
              setTimeout(() => setVisibleAlert(false), 3000);
            }
          }
          );
          history.push("/Produto");
      }
    } catch (err) {
      swal("Erro", "Erro ao inserir o produto", "error");
    }
  };

  const deleteProduct = async () => {
    swal({
      title: "Confirmar Alteração !",
      text: "Deseja excluir este produto?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${server.url}entradaProduto/${idProduct}`,config)
          .then(function (response) {
            let data = response.data;
            if (data.msg) {
              swal("Prduto deletado com sucesso", {
                icon: "success",
              });
              history.push("/Produto");
            } else if (data.error.status === 500) {
              swal("Produto não cadastrado", {
                icon: "error",
              });
              history.push("/Produto");
            } else {
              swal("Erro ao excluir o produto", {
                icon: "error",
              });
            }
          });
      }
    });
  };

  const handleSubmit = (edit) => {
    setEnviado(true);
    if (validaCampus() && quantidade > 0) {
      if (quantidade < estoqueMin) {
        swal({
          title: "Atenção?",
          text: "Produto abaixo do estoque Minímo, deseja proseguir ? ",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((wiInsert) => {
          if (wiInsert) {
            if (edit) {
              editProduct(validaCampus());
            } else {
              insertProduct(validaCampus());
            }
          }
        });
      } else {
        if (edit) {
          editProduct(validaCampus());
        } else {
          insertProduct(validaCampus());
        }
      }
    }
  };

  const editProduct = async (product) => {
    try {
      const { data } = await api.put(
        `${server.url}entradaProduto/${idProduct}`,
        product,
        config
      );
      if (data) {
        swal("Sucesso", "Tipo de produdo editado com sucesso", "success").then(
          () => {
            if (validaCampus().quantidade < estoqueMin) {
              setVisibleAlert(true);
              setTimeout(() => setVisibleAlert(false), 3000);
            }
          }
        );
      }
    } catch (err) {
      swal("Erro", "Erro ao editar o tipo de produto", "error");
    }
  };

  return (
    <>
      <Navbar />
      <Alerts
        visible={visibleAlert}
        type="warning"
        title="Atenção! Produto inserido a lista de produtos com estoque baixo"
      ></Alerts>
      <div className="content">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4 className="mb-0">
                      {idProduct ? "Editando Produto" : "Entrada de Produto"}
                    </h4>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form noValidate autoComplete="off">
                    <Row>
                      <Col xs={6} md={6}>
                        <TextField
                          disabled
                          id="typeProduct"
                          label="Tipo de Produto*"
                          value={typeProduct}
                          className="col-md-12"
                        />
                      </Col>
                      <Col xs={3} md={3}>
                        <TextField
                          disabled
                          id="idProduto"
                          label="ID Prduto*"
                          value={idPrduto}
                          className="col-md-12"
                        />
                      </Col>
                      <Col xs={3} md={3}>
                        <TextField
                          disabled
                          id="value"
                          label="Preço(R$)*"
                          value={value}
                          className="col-md-12"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col xs={6} md={6}>
                        <TextField
                          disabled
                          id="estoqueMin"
                          label="Estoque Minimo*"
                          value={estoqueMin}
                          className="col-md-12"
                        />
                      </Col>
                      <Col xs={6} md={6}>
                        <TextField
                          id="quantidade"
                          label="Quantidade*"
                          type="number"
                          value={quantidade}
                          error={quantidade === 0 && enviado}
                          className="col-md-12"
                          onChange={({ target }) => setQuantidade(target.value)}
                        />
                        {quantidade === 0 && enviado ? (
                          <VerifyInputs value="quantidade"></VerifyInputs>
                        ) : (
                          ""
                        )}
                      </Col>

                      {produtoSemDataValid ? (
                        <Col xs={6} md={6}>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={ptBR}
                          >
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              format="dd/MM/yyyy"
                              value={date}
                              error={!date && enviado}
                              onChange={handleDateChange}
                              cancelLabel="Cencelar"
                              className="w-100"
                              label="Data de Validade*"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          {!date && enviado ? (
                            <VerifyInputs value="Data de Validade"></VerifyInputs>
                          ) : (
                            ""
                          )}
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                    <Row className="mt-4">
                      <Col xs={12} md={12}>
                        <p className="mb-0 font-footer-info">
                          (*) Campus Obrigatórios
                        </p>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  {idProduct ? (
                    <Tooltip title="Deletar">
                      <IconButton
                        color="secondary"
                        aria-label="Deletar"
                        className="float-left"
                        onClick={deleteProduct}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  <Button
                    variant="info"
                    className="float-right"
                    onClick={() =>
                      idProduct ? handleSubmit(true) : handleSubmit(false)
                    }
                  >
                    {idProduct ? "Editar" : "Salvar"}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default EntradaProduto;
