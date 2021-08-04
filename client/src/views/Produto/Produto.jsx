import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

function Produto() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [indeIsentoDataVality, setIndeIsentoDataVality] = useState({
    checked: false,
  });

  const handleSubmit = function () {
    console.log("ola mundo");
  };

  const handleChange = (event) => {
    setIndeIsentoDataVality({
      ...indeIsentoDataVality,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="products">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <h4>Novo Tipo de Produto</h4>
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
                    <Col md={12}>
                      <TextField
                        id="name"
                        label="Tipo"
                        value={type}
                        className="col-md-12"
                        onChange={({ target }) => setType(target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col md={6}>
                      <TextField
                        id="quantidade"
                        label="Qauntidade Mínima"
                        value={quantidade}
                        className="col-md-12"
                        onChange={({ target }) => setQuantidade(target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        id="value"
                        label="Valor (R$)"
                        value={value}
                        className="col-md-12"
                        onChange={({ target }) => setValue(target.value)}
                      />
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
  );
}

export default Produto;
