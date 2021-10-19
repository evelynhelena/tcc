import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import currencyFormatter from "currency-formatter";
import * as FaIcons from "react-icons/fa";
import DataTable from "react-data-table-component";
import { Container, Row, Col, Card } from "react-bootstrap";
import api from "../../services/Api";
import swal from "@sweetalert/with-react";
import server from "../../Config/BaseURL";

function DescricaoVendaClient() {
  const { id } = useParams();
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  const [sale, setSale] = useState([]);
  const [products, setProducts] = useState([]);

  const columns = [
    {
      name: "Produto",
      selector: "type",
      sortable: true,
    },
    {
      name: "Preço(R$)",
      selector: "valueFormate",
      sortable: true,
    },
    {
      name: "Quantidade",
      selector: "qauntidade",
      sortable: true,
    },
  ];

  const getprodctByIdVend = async () => {
    try {
      const { data } = await api.get(`${server.url}productVend/` + id, config);
      if (data) {
        data.forEach(
          (el) =>
            (el.valueFormate = currencyFormatter.format(
              el.value * el.qauntidade,
              { code: "pt-BR", decimal: ",", decimalDigits: 2 }
            ))
        );
        setProducts(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

  const getVendById = async () => {
    try {
      const { data } = await api.get(`${server.url}venda/` + id, config);
      if (data) {
        data[0].valueFormate = currencyFormatter.format(data[0].value, {
          code: "pt-BR",
          decimal: ",",
          decimalDigits: 2,
        });
        setSale(data[0]);
        getprodctByIdVend();
      }
    } catch (err) {
      swal("Erro", "Erro ao Resgatar os dados da venda", "error");
    }
  };

  useEffect(() => {
    getVendById();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Card>
          <Card.Body>
            <Row></Row>
            <Row>
              <Col xs={12} md={12} className="pr-5">
                <DataTable
                  columns={columns}
                  data={products}
                  defaultSortFieldId={1}
                  sortIcon={<FaIcons.FaAngleUp />}
                  noDataComponent="Nenhum Registro Encontrado"
                />
                <hr></hr>
              </Col>
            </Row>
            <Row className="bg-secondary p-1">
              <Col xs={12} md={10} className="text-light">
                <span>Total</span>
              </Col>
              <Col xs={12} md={2} className="text-light">
                <span>R${sale.valueFormate}</span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default DescricaoVendaClient;
