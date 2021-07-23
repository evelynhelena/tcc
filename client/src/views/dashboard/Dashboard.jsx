import React, {useState,useEffect} from "react";
import CardDashboard from "../../components/CardDashboard/CardDashboard";
import { Container, Row, Col } from "react-bootstrap";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import RemoveIcon from "@material-ui/icons/Remove";
import TwitterIcon from "@material-ui/icons/Twitter";
import CardGraphic from "../../components/CardGraphic/CardGraphic";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import api from "../../services/Api";
import swal from "@sweetalert/with-react";
import "./Dashboard.css";
function Home() {

  const [countUser,setCountUser] = useState([]);
  const getCountUsers = async () => {
    try {
      const { data } = await api.get("http://localhost:3000/countAllUsers");
      if (data) setCountUser(data);
    } catch (err) {
      swal("Erro", "Erro ao carregar os usuários cadastrados", "error");
    }
  };
  useEffect(() => {
    getCountUsers();
  }, []);

  return (
    <div className="dashboard mt-4">
      <Container>
      {console.log(countUser)}
        <Row>
          <Col md={3} className="mb-5">
            <div className="position-relative">
              <CardDashboard
                title="Usuários Cadastrados"
                info={countUser.totalUser}
                color="card-orange"
                icon={<SupervisorAccountIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>

          <Col md={3} className="mb-5">
            <div className="position-relative">
              <CardDashboard
                title="Faturamento do Mês"
                info="R$800,00"
                color="card-green"
                icon={<AttachMoneyIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>

          <Col md={3} className="mb-5">
            <div className="position-relative">
              <CardDashboard
                title="Gastos do Mês"
                info="R$400,00"
                color="card-red"
                icon={<RemoveIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>

          <Col md={3}>
            <div className="position-relative">
              <CardDashboard
                title="Seguidores"
                info="+500"
                color="card-blue"
                icon={<TwitterIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <CardGraphic 
              color="card-graphic-green"
              principalTitle="Faturamento da Semana"
              showIconText={true}
              infoText="Aumento de"
              value="55%"
              typeGraphic="Line"
              series={[0, 20, 15, 8, 10, 20, 45]}
              icon={<ArrowUpwardIcon className="icon-car-graphic" />}
              iconFooter={<AccessTimeIcon className="icon-car-graphic" />}
              textFooter="Atualizado a 5 minutos"
              positivo={true}
            />
          </Col>

          <Col md={4}>
            <CardGraphic 
              color="card-graphic-orange"
              principalTitle="Emails Respondidos"
              infoText="Email respondidos nessa semana"
              value=""
              icon=""
              typeGraphic="Bar"
              series={[0, 18, 9, 8, 15, 10, 22]}
              iconFooter={<AccessTimeIcon className="icon-car-graphic" />}
              textFooter="Atualizado a 2 minutos"
            />
          </Col>

          <Col md={4}>
            <CardGraphic 
              color="card-graphic-red"
              principalTitle="Fiados Quitados"
              infoText="Esse samana teve uma baixa"
              value="23%"
              typeGraphic="Line"
              series={[30, 18, 23, 8, 7, 5, 2]}
              icon={<ArrowDownwardIcon className="icon-car-graphic" />}
              iconFooter={<AccessTimeIcon className="icon-car-graphic" />}
              textFooter="Atualizado a 2 minutos"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
