import React, { useContext } from "react";
import UserContext from "../../contexts/user";
import * as bootstrap from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import "../../css/User.css";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import ModalInsertUser from "../modais/UserInsert";
import { Router, Route, Link } from "react-router-dom";
function User() {
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
        <div className="content">
          <bootstrap.Container>
            <bootstrap.Row>
              <bootstrap.Col xs={12} md={12}>
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
                    <bootstrap.Table responsive="md" className="text-center">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Nome</th>
                          <th>Nome de Usuário</th>
                          <th>Telefone</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>
                              <button className="btn btn-table edit">
                                <FaIcons.FaPencilAlt />
                              </button>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="btn btn-table delete btn-danger"
                              >
                                <FaIcons.FaBan />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </bootstrap.Table>
                  </div>
                </div>
              </bootstrap.Col>
            </bootstrap.Row>
          </bootstrap.Container>
          <Link to={"/NewUser"}>
            <bootstrap.Button variant="primary" className="btn-plus edit">
              <FaIcons.FaPlus />
            </bootstrap.Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default User;
