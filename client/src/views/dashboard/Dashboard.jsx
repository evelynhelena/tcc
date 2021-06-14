import React from 'react';
import CardDashboard from '../../components/CardDashboard/CardDashboard';
import { Container, Row, Col } from 'react-bootstrap';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RemoveIcon from '@material-ui/icons/Remove';
import TwitterIcon from '@material-ui/icons/Twitter';
function Home() {
  return (
    <div className="dashboard mt-4">
      <Container>

        <Row>
          <Col md={3}>
            <div className="position-relative">
              <CardDashboard 
              title="Usuários Cadastrados" 
              info="50"
              color="card-orange" 
              icon={<SupervisorAccountIcon className="icon-card"/>}>
              
              </CardDashboard>
            </div>
          </Col>

          <Col md={3}>
            <div className="position-relative">
              <CardDashboard 
              title="Faturamento do Mês" 
              info="R$800,00" 
              color="card-green"
              icon={<AttachMoneyIcon className="icon-card"/>}>

              </CardDashboard>
            </div>
          </Col>

          <Col md={3}>
            <div className="position-relative">
              <CardDashboard 
              title="Gastos do Mês" 
              info="R$400,00" 
              color="card-red"
              icon={<RemoveIcon className="icon-card"/>}>

              </CardDashboard>
            </div>
          </Col>

             <Col md={3}>
            <div className="position-relative">
              <CardDashboard 
              title="Seguidores" 
              info="+500" 
              color="card-blue"
              icon={<TwitterIcon className="icon-card"/>}>

              </CardDashboard>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
   
  );
}

export default Home;