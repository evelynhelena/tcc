import React, { useEffect, useState }  from 'react';
import Navbar from '../../components/NavBar/Navbar';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import server from "../../Config/BaseURL";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function EntradaProduto(){
    const [idPrduto, setIdPrduto] = useState(3);
    const [value, setValue] = useState(5.80);
    const [typeProduct, setTypeProduct] = useState("Pipoca");
    const [estoqueMin, setEstoqueMin] = useState(5);
    const [qauntidade, setQauntidade] = useState("");
    const [date, setDate] = useState(new Date());
    const [enviado, setEnviado] = useState(false);

    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <>
        <Navbar/>
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
                            <Col xs={6} md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>

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
                                    'aria-label': 'change date',
                                }}
                                />

                                </MuiPickersUtilsProvider>
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
