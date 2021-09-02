import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import DataTable from "react-data-table-component";
import Autocomplete from "@material-ui/lab/Autocomplete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TextField from "@material-ui/core/TextField";
import api from "../../services/Api";
import server from "../../Config/BaseURL";
import swal from "@sweetalert/with-react";
import Tooltip from "@material-ui/core/Tooltip";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { ptBR } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./Venda.css";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";

function ListVenda() {
  const [clients, setClients] = useState([]);
  const [clienteSelectd, setClienteSelectd] = useState({});
  const [enviado, setEnviado] = useState("");
  const [date, setDate] = useState(new Date());
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      name: "ID",
      selector: "id_sales",
      sortable: true,
    },
    {
      name: "Cliente",
      selector: "name",
      sortable: true,
    },
    {
      name: "Valor(R$)",
      selector: "value",
      sortable: true,
    },
    {
      name: "Desconto(%)",
      selector: "desconto",
      sortable: true,
    },
    {
      name: "Tipo de Pagamento",
      selector: "non_payme_type",
      sortable: true,
    },
    {
      name: "Ações",
      cell: (data) => (
        <>
          <Tooltip title="Visualizar Venda">
            <Link
              as={Link}
              to={"/EditProductType/" + data.id_sales}
              className="btn-link-trable btn-link-trable-color-primery"
            >
              <VisibilityIcon />
            </Link>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleDateChange = (date) => {
    setDate(date);
  };

  const clientes = {
    options: clients,
    getOptionLabel: (option) => option.name,
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

  useEffect(() => {
    getClient();
  }, []);

  const getVend = async () => {
    if(clienteSelectd || date){
      setOpen(false);
      try {
        const { data } = await api.post(`${server.url}findAll`, {
          clienteId: clienteSelectd ? clienteSelectd.id : null,
          dateCompra: date ? date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() : null,
        });
        if (data) {
          setSales(data);
        }
      } catch (err) {
        swal("Erro", "Erro as vendas", "error");
      }
    }else{
      setOpen(true);
    }
  };

  useEffect(() => {
    getVend();
  }, []);

  return (
    <>
      <Navbar />
      <div className="content wrapper-product-type">
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4 className="mb-0">Vendas</h4>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                <Collapse in={open}>
                    <Alert
                      severity="warning"
                      action={
                        <IconButton
                          aria-label="close"
                          color="default"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      É preciso selecionar <b>Cliente</b> ou <b>Data da Venda</b>
                    </Alert>
                  </Collapse>
                  <Row>
                    <Col xs={12} md={3}>
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
                    <Col xs={12} md={3}>
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
                          label="Data da Venda"
                          showTodayButton={true}
                          todayLabel="Hoje"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Col>
                    <Col xs={12} md={6}>
                      <Button
                        variant="info"
                        className="float-right mt-4"
                        onClick={getVend}
                      >
                        Buscar
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                  <DataTable
                        columns={columns}
                        data={sales}
                        defaultSortFieldId={1}
                        sortIcon={<FaIcons.FaAngleUp />}
                        noDataComponent="Nenhum Registro Encontrado"
                        pagination
                      />
        
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Link to={"/NewVend"}>
          <Button variant="primary" className="btn-plus edit">
            <FaIcons.FaPlus />
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ListVenda;
