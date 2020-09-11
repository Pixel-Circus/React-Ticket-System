import React from "react";
//import logo from './logo.svg';
//import './App.css';
import PageHome from "./containers/PageHome/PageHome";
import PageClient from "./containers/PageClient/PageClient";
import PageUser from "./containers/PageUser/PageUser";
import PageTicket from "./containers/PageTicket/PageTicket";
import PageModifClient from "./containers/PageModifClient/PageModifClient";
import PageModifUser from "./containers/PageModifUser/PageModifUser";
import PageOverview from "./containers/PageOverview/PageOverview";
import ModalImages from "./components/ModalImages/ModalImages";

import { Router /*, navigate*/ } from "@reach/router";

import { Provider } from "react-redux";
import store from "./store";

import "./assets/scss/styles.scss";

const NotFound = () => {
  //navigate("/?notfound=1");
  window.location.href = "/?notfound=1";
};

function App() {
  return (
    <Provider store={store}>
      <ModalImages />
      <div className="App">
        <Router>
          <PageHome path="/" />
          <PageClient path="/client/:code" />
          <PageUser path="/user/:code" />
          <PageTicket path="/ticket/:ticketid" />
          <PageTicket path="/ticket/:clientcode/:ticketid/" />
          <PageModifClient path="/modifclient/:code" />
          <PageModifUser path="/modifuser/:code" />
          <PageOverview path="/admin/overview" />
          <NotFound default />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
