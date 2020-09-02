import React, { useState } from "react";

//import Input from './../../components/UI/Input/Input'
import { navigate } from "@reach/router";
import axios from "axios";
import variables from "./../../variables";

import "./PageHome.scss";

const PageHome = () => {
  const [clientcode, setClientCode] = useState("");
  const [hasError, setHasError] = useState(() => {
    if (window.location.href.indexOf("codenotfound") !== -1) {
      return 1;
    } else if (window.location.href.indexOf("errorcreation") !== -1) {
      return 2;
    }
  });
  const redirectToClient = (event) => {
    console.log("test");
    //var clientcode = document.getElementById('clientcode').val();
    if (clientcode) {
      console.log(variables.phpfolder + "feed.php?clientcheck=" + clientcode);
      axios
        .get(variables.phpfolder + "feed.php?clientcheck=" + clientcode)
        .then((response) => {
          console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("No client");
            setHasError(1);
          } else {
            console.log("test");
            navigate("/client/" + clientcode);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    event.preventDefault();
    return false;
  };
  const inputChangedHandler = (event) => {
    //console.log(event.target.value);
    setClientCode(event.target.value);
  };
  const ErrorMessage = () => {
    if (hasError === 1) {
      return <div className="notice is-error">Ce code client n'existe pas</div>;
    } else if (hasError === 2) {
      return (
        <div className="notice is-error">
          Impossible de créer un ticket sans code client.
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  //if(window.location.href.indexOf('codenotfound') != -1);

  return (
    <div className="Container PageHome">
      <h1>Système de Tickets Pixel&nbsp;Circus</h1>
      <ErrorMessage />
      <form onSubmit={redirectToClient}>
        <input
          type="text"
          id="clientcode"
          onChange={inputChangedHandler}
          placeholder="Votre Code Client"
        />
        <input type="submit" value="Soumettre" />
      </form>
    </div>
  );
};

export default PageHome;
