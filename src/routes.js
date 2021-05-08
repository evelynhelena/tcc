const express = require("express");
const routes = express.Router();
const UserController = require("./Controller/UserController");

routes.get("/", (req, res) => {
  res.send("Teste");
});

routes.get("/users", UserController.findAll);
routes.get("/findUserType",UserController.findUserType);
routes.post("/insert", UserController.insert);
routes.get("/users/:id", UserController.findById);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
