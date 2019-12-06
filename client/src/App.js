import React, { useEffect } from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/itemModal";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authAction";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    return;
  }, []);
  return (
    <Provider store={store}>
      <div className="App mb-5">
        <AppNavBar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
