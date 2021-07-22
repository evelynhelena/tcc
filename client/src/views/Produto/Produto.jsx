import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button,Image  } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";

function Produto(){

    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = function (){
        console.log("ola mundo");
    }

    return (
        <div className="products">
            <Container>
                <Row>
                <Col  md={8}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <h4>Novo Produto</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <form noValidate autoComplete="off">
                  <Row>
                    <Col md={12}>
                      <TextField
                        id="name"
                        label="Nome"
                        value={name}
                        className="col-md-12"
                        onChange={({ target }) => setName(target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                  <Col md={6}>
                      <TextField
                        id="value"
                        label="Valor (R$)"
                        value={value}
                        className="col-md-12"
                        onChange={({ target }) => setValue(target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        id="quantidade"
                        label="Qauntidade"
                        value={quantidade}
                        className="col-md-12"
                        onChange={({ target }) => setQuantidade(target.value)}
                      />
                    </Col>
                    <Col md={12}>
                      <TextField
                        id="description"
                        label="Descrição"
                        value={description}
                        className="col-md-12"
                        multiline
                        rows={3}
                        onChange={({ target }) => setDescription(target.value)}
                      />
                    </Col>
                  </Row>
                </form>
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
