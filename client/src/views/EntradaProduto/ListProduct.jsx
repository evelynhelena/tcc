import React, { useState, useEffect}  from 'react'
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
  } from "react-bootstrap";
import DataTable from "react-data-table-component";
import * as FaIcons from "react-icons/fa";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Navbar from "../../components/NavBar/Navbar";
import Tooltip from "@material-ui/core/Tooltip";
import server from "../../Config/BaseURL";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import currencyFormatter from "currency-formatter";
import dateFormat from "dateformat";

function ListProduct() {
    const { id } = useParams();
    const [products,setProducts] = useState([]);
    const [typeProducts,setTypeProducts] = useState([]);
    const columns = [
        {
          name: "ID",
          selector: "id_product",
          sortable: true,
        },
        {
          name: "Data de Validade",
          selector: "data_validy",
          sortable: true,
        },
        {
            name: "Qauntidade",
            selector: "quantity",
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
            <>
              <Tooltip title="Editar">
                <Link
                  as={Link}
                  to={"/EditProductType/" + data.id_product_type}
                  className="btn-link-trable btn-link-trable-color-simple"
                >
                  <EditIcon />
                </Link>
              </Tooltip>
              <Tooltip title="Deletar">
                <Button
                className="btn-link-trable btn-link-trable-color-danger btn-normal-denger"
                onClick={() => deleteProduct(data.id_product)}
                >
                <DeleteIcon />
                </Button>
             </Tooltip>
            </>
          ),
        },
      ];



    const getProduc = async () => {
        try {
          const { data } = await api.get(`${server.url}entradaProduto/${id}`);
          if (data) {
            setTypeProducts(data[0] ? data[0].type : "");
            data.forEach((el) => {
                
              el.data_validy = el.data_validy ? dateFormat(el.data_validy, "dd/mm/yyyy") : "-"
              el.valueFormt = currencyFormatter.format(el.value, {
                code: "pt-BR",
                decimal: ",",
                decimalDigits: 2,
              });
            });
            setProducts(data);
          }
        } catch (err) {
          swal("Erro", "Erro ao listar os Prdutos", "error");
        }
      };

    useEffect(() => {
        getProduc();
    }, []);

    const deleteProduct = async (id) =>{
        console.log(id);
    }

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
                    <h4>Prdutos</h4>
                    <Card.Subtitle className="mt-1">
                    {typeProducts ? "Lista de Prdutos do Tipo - " + typeProducts : "Nnehum produtos cadastrado"}
                    </Card.Subtitle>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                <DataTable
                    columns={columns}
                    data={products}
                    defaultSortFieldId={1}
                    sortIcon={<FaIcons.FaAngleUp />}
                    pagination
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Container>
          </div>
        </>
    )
}

export default ListProduct
