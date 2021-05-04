import { UserProvider } from "./contexts/user";
import TabelaUsersComponent from "./components/TabelaUsers";
import UserProfileComponent from "./components/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <UserProvider>
          <Route exact path="/users" component={TabelaUsersComponent} />
          <Route exact path="/user/:id" component={UserProfileComponent}>
            <div>Teste</div>
          </Route>
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
