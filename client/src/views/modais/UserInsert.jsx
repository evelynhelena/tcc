import React, { useState } from "react";
import * as bootstrap from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import api from "../../services/Api";
function ModalInsertUser() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [usersType, setUsersType] = useState([]);



  const getUsersType = async () => {
    try {
      const { data } = await api.get("http://localhost:3000/findUserType");
      if (data)  setUsersType(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!usersType ? (
        <>
          <p>Carregando...</p>
        </>
      ) : (
        <>
        {console.log(usersType)}
          <bootstrap.Button
            variant="primary"
            className="btn-plus edit"
            onClick={function(){
                handleShow();
                getUsersType();
            }}
          >
            <FaIcons.FaPlus />
          </bootstrap.Button>
          <bootstrap.Modal show={show} onHide={handleClose} size="lg">
            <bootstrap.Modal.Header closeButton className="modal-header">
              <bootstrap.Modal.Title>
                Inserir novo Usuário
              </bootstrap.Modal.Title>
            </bootstrap.Modal.Header>
            <bootstrap.Modal.Body>
              <bootstrap.Form>
                <bootstrap.Row>
                  <bootstrap.Col xs={6} md={6}>
                    <bootstrap.Form.Group controlId="name">
                      <bootstrap.Form.Label>Nome</bootstrap.Form.Label>
                      <bootstrap.Form.Control type="text" placeholder="Nome" />
                    </bootstrap.Form.Group>
                  </bootstrap.Col>

                  <bootstrap.Col xs={6} md={6}>
                    <bootstrap.Form.Group controlId="lastName">
                      <bootstrap.Form.Label>Sobrenome</bootstrap.Form.Label>
                      <bootstrap.Form.Control
                        type="text"
                        placeholder="Sobrenome"
                      />
                    </bootstrap.Form.Group>
                  </bootstrap.Col>
                </bootstrap.Row>

                <bootstrap.Row>
                  <bootstrap.Col xs={6} md={6}>
                    <bootstrap.Form.Group controlId="userName">
                      <bootstrap.Form.Label>
                        Nome de Usuário
                      </bootstrap.Form.Label>
                      <bootstrap.Form.Control type="text" placeholder="Nome" />
                    </bootstrap.Form.Group>
                  </bootstrap.Col>

                  <bootstrap.Col xs={6} md={6}>
                    <bootstrap.Form.Group controlId="phone">
                      <bootstrap.Form.Label>Celular</bootstrap.Form.Label>
                      <bootstrap.Form.Control
                        type="text"
                        placeholder="Celular"
                      />
                    </bootstrap.Form.Group>
                  </bootstrap.Col>
                </bootstrap.Row>

                <bootstrap.Form.Group controlId="example.Form.ControlSelect1">
                  <bootstrap.Form.Label>Tipo de Usuário</bootstrap.Form.Label>
                  <bootstrap.Form.Control as="select">
                  <option>Selecionar</option>
                  {usersType.map((userType) => (
                    <option kwy={userType.id}>{userType.type_user}</option>
                  ))}
                  </bootstrap.Form.Control>
                </bootstrap.Form.Group>
              </bootstrap.Form>
            </bootstrap.Modal.Body>
            <bootstrap.Modal.Footer>
              <bootstrap.Button variant="secondary" onClick={handleClose}>
                Cancelar
              </bootstrap.Button>
              <bootstrap.Button variant="info" onClick={handleClose}>
                Salvar
              </bootstrap.Button>
            </bootstrap.Modal.Footer>
          </bootstrap.Modal>
        </>
      )}
    </>
  );
}

export default ModalInsertUser;
