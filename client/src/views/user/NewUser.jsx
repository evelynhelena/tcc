import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image,Form } from "react-bootstrap";
import clsx from "clsx";
import ButtonMaterial from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import swal from "@sweetalert/with-react";
import api from "../../services/Api";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import imgUser from "../../img/ada.jpg";
import InputMask from "react-input-mask";
import "./User.css";
import Subtitle from "../../components/Subtitle/Subtitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

function NewUser() {
  const classes = useStyles();
  const [usersType, setUsersType] = useState([]);
  //values input
  //Dados Pessoais
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [celPhone, setCelPhone] = useState("");
  const [typeUser, setTypeUser] = useState("");

  //Enderoço
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [uf, setUf] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");

  const { id } = useParams();
  //</variable>

  //<functions>
  const getUsersType = async () => {
    try {
      const { data } = await api.get("http://localhost:3000/findUserType");
      if (data) setUsersType(data);
    } catch (err) {
      swal("Erro", "Erro ao selecionar os tipos de usuários", "error");
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
          setSenha(data[0].senha);
          setEmail(data[0].email);
          setCpf(data[0].cpf);

          setEndereco(data[0].endereco);
          setCidade(data[0].cidade);
          setCep(data[0].cep);
          setNumero(data[0].numero);
          setUf(data[0].uf);
          setBairro(data[0].bairro);
          setComplemento(data[0].complemento ? data[0].complemento : "");
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
    setSenha("");
    setEmail("");
    setCpf("");

    setEndereco("");
    setCidade("");
    setCep("");
    setNumero("");
    setUf("");
    setBairro("");
    setComplemento("");
  };

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

  const updateUser = async (userEdit) => {
    try {
      const { data } = await api.put(
        "http://localhost:3000/users/" + id,
        userEdit
      );
      if (data) {
        if (undefined !== data.error && data.error.erro === 400) {
          swal("Erro", "Usuário já cadastrado no sistema", "error");
        } else {
          swal("Sucesso", "Usuário editado com sucesso", "success");
        }
      }
    } catch (err) {
      swal("Erro", "Erro ao editar o usuário", "error");
    }
  };

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
        email: email,
        cpf: cpf,
        endereco: endereco,
        cidade: cidade,
        cep: cep,
        numero: numero,
        uf: uf,
        bairro: bairro,
        imagem: "",
        senha: senha,
        complemento: complemento ? complemento : "",
      };
      return user;
    }
  };

  function handleSubmit() {
    let insert = validaCampos();
    if (insert) {
      insertUser(insert);
    } else {
      swal("Erro", "Campus vazios não são permitidos", "error");
    }
  }

  function update() {
    let update = validaCampos();
    if (update) {
      updateUser(update);
    } else {
      swal("Erro", "Campus vazios não são permitidos", "error");
    }
  }

  const handleChange = (event) => {
    setTypeUser(event.target.value);
  };

  const getCep = async (cep) => {
    if (cep.length === 9) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro) {
            swal("Erro", "CEP Não Encontrado", "error");
          } else {
            setEndereco(data.logradouro);
            setCidade(data.localidade);
            setUf(data.uf);
            setBairro(data.bairro);
          }
        });
    } else {
      swal("Erro", "CEP Inválido", "error");
    }
  };

  return (
    <div className="content">
      <Container>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">
                  <h4 className="mb-0">
                    {id ? "Editando o " : "Novo"} Usuário {id ? " - " + id : ""}
                  </h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Subtitle title="Dados de Login"></Subtitle>
                <Form noValidate autoComplete="off">
                  <Row className="mt-3">
                    <Col xs={12} md={6}>
                      <TextField
                        id="name"
                        label="Nome*"
                        value={name}
                        className="col-md-12"
                        onChange={({ target }) => setName(target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        id="lastName"
                        label="Sobrenome*"
                        value={lastName}
                        className="col-md-12"
                        onChange={({ target }) => setLastName(target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="userName"
                        label="Nome de Usuário*"
                        value={userName}
                        className="col-md-12"
                        onChange={({ target }) => setUserName(target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        id="senha"
                        type="password"
                        label="Senha*"
                        value={senha}
                        className="col-md-12"
                        onChange={({ target }) => setSenha(target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="email"
                        label="E-mail*"
                        type="email"
                        value={email}
                        className="col-md-12"
                        onChange={({ target }) => setEmail(target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <InputMask
                        mask="(99)99999-9999"
                        value={celPhone}
                        onChange={({ target }) => setCelPhone(target.value)}
                      >
                        {() => (
                          <TextField
                            id="phone"
                            label="Celular*"
                            value={celPhone}
                            className="col-md-12"
                          />
                        )}
                      </InputMask>
                    </Col>
                  </Row>
                  <Row className="mt-4 mb-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="userType"
                        select
                        label="Tipo de usuário*"
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
                    <Col xs={12} md={6}>
                      <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={({ target }) => setCpf(target.value)}
                      >
                        {() => (
                          <TextField
                            id="cpf"
                            label="CPF*"
                            value={cpf}
                            className="col-md-12"
                          />
                        )}
                      </InputMask>
                    </Col>
                  </Row>
                  <hr></hr>

                  <Subtitle title="Dados de Endereço"></Subtitle>
                  <Row className="mt-3">
                    <Col xs={12} md={4}>
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                      >
                        <InputLabel htmlFor="cep">CEP*</InputLabel>
                        <InputMask
                          mask="99999-999"
                          value={cep}
                          onChange={({ target }) => setCep(target.value)}
                        >
                          {() => (
                            <Input
                              id="cep"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={() => getCep(cep)}>
                                    <SearchIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          )}
                        </InputMask>
                      </FormControl>
                    </Col>

                    <Col xs={12} md={8}>
                      <TextField
                        id="endereco"
                        label="Rua / Avenida*"
                        value={endereco}
                        className="col-md-12"
                        onChange={({ target }) => setEndereco(target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={12} md={4}>
                      <TextField
                        id="cidade"
                        label="Cidade*"
                        value={cidade}
                        className="col-md-12"
                        onChange={({ target }) => setCidade(target.value)}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <TextField
                        id="uf"
                        label="Nº*"
                        value={numero}
                        className="col-md-12"
                        onChange={({ target }) => setNumero(target.value)}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <TextField
                        id="uf"
                        label="UF*"
                        value={uf}
                        className="col-md-12"
                        onChange={({ target }) => setUf(target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="bairro"
                        label="Bairro*"
                        value={bairro}
                        className="col-md-12"
                        onChange={({ target }) => setBairro(target.value)}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        id="complemento"
                        label="Complemento"
                        value={complemento}
                        className="col-md-12"
                        onChange={({ target }) => setComplemento(target.value)}
                      />
                    </Col>
                  </Row>
                </Form>
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
