import { UserProvider } from "./contexts/user";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/NavBar/Navbar';
import Dashboard from './views/dashboard/Dashboard';
import ListUser from './views/user/ListUser';
import NewUser from './views/user/NewUser';
import Product from './views/product/Product';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <UserProvider>
            <Route path='/Listuser' component={ListUser} />
            <Route path='/NewUser/:id' component={NewUser} />
          </UserProvider>
          <Route path='/product' component={Product} />
        </Switch>
      </Router>
  );
}

export default App;
