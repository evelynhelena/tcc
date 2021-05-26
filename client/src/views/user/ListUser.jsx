import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import UserContext from "../../contexts/user";
import { Button, Dropdown, Container, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import "../../css/User.css";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import { Link } from "react-router-dom";
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
      name: "Ações",
      cell: (data) => (
        <div>
          <Dropdown>
            <Dropdown.Toggle className="edit" id="dropdown-basic">
              <FaIcons.FaEllipsisH />
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-1">
              <Dropdown.Item as={Link} to="/NewUser" className="edit">
                <FaIcons.FaPencilAlt /> <span className="pl-2">Editar</span>
              </Dropdown.Item>
              <Dropdown.Item
                className="delete mt-1"
                onClick={() => deleteUser(data.id)}
              >
                <FaIcons.FaBan /> <span className="pl-2">Deletar</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
