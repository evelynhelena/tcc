import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
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
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import server from "../../Config/BaseURL";

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

  const [enviado, setEnviado] = useState(false);
  const { id } = useParams();

  //</variable>

  //<functions>
  const getUsersType = async () => {
    try {
      const { data } = await api.get(`${server.url}findUserType`);
      if (data) setUsersType(data);
    } catch (err) {
      swal("Erro", "Erro ao selecionar os tipos de usuários", "error");
    }
  };
  useEffect(() => {
    getUsersType();
  }, []);
  const getUser = async () => {
    await api.get(`${server.url}users/` + id).then(
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
    setEnviado(false);
  };

  const insertUser = async (newUser) => {
    try {
      const { data } = await api.post(`${server.url}insert/`, newUser);
      if (data) {
        if (undefined !== data.error && data.error.erro === 400) {
          swal("Erro", "Usuário já cadastrado no sistema", "error");
        } else if (undefined !== data.error && data.error.erro === 401) {
          swal("Erro", "Campo de senha vazio", "error");
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
      const { data } = await api.put(`${server.url}users/` + id,userEdit);
      if (data) {
        if (undefined !== data.error && data.error.erro === 400) {
          swal("Erro", "Usuário já cadastrado no sistema", "error");
        } else if (undefined !== data.error && data.error.erro === 401) {
          swal("Erro", "Campo de senha vazio", "error");
        } else {
          swal("Sucesso", "Usuário editado com sucesso", "success");
          setEnviado(false);
        }
      }
    } catch (err) {
      swal("Erro", "Erro ao editar o usuário", "error");
    }
  };

  const validaCampos = () => {
    let allInsert = true;
    const user = {
      name: name,
      user_name: userName,
      last_name: lastName,
      phone: celPhone,
      user_type: typeUser,
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

    for (var [key, value] of Object.entries(user)) {
      if (
        (null === value || value.length === 0 || undefined === value) &&
        key !== "imagem" &&
        key !== "complemento"
      ) {
        allInsert = false;
      }
    }
    if (allInsert) {
      let userTypeSelected = usersType.filter(
        (el) => el.type_user === typeUser
      );
      user.user_type = userTypeSelected[0].id;
      return user;
    } else {
      return false;
    }
  };

  function handleSubmit() {
    let insert = validaCampos();
    setEnviado(true);
    if (insert) {
      insertUser(insert);
    }
  }

  function update() {
    let update = validaCampos();
    setEnviado(true);
    if (update) {
      updateUser(update);
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
                        error={name.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setName(target.value)}
                      />
                      {name.length === 0 && enviado ? (
                        <VerifyInputs value="Nome"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        id="lastName"
                        label="Sobrenome*"
                        value={lastName}
                        error={lastName.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setLastName(target.value)}
                      />
                      {lastName.length === 0 && enviado ? (
                        <VerifyInputs value="Sobrenome"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="userName"
                        label="Nome de Usuário*"
                        value={userName}
                        error={userName.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setUserName(target.value)}
                      />
                      {userName.length === 0 && enviado ? (
                        <VerifyInputs value="Nome de Usuário"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        id="senha"
                        type="password"
                        label="Senha*"
                        value={senha}
                        error={senha.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setSenha(target.value)}
                      />
                      {senha.length === 0 && enviado ? (
                        <VerifyInputs value="Senha"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="email"
                        label="E-mail*"
                        type="email"
                        value={email}
                        error={email.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setEmail(target.value)}
                      />
                      {email.length === 0 && enviado ? (
                        <VerifyInputs value="E-mail"></VerifyInputs>
                      ) : (
                        ""
                      )}
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
                            error={celPhone.length === 0 && enviado}
                            className="col-md-12"
                          />
                        )}
                      </InputMask>
                      {celPhone.length === 0 && enviado ? (
                        <VerifyInputs value="Celular"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4 mb-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="userType"
                        select
                        label="Tipo de usuário*"
                        value={typeUser}
                        error={typeUser.length === 0 && enviado}
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
                      {typeUser.length === 0 && enviado ? (
                        <VerifyInputs value="Tipo de usuário"></VerifyInputs>
                      ) : (
                        ""
                      )}
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
                            error={cpf.length === 0 && enviado}
                            value={cpf}
                            className="col-md-12"
                          />
                        )}
                      </InputMask>
                      {cpf.length === 0 && enviado ? (
                        <VerifyInputs value="CPF"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <hr></hr>

                  <Subtitle title="Dados de Endereço"></Subtitle>
                  <Row className="mt-3">
                    <Col xs={12} md={4}>
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                      >
                        <InputLabel
                          htmlFor="cep"
                          error={cep.length === 0 && enviado}
                        >
                          CEP*
                        </InputLabel>
                        <InputMask
                          mask="99999-999"
                          value={cep}
                          onChange={({ target }) => setCep(target.value)}
                        >
                          {() => (
                            <Input
                              id="cep"
                              error={cep.length === 0 && enviado}
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
                      {cep.length === 0 && enviado ? (
                        <VerifyInputs value="CEP"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>

                    <Col xs={12} md={8}>
                      <TextField
                        id="endereco"
                        label="Rua / Avenida*"
                        value={endereco}
                        error={endereco.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setEndereco(target.value)}
                      />
                      {endereco.length === 0 && enviado ? (
                        <VerifyInputs value="Endereço"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={12} md={4}>
                      <TextField
                        id="cidade"
                        label="Cidade*"
                        value={cidade}
                        error={cidade.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setCidade(target.value)}
                      />
                      {cidade.length === 0 && enviado ? (
                        <VerifyInputs value="Cidade"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col xs={12} md={4}>
                      <TextField
                        id="uf"
                        label="Nº*"
                        value={numero}
                        error={numero.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setNumero(target.value)}
                      />
                      {numero.length === 0 && enviado ? (
                        <VerifyInputs value="Nº"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col xs={12} md={4}>
                      <TextField
                        id="uf"
                        label="UF*"
                        value={uf}
                        error={uf.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setUf(target.value)}
                      />
                      {uf.length === 0 && enviado ? (
                        <VerifyInputs value="UF"></VerifyInputs>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12} md={6}>
                      <TextField
                        id="bairro"
                        label="Bairro*"
                        value={bairro}
                        error={bairro.length === 0 && enviado}
                        className="col-md-12"
                        onChange={({ target }) => setBairro(target.value)}
                      />
                      {bairro.length === 0 && enviado ? (
                        <VerifyInputs value="Bairro"></VerifyInputs>
                      ) : (
                        ""
                      )}
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
                  <Row className="mt-4">
                    <Col xs={12} md={12}>
                      <p className="mb-0 font-footer-info">(*) Campus Obrigatórios</p>
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
