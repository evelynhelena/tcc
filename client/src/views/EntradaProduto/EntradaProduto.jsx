import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import server from "../../Config/BaseURL";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
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
  const [qauntidade, setQauntidade] = useState("");
  const [date, setDate] = useState(new Date());
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const { id } = useParams();
  const handleDateChange = (date) => {
    setDate(date);
  };

  const getProductTypeByID = async () => {
    try {
      const { data } = await api.get(`${server.url}productsType/` + id);
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

  const handleSubmit = () => {
      setVisibleAlert(true)
      setTimeout(
        () => setVisibleAlert(false), 
        3000
      );
  };



  return (
    <>
      <Navbar/>
      <Alerts visible={visibleAlert} type="warning" title="Atenção! Produto abaixo do estoque Minímo"></Alerts>
      <div className="content">
        <Container>
       
          <Row className="justify-content-center">
            <Col md={8}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4 className="mb-0">Entrada de Produto</h4>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form noValidate autoComplete="off">
                    <Row>
                      <Col xs={5} md={5}>
                        <TextField
                          disabled
                          id="typeProduct"
                          label="Tipo de Produto*"
                          value={typeProduct}
                          className="col-md-12"
                        />
                      </Col>
                      <Col xs={2} md={2}>
                        <TextField
                          disabled
                          id="idProduto"
                          label="ID Prduto*"
                          value={idPrduto}
                          className="col-md-12"
                        />
                      </Col>
                      <Col xs={2} md={2}>
                        <TextField
                          disabled
                          id="value"
                          label="Preço(R$)*"
                          value={value}
                          className="col-md-12"
                        />
                      </Col>
                      <Col xs={3} md={3}>
                        <TextField
                          disabled
                          id="estoqueMin"
                          label="Estoque Minimo*"
                          value={estoqueMin}
                          className="col-md-12"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col xs={6} md={6}>
                        <TextField
                          id="qauntidade"
                          label="Quantidade*"
                          type="number"
                          value={qauntidade}
                          error={qauntidade.length === 0 && enviado}
                          className="col-md-12 mt-3"
                          onChange={({ target }) => setQauntidade(target.value)}
                        />
                        {qauntidade.length === 0 && enviado ? (
                          <VerifyInputs value="Qauntidade"></VerifyInputs>
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
                              onChange={handleDateChange}
                              cancelLabel="Cencelar"
                              className="w-100"
                              label="Data de Validade*"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
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
                  <Button
                    variant="info"
                    className="float-right"
                    onClick={handleSubmit}
                  >
                    Salvar
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
