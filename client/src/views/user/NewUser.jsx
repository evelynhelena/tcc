import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
function NewUser() {
  const [usersType, setUsersType] = useState([]);
  const [user, setUser] = useState([]);

  //values input
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [celPhone, setCelPhone] = useState("");
  const [typeUser, setTypeUser] = useState("");

  const { id } = useParams();
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

  const getUser = async (id) => {
    try {
      const { data } = await api.get("http://localhost:3000/users/" + id);
      if (data) setUser(data);
      if (user.length > 0) {
        console.log(user);
      }
    } catch {
      swal("Erro", "Erro ao selecionar o usuário", "error");
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      getUser(id);
    }
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
          swal("Erro", "Erro ao enviar inserir o usuário", "error");
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
                <form noValidate autoComplete="off">
                  <Row>
                    <Col xs={6} md={6}>
                      <TextField
                        id="name"
                        label="Nome"
                        value={name}
                        className="col-md-12"
                        onChange={({ target }) => setName(target.value)}
                      />
                    </Col>
                    <Col xs={6} md={6}>
                      <TextField
                        id="lastName"
                        label="Sobrenome"
                        value={lastName}
                        className="col-md-12"
                        onChange={({ target }) => setLastName(target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={6} md={6}>
                      <TextField
                        id="userName"
                        label="Nome de Usuário"
                        value={userName}
                        className="col-md-12"
                        onChange={({ target }) => setUserName(target.value)}
                      />
                    </Col>
                    <Col xs={6} md={6}>
                      <TextField
                        id="phone"
                        label="Celular"
                        value={celPhone}
                        className="col-md-12"
                        onChange={({ target }) => setCelPhone(target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                  <Col xs={12} md={12}>
                    <TextField
                        id="userType"
                        select
                        label="Tipo de usuário"
                        value={typeUser}
                        className="col-md-12"
                        onChange={({ target }) => setTypeUser(target.value)}
  
                      >
                        {usersType.map((userType) => (
                          <MenuItem key={userType.id} value={userType.type_user}>
                            {userType.type_user}
                          </MenuItem>
                        ))}
                      </TextField>
                  </Col>
                  </Row>
                </form>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="info"
                  className="float-right"
                  onClick={handleSubmit}
                >
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
