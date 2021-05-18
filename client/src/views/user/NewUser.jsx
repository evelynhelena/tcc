import React, { useState,useEffect } from "react";
import { Container, Row, Col, Form,Card,Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
function NewUser() {
  const [usersType, setUsersType] = useState([]);

  //values input
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [celPhone, setCelPhone] = useState("");
  const [typeUser, setTypeUser] = useState("");
  //</variable>

  //<functions>
  const getUsersType = async () => {
    try {
      const { data } = await api.get("http://localhost:3000/findUserType");
      if (data) setUsersType(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsersType();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !lastName || !userName || !celPhone || !typeUser) {
      swal("Erro", "Campus vazios não são permitidos", "error");
    } else {
      let userTypeSelected = usersType.filter(
        (el) => el.type_user === typeUser
      );
      const newUser = {
        name: name,
        user_name: userName,
        last_name: lastName,
        phone: celPhone,
        user_type: userTypeSelected[0].id,
      };
      const insertUser = async () => {
        try {
          const { data } = await api.post(
            "http://localhost:3000/insert",
            newUser
          );
          if (data) {
            if (undefined !== data.error && data.error.erro === 400) {
              swal("Erro", "Usuário já cadastrado no sistema", "error");
            } else {
              swal("Sucesso", "Usuário inserido com sucesso", "success");
            }
          }
        } catch (err) {
          swal("Erro", "Erro ao enviar ao servidor", "error");
        }
      };
      insertUser();
    }
  }

  return (
    <div className="content">
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <h4>Novo Usuários</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col xs={6} md={6}>
                      <Form.Group controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nome"
                          value={name}
                          onChange={({ target }) => setName(target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={6} md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Sobrenome"
                          value={lastName}
                          onChange={({ target }) => setLastName(target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={6} md={6}>
                      <Form.Group controlId="userName">
                        <Form.Label>Nome de Usuário</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nome"
                          value={userName}
                          onChange={({ target }) => setUserName(target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={6} md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Celular"
                          value={celPhone}
                          onChange={({ target }) => setCelPhone(target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="example.Form.ControlSelect1">
                    <Form.Label>Tipo de Usuário</Form.Label>
                    <Form.Control
                      as="select"
                      value={typeUser}
                      onChange={({ target }) => setTypeUser(target.value)}
                    >
                      <option>Selecionar</option>
                      {usersType.map((userType) => (
                        <option key={userType.id}>{userType.type_user}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button variant="info" className="float-right" onClick={handleSubmit}>
                  Salvar
                </Button>
              </Card.Footer>
            </Card>
          </Col>

          {/*<Col xs={4} md={4}>
            <Card>
              <Card.Body>

              </Card.Body>
            </Card>
          </Col>*/}
        </Row>
      </Container>
    </div>
  );
}

export default NewUser;
