import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import CardDashboard from "../../components/CardDashboard/CardDashboard";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import RemoveIcon from '@material-ui/icons/Remove';
function DashClient() {
  return (
    <>
      <Navbar />
      <div className="dashboard mt-4 mb-5">
        <Container>
          <Row>
            <Col md={4} className="mb-5">
              <div className="position-relative">
                <CardDashboard
                  title="Valor pago em Agosto"
                  info={'R$ 150,00'}
                  link={`/Listuser`}
                  titleTooltip={"Usuário"}
                  color="card-green"
                  icon={<AttachMoneyIcon className="icon-card" />}
                ></CardDashboard>
              </div>
            </Col>
            <Col md={4} className="mb-5">
              <div className="position-relative">
                <CardDashboard
                  title="Valor pago em Setembro"
                  info={'R$ 50,00'}
                  link={`/Listuser`}
                  titleTooltip={"Usuário"}
                  color="card-green"
                  icon={<AttachMoneyIcon className="icon-card" />}
                ></CardDashboard>
              </div>
            </Col>
            <Col md={4} className="mb-5">
              <div className="position-relative">
                <CardDashboard
                  title="Conta em Aberto"
                  info={'R$ 200,00'}
                  link={`/Listuser`}
                  titleTooltip={"Usuário"}
                  color="card-red"
                  icon={<RemoveIcon className="icon-card" />}
                ></CardDashboard>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DashClient;
