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
import EntradaProduto from "./views/EntradaProduto/EntradaProduto";
import ListProduct from "./views/EntradaProduto/ListProduct";
function App() {
  return (
    <Router>
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/Dashboard' exact component={Dashboard} />

            {/* Tipo de produto */}
            <Route path='/Produto' exact component={ListProducType} />
            <Route path='/NewProductType' exact component={Produto} />
            <Route path='/EditProductType/:id' exact component={Produto} />

            {/* Entrada de Prduto */}
            <Route path='/EntradaProduto/:id' exact component={EntradaProduto} />
            <Route path='/ListaProdutos/:id' exact component={ListProduct} />
            <Route path='/ProdutoEstoqueBaixo/:estoqueBaixo' exact component={ListProduct} />
            <Route path='/EditPtoduto/:idProduct' exact component={EntradaProduto} />

            {/* Usuario */}
            <Route path='/Listuser' component={ListUser} />
            <Route path='/NewUser' component={NewUser} />
            <Route path='/EditUser/:id' component={NewUser} />

            {/* Calendario */}
            <Route path='/Calendar' component={CalenderPage} />
            
            {/* Pagina de erro */}
            <Route path='*' component={ErrorPage} />
          </Switch>
      </Router>
  );
}

export default App;
