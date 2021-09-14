import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import { UserProvider } from "./contexts/user";
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
import Venda from "./views/Venda/Venda";
import ListVenda from "./views/Venda/ListVenda";
import DescricaoVenda from "./views/DescricaoVenda/DescricaoVenda";
function CustomRoute({isPrivaty, ...rest}){
  if(isPrivaty && ("null" === localStorage.getItem('token') || !localStorage.getItem('token'))){
    return  <Redirect to="/"></Redirect>
  }else{
    return <Route {...rest}></Route>
  }
}
function App() {
  return (
    <Router>
          <Switch>
            <CustomRoute path='/' exact component={LoginPage} />
            <CustomRoute isPrivaty path='/Dashboard' exact component={Dashboard} />

            {/* Tipo de produto */}
            <CustomRoute isPrivaty path='/Produto' exact component={ListProducType} />
            <CustomRoute isPrivaty path='/NewProductType' exact component={Produto} />
            <CustomRoute isPrivaty path='/EditProductType/:id' exact component={Produto} />

            {/*Venda*/}
            <CustomRoute isPrivaty path='/NewVend' exact component={Venda} />
            <CustomRoute isPrivaty path='/ListVenda' exact component={ListVenda} />
            <CustomRoute isPrivaty path='/DescricaoVenda/:id' exact component={DescricaoVenda} />

            {/* Entrada de Prduto */}
            <CustomRoute isPrivaty path='/EntradaProduto/:id' exact component={EntradaProduto} />
            <CustomRoute isPrivaty path='/ListaProdutos/:id' exact component={ListProduct} />
            <CustomRoute isPrivaty path='/ProdutoEstoqueBaixo/:estoqueBaixo' exact component={ListProduct} />
            <CustomRoute isPrivaty path='/EditPtoduto/:idProduct' exact component={EntradaProduto} />

            {/* Usuario */}
            <CustomRoute isPrivaty path='/Listuser' component={ListUser} />
            <CustomRoute isPrivaty path='/NewUser' component={NewUser} />
            <CustomRoute isPrivaty path='/EditUser/:id' component={NewUser} />

            {/* Calendario */}
            <CustomRoute isPrivaty path='/Calendar' component={CalenderPage} />
            
            {/* Pagina de erro */}
            <CustomRoute isPrivaty path='*' component={ErrorPage} />
          </Switch>
      </Router>
  );
}

export default App;
