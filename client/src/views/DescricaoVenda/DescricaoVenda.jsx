import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import api from "../../services/Api";
import swal from "@sweetalert/with-react";
import server from "../../Config/BaseURL";
import "./DescricaoVenda.css";

function DescricaoVenda() {
  const { id } = useParams();
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  const [sale,setSale] = useState([]);

  const getprodctByIdVend = async () => {
    try {
      const { data } = await api.get(`${server.url}productVend/`+ id, config);
      if (data) {
        console.log(data);
      }
    } catch (err) {
      swal("Erro", "Erro ao resgatar produto selecionado", "error");
    }
  };

  const getVendById = async () => {
    try {
      const { data } = await api.get(`${server.url}venda/`+ id, config);
      if (data) {
        setSale(data[0])
        getprodctByIdVend();
        console.log(data);
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
      <div className="wrapper-descricao-venda">
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Card className="mb-0">
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
                            <strong>Nome:</strong> {sale.name + " "  + sale.last_name}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>CPF:</strong> {sale.cpf}
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>E-mail:</strong> {sale.email}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>Cel:</strong> {sale.phone}
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Rua:</strong> {sale.endereco}
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Cidade:</strong> {sale.cidade}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>Nº:</strong> {sale.numero}
                          </div>
                        </Col>
                        <Col xs={6} md={2}>
                          <div className="font-descricao">
                            <strong>UF:</strong> {sale.uf}
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>CEP:</strong> {sale.cep}
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="font-descricao">
                            <strong>Complemento:</strong> {sale.complemento}
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
              <Card className="mt-2">
                
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
