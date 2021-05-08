const express = require("express");
const routes = express.Router();
const UserController = require("./Controller/User/UserController");
import ProdController from './Controller/Products/ProdController'

routes.get("/", (req, res) => {
  res.send("Teste");
});

// ROTAS PRODUCTS
routes.get('/products', ProdController.findAll)
routes.get('/products/:id', ProdController.findOne)
routes.post('/products/insert', ProdController.insert)
routes.put('/products/update/:id', ProdController.update)

// ROTAS USERS
routes.get("/users", UserController.findAll);
routes.post("/insert", UserController.insert);
routes.get("/users/:id", UserController.findById);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
