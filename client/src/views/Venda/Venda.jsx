import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
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
import currencyFormatter from "currency-formatter";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./Venda.css";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";

function Venda() {
  const [quantidade, setQuantidade] = useState("");

  const [precoTotal, setPrecoTotal] = useState(0);
  const [precoDesconto, setPrecoDesconto] = useState(0);

  const [precoTotalFilter, setPrecoTotalFilter] = useState(0);
  const [precoDescontoFilter, setPrecoDescontoFilter] = useState(0);

  const [date, setDate] = useState(new Date());
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [sendVend, setSendVend] = useState(false);
  const [productSelectd, setProductSelectd] = useState("");
  const [clienteSelectd, setClienteSelectd] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [paymentTypeSelected, setPaymentTypeSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  function createData(idProd, produto, valor, quantidade) {
    return { idProd, produto, valor, quantidade };
  }

  const resetaCampus = () => {
    setQuantidade("");
    setEnviado(false);
  };

  const clearCampus = () =>{
    setQuantidade("");
    setEnviado(false);
    setRows([]);
    setDate(new Date());
  }

  const handleDateChange = (date) => {
    setDate(date);
  };

  const clientes = {
    options: clients,
    getOptionLabel: (option) => option.name,
  };

  const produtos = {
    options: products,
    getOptionLabel: (option) => option.type,
  };

  const payment = {
    options: paymentType,
    getOptionLabel: (option) => option.non_payme_type,
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

  const getPaymentType = async () => {
    try {
      const { data } = await api.get(`${server.url}paymentType`);
      if (data) {
        setPaymentType(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar tipo de pagamento", "error");
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getPaymentType();
  }, []);

  const verificaListaProd = () => {
    let insert = rows.find((el) => el.idProd === productSelectd.id_product);
    return insert;
  };

  const addProduct = async () => {
    setEnviado(true);
    if (
      quantidade > 0 &&
      quantidade.length !== 0 &&
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
              currencyFormatter.format(
                productSelectd.value * parseInt(quantidade),
                {
                  code: "pt-BR",
                  decimal: ",",
                  decimalDigits: 2,
                }
              ),
              parseInt(quantidade)
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
            currencyFormatter.format(
              productSelectd.value * parseInt(quantidade),
              {
                code: "pt-BR",
                decimal: ",",
                decimalDigits: 2,
              }
            ),
            parseInt(quantidade)
          ),
        ]);
        resetaCampus();
      }
    }
  };

  const seteTotalValue = () => {
    let preco = 0;
    rows.forEach((el) => {
      preco += parseFloat(el.valor.replace(",", "."));
    });
    setPrecoTotal(preco);
    setPrecoTotalFilter(
      currencyFormatter.format(preco, {
        code: "pt-BR",
        decimal: ",",
        decimalDigits: 2,
      })
    );
    let allDesconto = (desconto * preco) / 100;
    setPrecoDesconto(preco - allDesconto);
    setPrecoDescontoFilter(
      currencyFormatter.format(preco - allDesconto, {
        code: "pt-BR",
        decimal: ",",
        decimalDigits: 2,
      })
    );
  };

  useEffect(() => {
    seteTotalValue();
  }, [rows]);

  const calcPorcent = (value) => {
    let allDesconto = (value * precoTotal) / 100;
    return precoTotal - allDesconto;
  };

  const aplyDesconto = (value) => {
    if (value.length > 0 && value) {
      setPrecoDesconto(calcPorcent(value));
      setPrecoDescontoFilter(
        currencyFormatter.format(calcPorcent(value), {
          code: "pt-BR",
          decimal: ",",
          decimalDigits: 2,
        })
      );
      setDesconto(value);
    } else {
      setPrecoDescontoFilter(
        currencyFormatter.format(calcPorcent(value), {
          code: "pt-BR",
          decimal: ",",
          decimalDigits: 2,
        })
      );
      setDesconto(0);
    }
  };

  const deleteProduct = (index) => {
    var newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const insertVend = async (objct) => {
    try {
      const { data } = await api.post(`${server.url}venda`,objct);
      if (data) {
        swal("Sucesso", "Venda realizada com sucesso", "success");
        clearCampus();
      }
    } catch (err) {
      swal("Erro", "Erro ao realizar a venda", "error");
    }
  };

  const finishVend = () => {
    if (rows.length > 0) {
      setSendVend(true);
      if ((paymentTypeSelected !== "" && paymentTypeSelected) && date) {
        if (
          paymentTypeSelected.id_payme_type === 4 &&
          (!clienteSelectd || clienteSelectd === "")
        ) {
          swal(
            "Atenção",
            "Selecione um cliente para esse tipo de venda",
            "warning"
          );
        }else{
          const data = {
            dateCompra: new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0),
            valorFinal: precoTotal,
            desconto: desconto,
            cliente: clienteSelectd,
            paymentType: paymentTypeSelected,
            products: rows,
          }
          insertVend(data);
        }
      }
    } else {
      swal("Erro", "Nnehum produto selecionado", "error");
    }
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
                <Card.Body className="principal-card">
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
                    <Col xs={12} md={6} className="pr-5">
                      <Row>
                        <Col xs={12} md={6}>
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

                        <Col xs={12} md={6} className="mt-3">
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

                      <Row className="mt-1">
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

                      <Row className="mt-4">
                        <Col xs={12} md={12}>
                          <TableContainer
                            component={Paper}
                            className="max-height-table-product"
                          >
                            <Table size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Produto</TableCell>
                                  <TableCell>Quantidade</TableCell>
                                  <TableCell>Preço</TableCell>
                                  <TableCell align="right">Ação</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row, index) => (
                                  <TableRow key={row.idProd}>
                                    <TableCell component="th" scope="row">
                                      {row.produto}
                                    </TableCell>
                                    <TableCell>{row.quantidade}</TableCell>
                                    <TableCell>{row.valor}</TableCell>
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

                    <Col xs={12} md={6} className="pl-5">
                      <Row>
                        <Col xs={12} md={6}>
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
                        <Col xs={12} md={6}>
                          <Autocomplete
                            {...payment}
                            id="TipoPagamento"
                            debug
                            onChange={(event, newValue) => {
                              setPaymentTypeSelected(newValue);
                            }}
                            noOptionsText="Nenhum Registro"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!paymentTypeSelected && sendVend}
                                label="Tipo de Pagamento*"
                                margin="normal"
                              />
                            )}
                          />
                          {!paymentTypeSelected && sendVend ? (
                            <VerifyInputs value="Tipio de Pagamento"></VerifyInputs>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>

                      <Row className="mt-4">
                        <Col xs={12} md={6}>
                          <TextField
                            className="w-100 mt-3"
                            label="Desconto"
                            id="desconto"
                            type="number"
                            value={desconto}
                            error={desconto < 0}
                            disabled={rows.length === 0}
                            onChange={({ target }) =>
                              aplyDesconto(target.value)
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={ptBR}
                          >
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              format="dd/MM/yyyy"
                              value={date}
                              error={!date && sendVend}
                              onChange={handleDateChange}
                              cancelLabel="Cencelar"
                              className="w-100"
                              label="Data da Venda*"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          {!date && sendVend ? (
                            <VerifyInputs value="Data da Venda"></VerifyInputs>
                          ) : (
                            ""
                          )}
                        </Col>
                        
                      </Row>

                      <Row className="mt-4 pr-2">
                        <Card>
                          <Card.Body>
                            <Row>
                              <Col xs={12} md={9}>
                                <span>Total</span>
                              </Col>
                              <Col xs={12} md={3}>
                                <span>R$ {precoTotalFilter}</span>
                              </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                              <Col xs={12} md={9}>
                                <span>Desconto</span>
                              </Col>
                              <Col xs={12} md={3}>
                                <span>{desconto}%</span>
                              </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                              <Col xs={12} md={9}>
                                <span>Total com desconto</span>
                              </Col>
                              <Col xs={12} md={3}>
                                <span>R$ {precoDescontoFilter}</span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="info"
                    className="float-right"
                    onClick={finishVend}
                  >
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
