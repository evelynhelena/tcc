import React, {useState,useEffect} from "react";
import CardDashboard from "../../components/CardDashboard/CardDashboard";
import { Container, Row, Col } from "react-bootstrap";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TwitterIcon from "@material-ui/icons/Twitter";
import RemoveIcon from '@material-ui/icons/Remove';
import CardGraphic from "../../components/CardGraphic/CardGraphic";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CalendarComponent from "../../components/Calendar/Calendar";
import api from "../../services/Api";
import swal from "@sweetalert/with-react";
import "./Dashboard.css";
import server from "../../Config/BaseURL";
import Navbar from "../../components/NavBar/Navbar";
function Home() {
  const [countUser,setCountUser] = useState([]);
  const [productEstoqueBaixo,setProductEstoqueBaixo] = useState([]);
  const getCountUsers = async () => {
    try {
      const { data } = await api.get(`${server.url}countAllUsers`);
      if (data) setCountUser(data);
    } catch (err) {
      swal("Erro", "Erro ao carregar os usuários cadastrados", "error");
    }
  };
  useEffect(() => {
    getCountUsers();
  }, []);


  const getCountProductEstoqueBaixo= async () => {
    try {
      const { data } = await api.get(`${server.url}countProductsEstoqueBaixo`);
      if (data) setProductEstoqueBaixo(data);
    } catch (err) {
      swal("Erro", "Erro ao carregar os usuários cadastrados", "error");
    }
  };
  useEffect(() => {
    getCountProductEstoqueBaixo();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="dashboard mt-4 mb-5">
      <Container>

        <Row>
          <Col md={3} className="mb-5">
            <div className="position-relative">
              <CardDashboard
                title="Usuários Cadastrados"
                info={countUser.totalUser}
                link={`/Listuser`}
                titleTooltip={"Usuário"}
                color="card-orange"
                icon={<SupervisorAccountIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>

          <Col md={3} className="mb-5">
            <div className="position-relative">
              <CardDashboard
                title="Estoque Baixo"
                link={`/ProdutoEstoqueBaixo/${true}`}
                info={productEstoqueBaixo.totalProduct}
                titleTooltip="Produtos com estoque baixo"
                color="card-blue"
                icon={<ShoppingCartIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>
          <Col md={3} className="mb-5">
            <div className="position-relative">
              <CardDashboard
                title="Faturamento (R$)"
                info="800,00"
                link={`/Listuser`}
                titleTooltip="Faturamento do Dia"
                color="card-green"
                icon={<AttachMoneyIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>
          <Col md={3}>
            <div className="position-relative">
              <CardDashboard
                titleTooltip="Fiados do Dia"
                link={`/Listuser`}
                title="Fiados do Dia (R$)"
                info="-200,00"
                color="card-red"
                icon={<RemoveIcon className="icon-card" />}
              ></CardDashboard>
            </div>
          </Col>
        </Row>
        <div className="mt-4">
          <CalendarComponent></CalendarComponent>
        </div>
        {/*<Row className="mt-3">
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
        </Row>*/}
      </Container>
    </div>
    </>
  );
}

export default Home;
