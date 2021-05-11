import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import api from "../../services/Api";

function ModalInsertUser(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [usersType, setUsersType] = useState([]);

  const getUsersType = async () => {
    try {
      const { data } = await api.get("http://localhost:3000/findUserType");
      if (data) setUsersType(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className="btn-plus edit"
        onClick={function () {
          handleShow();
          getUsersType();
        }}
      >
        <FaIcons.FaPlus />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Inserir novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={6} md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Nome" />
                </Form.Group>
              </Col>

              <Col xs={6} md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control type="text" placeholder="Sobrenome" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={6}>
                <Form.Group controlId="userName">
                  <Form.Label>Nome de Usuário</Form.Label>
                  <Form.Control type="text" placeholder="Nome" />
                </Form.Group>
              </Col>

              <Col xs={6} md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control type="text" placeholder="Celular" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="example.Form.ControlSelect1">
              <Form.Label>Tipo de Usuário</Form.Label>
              <Form.Control as="select">
                <option>Selecionar</option>
                {usersType.map((userType) => (
                  <option key={userType.id}>{userType.type_user}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="info" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalInsertUser;
