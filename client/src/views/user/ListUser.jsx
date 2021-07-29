import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Container, Row, Col,Card } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import "../../css/User.css";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import server from "../../Config/BaseURL";
function User() {
  const [users, setUsers] = useState([]);
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
        <div className="pl-0">
        <IconButton className="p-1" color="primary" aria-label="add to shopping cart">
          <Link as={Link} to={"/EditUser/" + data.id}>
            <EditIcon />
          </Link>
        </IconButton>
        <IconButton className="p-1" onClick={() => deleteUser(data.id)} color="secondary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const { data } = await api.get(`${server.url}users`);
      if (data) setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = function (id) {
    swal({
      title: "Confermar Alteração !",
      text: "Deseja desativar este usuário",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${server.url}users/` + id)
          .then(function (response) {
            let data = response.data;
            if (data.msg) {
              swal("Usuário deletado com sucesso", {
                icon: "success",
              });
              getUsers();
            } else if (data.error.status === 500) {
              swal("Usuário não cadastrado", {
                icon: "error",
              })
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
