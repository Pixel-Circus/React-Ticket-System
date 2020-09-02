import React from "react";
//import logo from './logo.svg';
//import './App.css';
import PageHome from "./containers/PageHome/PageHome";
import PageClient from "./containers/PageClient/PageClient";
import PageUser from "./containers/PageUser/PageUser";
import PageTicket from "./containers/PageTicket/PageTicket";
import PageModifClient from "./containers/PageModifClient/PageModifClient";
import PageModifUser from "./containers/PageModifUser/PageModifUser";

import { Router } from "@reach/router";

import { Provider } from "react-redux";
import store from "./store";

import "./assets/scss/styles.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <PageHome path="/" />
          <PageClient path="/client/:code" />
          <PageUser path="/user/:code" />
          <PageTicket path="/ticket/:ticketid" />
          <PageTicket path="/ticket/:clientcode/:ticketid/" />
          <PageModifClient path="/modifclient/:code" />
          <PageModifUser path="/modifuser/:code" />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
