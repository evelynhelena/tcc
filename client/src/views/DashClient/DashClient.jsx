import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import CardDashboard from "../../components/CardDashboard/CardDashboard";
import DataTable from "react-data-table-component";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import RemoveIcon from "@material-ui/icons/Remove";
import server from "../../Config/BaseURL";
import Tooltip from "@material-ui/core/Tooltip";
import api from "../../services/Api";
import swal from "@sweetalert/with-react";
import currencyFormatter from "currency-formatter";
import VisibilityIcon from "@material-ui/icons/Visibility";
function DashClient() {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  const [lessPayme, setLesPayme] = useState(0);
  const [paymeOpen, setPaymeOpen] = useState(0);
  const [purchases, setPurchases] = useState([]);

  const id = localStorage.getItem("idUser");

  const columns = [
    {
      name: "ID",
      selector: "id_sales",
      sortable: true,
    },
    {
      name: "Valor(R$)",
      selector: "valueFormt",
      sortable: true,
    },
    {
      name: "Data Compra",
      selector: "dateFormat",
      sortable: true,
    },
    {
      name: "Ações",
      cell: (data) => (
        <>
          <Tooltip title="Visualizar Compra">
            <Link
              as={Link}
              to={"/DescricaoCompra/" + data.id_sales}
              className="btn-link-trable btn-link-trable-color-primery"
            >
              <VisibilityIcon />
            </Link>
          </Tooltip>
        </>
      ),
    },
  ];

  const getCountPayme = async () => {
    try {
      const { data } = await api.get(`${server.url}countPayme/${id}`, config);
      setLesPayme(
        currencyFormatter.format(data.pagos, {
          code: "pt-BR",
          decimal: ",",
          decimalDigits: 2,
        })
      );
      setPaymeOpen(
        currencyFormatter.format(data.emAberto, {
          code: "pt-BR",
          decimal: ",",
          decimalDigits: 2,
        })
      );
    } catch (err) {
      swal("Erro", "Erro ao enviar ao servidor", "error");
    }
  };

  const getAllOpenPurchases = async () => {
    try {
      const { data } = await api.post(
        `${server.url}findAllSales`,
        { id: id, paymeOpen: true },
        config
      );
      data.forEach((el) => {
        el.valueFormt = currencyFormatter.format(el.value, {code: "pt-BR",decimal: ",",decimalDigits: 2,});
        el.dateFormat = new Date(el.date_compra).toLocaleDateString();
        }
      )
      setPurchases(data);
    } catch (err) {
      swal("Erro", "Erro resgatar as compras", "error");
    }
  };

  useEffect(() => {
    getCountPayme();
  }, []);

  useEffect(() => {
    getAllOpenPurchases();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard mt-4 mb-5">
        <Container>
          <Row>
            <Col md={6} className="mb-5">
              <div className="position-relative">
                <CardDashboard
                  title="Último valor pago"
                  info={`R$ ${lessPayme}`}
                  link={`/Listuser`}
                  titleTooltip={"Usuário"}
                  color="card-green"
                  icon={<AttachMoneyIcon className="icon-card" />}
                ></CardDashboard>
              </div>
            </Col>
            <Col md={6} className="mb-5">
              <div className="position-relative">
                <CardDashboard
                  title="Conta em Aberto"
                  info={`R$ ${paymeOpen}`}
                  link={`/Listuser`}
                  titleTooltip={"Usuário"}
                  color="card-red"
                  icon={<RemoveIcon className="icon-card" />}
                ></CardDashboard>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4 className="mb-0">Compras em Aberto</h4>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <DataTable
                      columns={columns}
                      data={purchases}
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
      </div>
    </>
  );
}

export default DashClient;
