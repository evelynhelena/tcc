const express = require("express");
const routes = express.Router();
const UserController = require("./Controller/User/UserController");
const ProdController = require("./Controller/Products/ProdController");

routes.get("/", (req, res) => {
  res.send("Teste");
});

routes.post('/products/insert', ProdController.default.insert)

routes.get("/users", UserController.findAll);
routes.post("/insert", UserController.insert);
routes.get("/users/:id", UserController.findById);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
