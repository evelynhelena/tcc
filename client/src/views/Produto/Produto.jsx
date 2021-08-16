import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import server from "../../Config/BaseURL";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import Navbar from "../../components/NavBar/Navbar";
import currencyFormatter from "currency-formatter";

function Produto() {
  const [type, setType] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [indeIsentoDataVality, setIndeIsentoDataVality] = useState({
    checked: false,
  });
  const { id } = useParams();
  const [enviado, setEnviado] = useState(false);

  const validaCampos = () => {
    let typeProductInsert = {
      type: type,
      quantidadeMin: quantidade,
      value: parseFloat(preco),
      indeIsentoDataVality: indeIsentoDataVality.checked,
    };

    for (var [key, value] of Object.entries(typeProductInsert)) {
      if (
        null === value ||
        value.length === 0 ||
        undefined === value ||
        (isNaN(value) && key === "value")
      ) {
        return false;
      }
    }

    return typeProductInsert;
  };

  const insertProductType = async (productType) => {
    try {
      const { data } = await api.post(
        `${server.url}productsType/`,
        productType
      );
      if (data) {
        swal("Sucesso", "Tipo de produdo inserido com sucesso", "success");
      }
    } catch (err) {
      swal("Erro", "Erro ao inserir o tipo de produto", "error");
    }
  };

  const getProductTypeByID = async () => {
    try {
      const { data } = await api.get(`${server.url}productsType/` + id);
      if (data) {
        setType(data[0].type);
        setPreco(
          currencyFormatter.format(data[0].value, {
            code: "pt-BR",
            decimal: ".",
            decimalDigits: 2,
          })
        );
        setQuantidade(data[0].quantity_minima);
        setIndeIsentoDataVality({
          checked: data[0].ind_isento_data_vality === 1,
        });
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
    let insert = validaCampos();
    setEnviado(true);
    if (!insert && isNaN(parseFloat(preco)) && preco.length !== 0) {
      swal("Atenção!", "O Preço deve ser númerico", "warning");
    } else {
      if (insert) {
        insertProductType(insert);
      }
    }
  };

  const update = async () => {
    let updateProduct = validaCampos();
    setEnviado(true);

    if (!updateProduct && isNaN(parseFloat(preco)) && preco.length !== 0) {
      swal("Atenção!", "O Preço deve ser númerico", "warning");
    } else {
      if (updateProduct) {
        if (updateProduct) {
          try {
            const { data } = await api.put(
              `${server.url}productsType/` + id,
              updateProduct
            );
            if (data) {
              swal("Sucesso", "Tipo de Produto editado com sucesso", "success");
              setType(data.type);
              setPreco(
                currencyFormatter.format(data.value, {
                  code: "pt-BR",
                  decimal: ".",
                  decimalDigits: 2,
                })
              );
              setQuantidade(data.quantidadeMin);
              setIndeIsentoDataVality({
                checked: data.indeIsentoDataVality,
              });
              setEnviado(false);
            }
          } catch (err) {
            swal("Erro", "Erro ao editar tipo de produto", "error");
          }
        }
      }
    }
  };

  const handleChange = (event) => {
    setIndeIsentoDataVality({
      ...indeIsentoDataVality,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4 className="mb-0">
                      {id ? "Editando Produto - " + id : "Novo Tipo de Produto"}
                    </h4>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form noValidate autoComplete="off">
                    <Row>
                      <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                          <FormControlLabel
                            value="top"
                            control={
                              <Switch
                                checked={indeIsentoDataVality.checked}
                                onChange={handleChange}
                                name="checked"
                                color="primary"
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            }
                            label="Produto Sem data de Validade"
                            labelPlacement="start"
                          />
                        </FormGroup>
                      </FormControl>
                    </Row>
                    <Row>
                      <Col xs={12} md={12}>
                        <TextField
                          id="tipo"
                          label="Tipo*"
                          value={type}
                          error={type.length === 0 && enviado}
                          className="col-md-12"
                          onChange={({ target }) => setType(target.value)}
                        />
                        {type.length === 0 && enviado ? (
                          <VerifyInputs value="Nome"></VerifyInputs>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col md={6}>
                        <TextField
                          id="quantidade"
                          type="number"
                          label="Quantidade Mínima*"
                          value={quantidade}
                          error={quantidade.length === 0 && enviado}
                          className="col-md-12"
                          onChange={({ target }) => setQuantidade(target.value)}
                        />
                        {quantidade.length === 0 && enviado ? (
                          <VerifyInputs value="Quantidade Mínima"></VerifyInputs>
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col md={6}>
                        <TextField
                          id="value"
                          label="Preço(R$)*"
                          value={preco}
                          error={preco.length === 0 && enviado}
                          className="col-md-12"
                          onChange={({ target }) =>
                            setPreco(target.value.replace(",", "."))
                          }
                        />
                        {preco.length === 0 && enviado ? (
                          <VerifyInputs value="Preço"></VerifyInputs>
                        ) : (
                          ""
                        )}
                      </Col>
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
                    onClick={() => (id ? update() : handleSubmit())}
                  >
                    {id ? "Editar" : "Salvar"}
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

export default Produto;
