import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FaceIcon from "@material-ui/icons/Face";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import api from "../../services/Api";
import server from "../../Config/BaseURL";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import "./LoginPage.css";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeUser, setTypeUser] = useState("");
  const usersType = [
    { id: 1, type_user: "Funcionário" },
    { id: 2, type_user: "Cliente" },
  ];
  let history = useHistory();

  const validaCampos = () => {
    console.log(typeUser);
    let loginObject = {
      login: login,
      password: password,
      typeUser: typeUser,
    };
    for (var [key, value] of Object.entries(loginObject)) {
      if (null === value || value.length === 0 || undefined === value) {
        return false;
      }
    }
    return loginObject;
  };
  const handleSubmit = async () => {
    setEnviado(true);
    if (validaCampos()) {
      try {
        const { data } = await api.post(`${server.url}login`, validaCampos());
        if (data) {
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("idUser", data.idUser);
            history.push("/Dashboard");
          }
        }
      } catch (err) {
        setOpen(true);
      }
    }
  };

  const resetValues = () => {
    setEnviado(false);
    setOpen(false);
  };

  const viewForgot = () => {
    setForgotPassword(true);
    resetValues();
  };
  const handleChange = (event) => {
    setTypeUser(event.target.value);
  };
  const forgotPasswordFunction = async () => {
    setEnviado(true);
    if (email.length > 0) {
      try {
        const { data } = await api.post(`${server.url}reset`, {
          userEmail: email,
        });

        if (data) {
          setForgotPassword(false);
          swal(
            "Sucesso",
            "Uma nova senha foi enviado no seu E-mail",
            "success"
          );
          setEnviado(false);
        }
      } catch (err) {
        swal("Erro", "E-Mail não cadastrado", "error");
        setEnviado(false);
      }
    }
  };

  return (
    <>
      <div
        className="content d-flex align-items-center wrapper-login background-login-page"
        style={{ height: "100vh" }}
      >
        <Container className="d-flex justify-content-center">
          <div className="width-card-login">
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">
                  <h4 className="mb-0">
                    {!forgotPassword ? "Login" : "Redefinir Senha"}
                  </h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    className="mb-2"
                    action={
                      <IconButton
                        aria-label="close"
                        color="secondary"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    <strong>Usuário</strong> ou <strong>Senha</strong>{" "}
                    Incorretos
                  </Alert>
                </Collapse>
                {!forgotPassword ? (
                  <>
                    <Row className="mt-2">
                      <Col xs={12} md={12}>
                        <TextField
                          id="userType"
                          select
                          label="Tipo de usuário*"
                          error={typeUser.length === 0 && enviado}
                          value={typeUser}
                          onChange={handleChange}
                          variant="standard"
                          className="col-md-12"
                        >
                          {usersType.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.type_user}
                            </MenuItem>
                          ))}
                        </TextField>
                        {typeUser.length === 0 && enviado ? (
                          <VerifyInputs value="Tipo de usuário"></VerifyInputs>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col md={12}>
                        <FormControl className="w-100">
                          <InputLabel htmlFor="login">Login*</InputLabel>
                          <Input
                            id="login"
                            value={login}
                            error={login.length === 0 && enviado}
                            onChange={({ target }) => setLogin(target.value)}
                            startAdornment={
                              <InputAdornment position="start">
                                <FaceIcon />
                              </InputAdornment>
                            }
                          />
                          {login.length === 0 && enviado ? (
                            <VerifyInputs value="Login"></VerifyInputs>
                          ) : (
                            ""
                          )}
                        </FormControl>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col md={12}>
                        <FormControl className="w-100">
                          <InputLabel htmlFor="password">Senha*</InputLabel>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            error={password.length === 0 && enviado}
                            onChange={({ target }) => setPassword(target.value)}
                            startAdornment={
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            }
                          />
                          {password.length === 0 && enviado ? (
                            <VerifyInputs value="Senha"></VerifyInputs>
                          ) : (
                            ""
                          )}
                        </FormControl>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Row className="mt-2">
                    <Col md={12}>
                      <FormControl className="w-100">
                        <InputLabel htmlFor="Email">Email</InputLabel>
                        <Input
                          id="Email"
                          type="email"
                          value={email}
                          error={email.length === 0 && enviado}
                          onChange={({ target }) => setEmail(target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          }
                        />
                        {email.length === 0 && enviado ? (
                          <VerifyInputs value="E-Mail"></VerifyInputs>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Col>
                  </Row>
                )}
                {!forgotPassword ? (
                  <div className="pt-2 text-right" style={{ fontSize: 12 }}>
                    <Link to="" onClick={viewForgot}>
                      Esqueci a Senha
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                <Button
                  className="w-100 mt-3"
                  color="secondary"
                  onClick={() =>
                    !forgotPassword ? handleSubmit() : forgotPasswordFunction()
                  }
                >
                  {!forgotPassword ? "Entrar" : "Enviar"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
