import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import ButtonMaterial from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import imgUser from "../../img/ada.jpg";
import "./User.css";

function NewUser() {
  const [usersType, setUsersType] = useState([]);
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

  const getUser = async () => {
    await api.get("http://localhost:3000/users/" + id).then(
      function ({ data }) {
        if (data.length > 0) {
          setName(data[0].name);
          setLastName(data[0].last_name);
          setUserName(data[0].user_name);
          setTypeUser(data[0].type_user);
          setCelPhone(data[0].phone);
        }
      },
      function () {
        swal("Erro", "Erro ao selecionar o usuário", "error");
      }
    );
  };
  useEffect(() => {
    getUser();
  }, []);

  const resetaCampos = () => {
    setName("");
    setLastName("");
    setUserName("");
    setTypeUser("");
    setCelPhone("");
  }

  const insertUser = async (newUser) => {
    try {
      const { data } = await api.post("http://localhost:3000/insert", newUser);
      if (data) {
        if (undefined !== data.error && data.error.erro === 400) {
          swal("Erro", "Usuário já cadastrado no sistema", "error");
        } else {
          swal("Sucesso", "Usuário inserido com sucesso", "success");
          resetaCampos();
        }
      }
    } catch (err) {
      swal("Erro", "Erro ao inserir o usuário", "error");
    }
  };

  const updateUser = async(userEdit) => {
    try{
      const { data } = await api.put("http://localhost:3000/users/"+ id, userEdit);
      if(data){
        if (undefined !== data.error && data.error.erro === 400) {
          swal("Erro", "Usuário já cadastrado no sistema", "error");
        } else {
          swal("Sucesso", "Usuário editado com sucesso", "success");
        }
      }
    }catch (err){
      swal("Erro", "Erro ao editar o usuário", "error");
    }
  }

  const validaCampos = () => {
    if (!name || !lastName || !userName || !celPhone || !typeUser) {
      return false;
    } else {
      let userTypeSelected = usersType.filter(
        (el) => el.type_user === typeUser
      );
      const user = {
        name: name,
        user_name: userName,
        last_name: lastName,
        phone: celPhone,
        user_type: userTypeSelected[0].id,
      };
      return user
    }
  };

  function handleSubmit() {
    let insert = validaCampos();
    if(insert){
      insertUser(insert);
    }else{
      swal("Erro", "Campus vazios não são permitidos", "error");
    }
    
  }

  function update() {
    let update = validaCampos();
    if(update){
      updateUser(update);
    }else{
      swal("Erro", "Campus vazios não são permitidos", "error");
    }
  }

  const handleChange = (event) => {
    setTypeUser(event.target.value);
  };

  return (
    <div className="content">
      <Container>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <h4>{id ? "Editando o " : "Novo"} Usuário {id ? " - " + id : ""}</h4>
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
                        onChange={handleChange}
                      >
                        {usersType.map((userType) => (
                          <MenuItem
                            key={userType.id}
                            value={userType.type_user}
                          >
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
                  onClick={() => (id ? update() : handleSubmit())}
                >
                  {id ? "Editar" : "Salvar"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body className="text-center">
                <Image
                  className="img_avatar"
                  src={imgUser}
                  roundedCircle
                ></Image>
                <Card.Title className="mt-3 title-card-avatar">
                  {userName === "" ? "Usuário" : userName}
                </Card.Title>
                <Card.Text>{name === "" ? "Nome Completo" : name}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-center p-2">
                <input
                  accept="image/*"
                  className="input-file mb-0"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label className="label-upload" htmlFor="contained-button-file">
                  <ButtonMaterial
                    className="btn-upload"
                    variant="outlined"
                    component="span"
                    color="primary"
                  >
                    Upload Foto
                  </ButtonMaterial>
                </label>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewUser;
