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
routes.post('/products', ProdController.insert)
routes.get('/products', ProdController.findAll)


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
routes.put("/event/:id", Calendar.updateEvent);
routes.delete("/event/:id", Calendar.delete);

module.exports = routes;
