import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./App.less";
import "bootstrap/dist/css/bootstrap.min.css";
import configureAppStore from "./store";
import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import { Container } from "reactstrap";

const store = configureAppStore();

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Container fluid className='app'>
          <Header />
          <Homepage />
        </Container>
      </Provider>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
