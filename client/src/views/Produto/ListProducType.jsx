import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import DataTable from "react-data-table-component";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import swal from "@sweetalert/with-react";
import server from "../../Config/BaseURL";
import api from "../../services/Api";
import currencyFormatter from 'currency-formatter';
import Navbar from "../../components/NavBar/Navbar";
function ListProducType() {
    const [productsType, setProductsType] = useState([]);
    const columns = [
      {
        name: "ID",
        selector: "id_product_type",
        sortable: true,
      },
      {
        name: "Tipo",
        selector: "type",
        sortable: true,
      },
      {
        name: "Data de Validade Obrigatória",
        selector: "dataValitObrigatorio",
        sortable: true,
      },
      {
        name: "Estoque Mínimo",
        selector: "quantity_minima",
        sortable: true,
      },
      {
        name: "Valor(R$)",
        selector: "valueFormt",
        sortable: true,
      },
      {
        name: "Ações",
        cell: (data) => (
          <div className="pl-0">
          <IconButton className="p-1" color="primary" aria-label="add to shopping cart">
            <Link as={Link} to={"/EditUser/" + data.id}>
              <EditIcon />
            </Link>
          </IconButton>
          <IconButton className="p-1" color="primary" aria-label="add to shopping cart">
            <Link as={Link} to={"/EditUser/" + data.id}>
              <AddIcon />
            </Link>
          </IconButton>
        </div>
        ),
      },
    ];

    const getProductType = async () => {
        try {
          const { data } = await api.get(`${server.url}products`);
          if (data) {
            data.forEach(el => {
                el.dataValitObrigatorio = el.ind_isento_data_vality === 1 ? "Sim" : "Não";
                el.valueFormt = currencyFormatter.format(el.value, { code: 'pt-BR', decimal: ',', decimalDigits:2 });
            });
            setProductsType(data)
            console.log(data);
          }
        } catch (err) {
          swal("Erro", "Erro ao inserir o tipo de produto", "error");
        }
        console.log()
      }

      useEffect(() => {
        getProductType();
      }, []);

  return (
    <>
    <Navbar/>
    <div className="content">
        <Container>
            <Row>
              <Col xs={12} md={12}>
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">
                    <h4>Produtos</h4>
                    <Card.Subtitle className="mt-1">
                        Lista de tipos de Produtos
                    </Card.Subtitle>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <DataTable
                    columns={columns}
                    data={productsType}
                    defaultSortFieldId={1}
                    sortIcon={<FaIcons.FaAngleUp />}
                    pagination
                  />
                </Card.Body>
              </Card>
              </Col>
            </Row>
          </Container>
          <Link to={"/NewProductType"}>
            <Button variant="primary" className="btn-plus edit">
              <FaIcons.FaPlus />
            </Button>
          </Link>
    </div>
    </>
  );
}

export default ListProducType;
