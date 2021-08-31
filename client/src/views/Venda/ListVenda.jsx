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
import { ptBR } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./Venda.css";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";

function ListVenda() {
  const [clients, setClients] = useState([]);
  const [clienteSelectd, setClienteSelectd] = useState("");
  const [enviado, setEnviado] = useState("");
  const [date, setDate] = useState(new Date());
  const [sales, setSales] = useState([]);

  const columns = [
    {
      name: "ID",
      selector: "id_sales",
      sortable: true,
    },
    {
      name: "Cliente",
      selector: "user_name",
      sortable: true,
    },
    {
      name: "Valor",
      selector: "value",
      sortable: true,
    },
    {
      name: "Desconto(%)",
      selector: "desconto",
      sortable: true,
    },
    {
      name: "Ações",
      cell: (data) => (
        <>
          <Tooltip title="Editar">
            <Link
              as={Link}
              to={"/EditProductType/" + data.id_sales}
              className="btn-link-trable btn-link-trable-color-simple"
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
    console.log(clienteSelectd);
    try {
      const { data } = await api.post(`${server.url}findAll`, {
        clienteId: 34,
        dateCompra: "2021-08-30",
      });
      if (data) {
        setSales(data);
        console.log(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

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
                          label="Data da Venda*"
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
