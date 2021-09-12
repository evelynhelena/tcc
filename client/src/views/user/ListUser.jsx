import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import "../../css/User.css";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import server from "../../Config/BaseURL";
import Navbar from "../../components/NavBar/Navbar";
import Tooltip from "@material-ui/core/Tooltip";
function User() {
  const [users, setUsers] = useState([]);
  const config = {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
  };
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Nome",
      selector: "name",
      sortable: true,
    },
    {
      name: "Telefone",
      selector: "phone",
      sortable: true,
    },
    {
      name: "Tipo de Usuário",
      selector: "type_user",
      sortable: true,
    },
    {
      name: "Ações",
      cell: (data) => (
        <>
          <Tooltip title="Editar">
            <Link
              as={Link}
              to={"/EditUser/" + data.id}
              className="btn-link-trable btn-link-trable-color-simple"
            >
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Deletar">
            <Button
              className="btn-link-trable btn-link-trable-color-danger btn-normal-denger"
              onClick={() => deleteUser(data.id)}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const { data } = await api.get(`${server.url}users`,config);
      if (data) setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = (id) => {
    swal({
      title: "Confermar Alteração !",
      text: "Deseja desativar este usuário",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`${server.url}users/` + id,config).then(function (response) {
          let data = response.data;
          if (data.msg) {
            swal("Usuário deletado com sucesso", {
              icon: "success",
            });
            getUsers();
          } else if (data.error.status === 500) {
            swal("Usuário não cadastrado", {
              icon: "error",
            });
            getUsers();
          } else {
            swal("Erro ao deletar o usuário", {
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      {!users ? (
        <>
          <p>Carregando...</p>
        </>
      ) : (
        <div className="content wrapper-user">
          <Container>
            <Row>
              <Col xs={12} md={12}>
                <Card>
                  <Card.Header>
                    <Card.Title className="mb-0">
                      <h4>Usuários</h4>
                      <Card.Subtitle className="mt-1">
                        Lista de usuários cadastrados
                      </Card.Subtitle>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <DataTable
                      columns={columns}
                      data={users}
                      defaultSortFieldId={1}
                      noDataComponent="Nenhum Registro Encontrado"
                      sortIcon={<FaIcons.FaAngleUp />}
                      pagination
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Link to={"/NewUser"}>
            <Button variant="primary" className="btn-plus edit">
              <FaIcons.FaPlus />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default User;
