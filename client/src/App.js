import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/NavBar/Navbar';
import Dashboard from './views/dashboard/Dashboard';
import ListUser from './views/user/ListUser';
import NewUser from './views/user/NewUser';
import Produto from "./views/Produto/Produto";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalenderPage from "./views/Calender/CalenderPage";
import ListProducType from "./views/Produto/ListProducType";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import LoginPage from "./views/LoginPage/LoginPage";

function App() {
  return (
    <Router>
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/Dashboard' exact component={Dashboard} />
            <Route path='/Produto' exact component={ListProducType} />
            <Route path='/NewProductType' exact component={Produto} />
            <Route path='/EditProductType/:id' exact component={Produto} />
            <Route path='/Listuser' component={ListUser} />
            <Route path='/NewUser' component={NewUser} />
            <Route path='/EditUser/:id' component={NewUser} />
            <Route path='/Calendar' component={CalenderPage} />
            <Route path='*' component={ErrorPage} />
          </Switch>
      </Router>
  );
}

export default App;
