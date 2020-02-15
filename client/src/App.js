import React, { useEffect } from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/itemModal";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authAction";
import { getItems } from "./actions/itemActions";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemDetail from "./components/ItemDetail/ItemDetail";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getItems());
    return;
  }, []);

  return (
    <Provider store={store}>
      <div className="App mb-5">
        <AppNavBar />
        <Router>
          <Switch>
            <Route exact path="/item/:name/:id" component={ItemDetail} />
            <Route path="*">
              <Container>
                <ItemModal />
                <ShoppingList />
              </Container>
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
