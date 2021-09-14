const express = require("express");
const routes = express.Router();
const UserController = require("./Controller/User/UserController");
import ProdController from './Controller/Products/ProdController'
import Dashboard from './Controller/Dashboard/Dashboard';
import Calendar from './Controller/Calendar/Calendar';
import EntradaProduto from './Controller/EntradaProduto/EntradaProduto';
import Login from './Controller/Login/Login';
import Venda from "./Controller/Venda/Venda";
import {verifyJWT} from "./middlewares/jwt";
routes.get("/", (req, res) => {
  res.send("Teste");
});

//ROTAS Login
routes.post('/login', Login.getUser);

// ROTAS Tipos Produto
routes.post('/productsType',verifyJWT,ProdController.insert);
routes.get('/productsType', verifyJWT,ProdController.findAll);
routes.get('/productsType/:id', verifyJWT,ProdController.findById);
routes.get('/prodCadastrado', verifyJWT,ProdController.validaProdCadastrado);
routes.put('/productsType/:id', verifyJWT,ProdController.update);
routes.put('/productsTypeReability/:id', verifyJWT,ProdController.reability);
routes.delete('/productsType/:id', verifyJWT,ProdController.delete);

// ROTAS Entrada Produto
routes.post("/entradaProduto", verifyJWT,EntradaProduto.insert);
routes.get("/entradaProduto", verifyJWT,EntradaProduto.findAll);
routes.get("/findById/:id", verifyJWT,EntradaProduto.findById);
routes.get("/entradaProduto/:id", verifyJWT,EntradaProduto.findByIdPrductType);
routes.put("/entradaProduto/:id", verifyJWT,EntradaProduto.update);
routes.delete("/entradaProduto/:id", verifyJWT,EntradaProduto.delete);

//ROTAS Venda
routes.post("/venda",verifyJWT,Venda.insert);
routes.post("/findAll",verifyJWT,Venda.findAll);
routes.get("/paymentType",verifyJWT,Venda.getPaymentType);
routes.put("/baixaPayme/:id",verifyJWT,Venda.baixaPayme);
routes.delete("/venda/:id",verifyJWT,Venda.delete);

// ROTAS Usuarios
routes.get("/users", verifyJWT,UserController.findAll);
routes.get("/clients", verifyJWT,UserController.findAllClient);
routes.get("/findUserType",verifyJWT,UserController.findUserType);
routes.post("/insert", verifyJWT,UserController.insert);
routes.get("/users/:id", verifyJWT,UserController.findById);
routes.put("/users/:id", verifyJWT,UserController.update);
routes.delete("/users/:id", verifyJWT,UserController.delete);

// Rotas Dashboard
routes.get("/countAllUsers",verifyJWT,Dashboard.countAllUsers);
routes.get("/countProductsEstoqueBaixo", verifyJWT,Dashboard.countProductsEstoqueBaixo);
routes.get("/getProductsEstoqueBaixo", verifyJWT,Dashboard.getProductsEstoqueBaixo);

//Rotas Calendar
routes.get("/inportanceTasks", verifyJWT,Calendar.getInportanteTasks);
routes.get("/event", verifyJWT,Calendar.getEventsCalendar);
routes.post("/event", verifyJWT,Calendar.insertEvent);
routes.put("/event/:id", verifyJWT,Calendar.updateEvent);
routes.delete("/event/:id", verifyJWT,Calendar.delete);

module.exports = routes;
