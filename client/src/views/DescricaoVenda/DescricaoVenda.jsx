import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import api from "../../services/Api";
import swal from "@sweetalert/with-react";
import server from "../../Config/BaseURL";
import "./DescricaoVenda.css";

function DescricaoVenda() {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return (
    <>
      <Navbar />
      <div className="wrapper-descricao-venda">
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Card>
                {/*<Card.Header>
                  <Card.Title className="mb-0">
                    <Row>
                      <Col xs={10} md={10}>
                        <h5 className="mb-0">
                          Descrição de Venda - Evelyn Helena Soares Dos Santos
                        </h5>
                      </Col>
                      <Col xs={2} md={2}>
                        <h5 className="text-right mb-0">#Venda - 25</h5>
                      </Col>
                    </Row>
                  </Card.Title>
                </Card.Header>*/}
                <Card.Body>
                  <Row>
                    <Col xs={12} md={12}>
                      <Row>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Nome:</strong> Evelyn Helena Soares Dos
                            Santos
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>CPF:</strong> 469.314.988-86
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>E-mail:</strong> Evelyn.Helena1@gmail.com
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>Cel:</strong> (11)97652-7775
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Rua:</strong> Rua Santa Ana
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Cidade:</strong> Embu das Artes
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>Nº:</strong> 151
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>UF:</strong> SP
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>CEP:</strong> 06835-510
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Complemento:</strong> casa 2
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h5 className="mb-0">Produtos</h5>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row></Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DescricaoVenda;
