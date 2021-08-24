import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from "@material-ui/icons/Add";
import ButtonMaterial from "@material-ui/core/Button";
import Navbar from "../../components/NavBar/Navbar";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import server from "../../Config/BaseURL";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Venda.css";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";

function Venda() {
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState("");
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [productSelectd, setProductSelectd] = useState("");
  const [clienteSelectd, setClienteSelectd] = useState("");
  const [rows, setRows] = useState([]);
  

  function createData(idProd,produto, quantidade) {
    return { idProd, produto, quantidade};
  }
const productToVend = [];
  
  const clientes = {
    options: clients,
    getOptionLabel: (option) => option.name,
  };

  const produtos = {
    options: products,
    getOptionLabel: (option) => option.type,
  };

  const getClient = async () => {
    try {
      const { data } = await api.get(`${server.url}clients`);
      if (data) {
        setClients(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await api.get(`${server.url}entradaProduto`);
      if (data) {
        setProducts(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const addProduct = () => {
    setEnviado(true);
    console.log(productSelectd);
    console.log(clienteSelectd);
    productToVend.push(createData(productSelectd.id_product, productSelectd.type, quantidade));
    setRows(productToVend);    
  };

  return (
    <>
      <Navbar />
      <div className="content wrapper-venda">
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4 className="mb-0">Vender</h4>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs={12} md={6}>
                      <Row>
                        <Col xs={12} md={12}>
                          <Autocomplete
                            {...produtos}
                            id="produto"
                            debug
                            onChange={(event, newValue) => {
                              setProductSelectd(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Produto*"
                                error={!productSelectd && enviado}
                                margin="normal"
                              />
                            )}
                          />
                          {!productSelectd && enviado ? (
                            <VerifyInputs value="Produto"></VerifyInputs>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={12}>
                          <Autocomplete
                            {...clientes}
                            id="cliente"
                            debug
                            onChange={(event, newValue) => {
                              setClienteSelectd(newValue);
                            }}
                            noOptionsText="Nenhum Registro"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Cliente"
                                margin="normal"
                              />
                            )}
                          />
                        </Col>
                      </Row>

                      <Row className="mt-4">
                        <Col xs={12} md={12}>
                          <TextField
                            id="quantidade"
                            label="Quantidade*"
                            type="number"
                            value={quantidade}
                            error={
                              (quantidade === 0 || quantidade < 0) && enviado
                            }
                            onChange={({ target }) =>
                              setQuantidade(target.value)
                            }
                            className="col-md-12"
                          />
                          {(quantidade === 0 || quantidade < 0) && enviado ? (
                            <VerifyInputs value="Qauntidade"></VerifyInputs>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>

                      <Row className="mt-4">
                        <Col xs={12} md={12}>
                          <ButtonMaterial
                            variant="contained"
                            color="primary"
                            className="float-right btn-insert mb-3"
                            onClick={addProduct}
                            startIcon={<AddIcon />}
                          >
                            Adicionar
                          </ButtonMaterial>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={12} md={6}>
                      <Row className="mt-4">
                        <Col xs={12} md={12}>
                          <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Produto</TableCell>
                                  <TableCell align="right">
                                    Quantidade
                                  </TableCell>
                                  <TableCell align="right">Ação</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.idProd}>
                                    <TableCell component="th" scope="row">
                                      {row.produto}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.quantidade}
                                    </TableCell>
                                    <TableCell align="right">
                                      <IconButton
                                        color="secondary"
                                        aria-label="add an alarm"
                                      >
                                        <CloseIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Button variant="info" className="float-right">
                    Finalizar Venda
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

export default Venda;
