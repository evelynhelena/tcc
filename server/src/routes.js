const express = require("express");
const routes = express.Router();
const UserController = require("./Controller/User/UserController");
import ProdController from './Controller/Products/ProdController'
import Dashboard from './Controller/Dashboard/Dashboard';
import Calendar from './Controller/Calendar/Calendar';

routes.get("/", (req, res) => {
  res.send("Teste");
});

// ROTAS PRODUCTS
routes.get('/products', ProdController.findAll)
routes.get('/products/:id', ProdController.findOne)
routes.post('/products/insert', ProdController.insert)
routes.put('/products/update/:id', ProdController.update)
routes.delete('/products/delete/:id', ProdController.delete)

// ROTAS USERS
routes.get("/users", UserController.findAll);
routes.get("/findUserType",UserController.findUserType);
routes.post("/insert", UserController.insert);
routes.get("/users/:id", UserController.findById);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

// Rotas Dashboard
routes.get("/countAllUsers", Dashboard.countAllUsers);

//Rotas Calendar
routes.get("/inportanceTasks", Calendar.getInportanteTasks);
routes.get("/event", Calendar.getEventsCalendar);
routes.post("/event", Calendar.insertEvent);

module.exports = routes;
