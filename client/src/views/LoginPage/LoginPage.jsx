import React,{useState} from 'react';
import { useHistory  } from "react-router-dom";
import {Container,Card, Row,Col } from "react-bootstrap";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import VerifyInputs from "../../components/VerifyInputs/VerifyInputs";
import api from "../../services/Api";
import server from "../../Config/BaseURL";
import swal from "@sweetalert/with-react";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import "./LoginPage.css";

  
function LoginPage(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [open,setOpen] = useState(false);
    let history = useHistory();
   const validaCampos  = () =>{
    let loginObject = {
        login : login,
        password: password,
    }
    for (var [key, value] of Object.entries(loginObject)) {
        if (null === value || value.length === 0 || undefined === value){
            return false;
        }
      }
    return loginObject;
   }
    const handleSubmit = async () =>{
        setEnviado(true)
        if(validaCampos()){
          try {
            const { data } = await api.post(`${server.url}login`,validaCampos());
            if (data) {
              if(data.token){
                localStorage.setItem('token', data.token);
                history.push("/Dashboard")
              }
            }
          } catch (err) {
            setOpen(true);
          }
        }
    }

    return (
        <>
        <div className="content d-flex align-items-center wrapper-login background-login-page" 
        style={{height: "100vh"}}>
        <Container className="d-flex justify-content-center">
          <div  className="width-card-login">
          <Card>
              <Card.Header>
                <Card.Title className="mb-0">
                  <h4 className="mb-0">Login</h4>
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
                      <strong>Usuário</strong> ou <strong>Senha</strong> Incorretos
                    </Alert>
                  </Collapse>
                <Row className="mt-2">
                    <Col md={12}>
                        <FormControl className="w-100"> 
                            <InputLabel htmlFor="login">Login</InputLabel>
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
                <Row className="mt-5">
                    <Col md={12}>
                    <FormControl className="w-100"> 
                    <InputLabel htmlFor="password">Senha</InputLabel>
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
                  <Button  className="w-100 mt-5" color="secondary" onClick={handleSubmit}>Entrar</Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
      </>
    );
}

export default LoginPage;
