import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import UserContext from "../../contexts/user";
import { Button, Container, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import "../../css/User.css";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
function User() {
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

  const { users } = useContext(UserContext);
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
          .delete("http://localhost:3000/users/" + id)
          .then(function (response) {
            let data = response.data;
            if (data.msg) {
              swal("Usuário deletado com sucesso", {
                icon: "success",
              }).then(() => window.location.reload());
            } else if (data.error.status === 500) {
              swal("Usuário não cadastrado", {
                icon: "error",
              }).then(() => window.location.reload());
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
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      <h4>Usuários</h4>
                      <p className="card-category">
                        {" "}
                        Lista de Usuários cadastrados
                      </p>
                    </div>
                  </div>
                  <div className="card-body">
                    <DataTable
                      title="Usuários"
                      columns={columns}
                      data={users}
                      defaultSortFieldId={1}
                      sortIcon={<FaIcons.FaAngleUp />}
                      pagination
                    />
                  </div>
                </div>
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
