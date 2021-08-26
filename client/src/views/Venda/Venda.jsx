import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from "@material-ui/icons/Add";
import ButtonMaterial from "@material-ui/core/Button";
import Navbar from "../../components/NavBar/Navbar";
import swal from "@sweetalert/with-react";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
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
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [productSelectd, setProductSelectd] = useState("");
  const [clienteSelectd, setClienteSelectd] = useState("");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  function createData(idProd, produto, quantidade) {
    return { idProd, produto, quantidade };
  }

  const resetaCampus = () => {
    setQuantidade("");
    setEnviado(false);
  };

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

  const verificaListaProd = () => {
    let insert = rows.find((el) => el.idProd === productSelectd.id_product);
    return insert;
  };

  const addProduct = () => {
    setEnviado(true);
    if (
      (quantidade > 0 || quantidade.length !== 0) &&
      productSelectd !== "" &&
      productSelectd
    ) {
      if (rows.length > 0) {
        if (!verificaListaProd()) {
          setRows((oldArray) => [
            ...oldArray,
            createData(
              productSelectd.id_product,
              productSelectd.type,
              quantidade
            ),
          ]);
          setOpen(false);
          resetaCampus();
        } else {
          setOpen(true);
        }
      } else {
        setRows((oldArray) => [
          ...oldArray,
          createData(
            productSelectd.id_product,
            productSelectd.type,
            quantidade
          ),
        ]);
        resetaCampus();
      }
    }
  };

  const deleteProduct = (index) => {
    var newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
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
                  <Collapse in={open}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="secondary"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      Produto já está na lista
                    </Alert>
                  </Collapse>

                  <Row>
                    <Col xs={12} md={6}>
                      <Row>
                        <Col xs={12} md={12}>
                          <Autocomplete
                            {...produtos}
                            id="produto"
                            clearOnBlur={true}
                            debug
                            clearText="Limpar"
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

                      <Row className="mt-4">
                        <Col xs={12} md={12}>
                          <TextField
                            id="quantidade"
                            label="Quantidade*"
                            type="number"
                            value={quantidade}
                            error={
                              (quantidade <= 0 || quantidade.length === "") &&
                              enviado
                            }
                            onChange={({ target }) =>
                              setQuantidade(target.value)
                            }
                            className="col-md-12"
                          />
                          {(quantidade <= 0 || quantidade.length === "") &&
                          enviado ? (
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
                                {rows.map((row, index) => (
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
                                        onClick={() => deleteProduct(index)}
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
                  <Button
                    variant="info"
                    className="float-right"
                    onClick={() => setModalShow(true)}
                  >
                    Finalizar Venda
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          backdrop="static"
          size="lg"
          keyboard={false}
        >
          <Modal.Header closeButton className="p-2">
            <span>Realizar Venda</span>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={6}>
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
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Venda;
