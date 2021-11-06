import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
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
import jwt_decode from "jwt-decode";
import DashClient from "./views/DashClient/DashClient";
import DescricaoVendaClient from "./views/DescricaoVendaClient/DescricaoVendaClient";
import HistoryCompra from "./views/HistoryCompra/HistoryCompra";
function CustomRoute({isPrivaty,isAdmin, ...rest}){
  if(isPrivaty && ("null" === localStorage.getItem('token') || !localStorage.getItem('token'))){
    return  <Redirect to="/"></Redirect>
  }else if("null" !== localStorage.getItem('token') && isAdmin){
    let decodeToken = jwt_decode(localStorage.getItem('token'));
    if(parseInt(decodeToken.infoUser.typeUser) !== 1){
      return  <Redirect to="/"></Redirect>
    }else{
      return <Route {...rest}></Route>
    }
  }else{
    return <Route {...rest}></Route>
  }
}
function App() {
  return (
    <Router>
      <Switch>
        <CustomRoute path='/' exact component={LoginPage} />
        <CustomRoute isPrivaty isAdmin path='/Dashboard' exact component={Dashboard} />
        <CustomRoute isPrivaty path='/PainelControle' exact component={DashClient} />

        {/* Tipo de produto */}
        <CustomRoute isPrivaty isAdmin path='/Produto' exact component={ListProducType} />
        <CustomRoute isPrivaty isAdmin path='/NewProductType' exact component={Produto} />
        <CustomRoute isPrivaty isAdmin path='/EditProductType/:id' exact component={Produto} />

        {/*Venda*/}
        <CustomRoute isPrivaty isAdmin path='/NewVend' exact component={Venda} />
        <CustomRoute isPrivaty isAdmin path='/ListVenda' exact component={ListVenda} />
        <CustomRoute isPrivaty isAdmin path='/DescricaoVenda/:id' exact component={DescricaoVenda} />

        {/* Entrada de Prduto */}
        <CustomRoute isPrivaty isAdmin path='/EntradaProduto/:id' exact component={EntradaProduto} />
        <CustomRoute isPrivaty isAdmin path='/ListaProdutos/:id' exact component={ListProduct} />
        <CustomRoute isPrivaty isAdmin path='/ProdutoEstoqueBaixo/:estoqueBaixo' exact component={ListProduct} />
        <CustomRoute isPrivaty isAdmin path='/EditPtoduto/:idProduct' exact component={EntradaProduto} />

        {/* Usuario */}
        <CustomRoute isPrivaty isAdmin path='/Listuser' component={ListUser} />
        <CustomRoute isPrivaty isAdmin path='/NewUser' component={NewUser} />
        <CustomRoute isPrivaty path='/EditUser/:id' component={NewUser} />

        {/* Calendario */}
        <CustomRoute isPrivaty isAdmin path='/Calendar' component={CalenderPage} />
        
        {/*Cliente */}
        <CustomRoute isPrivaty path='/DescricaoCompra/:id' component={DescricaoVendaClient} />
        <CustomRoute isPrivaty path='/HistoryCompra' component={HistoryCompra} />

        {/* Pagina de erro */}
        <CustomRoute isPrivaty path='*' component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
