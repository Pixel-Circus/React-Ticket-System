import React, { useState } from "react";

//import Input from './../../components/UI/Input/Input'
import { navigate } from "@reach/router";
import axios from "axios";
import variables from "./../../variables";
import { useTranslation } from "react-i18next";

import "./PageHome.scss";
import i18n from "../../i18n";

const PageHome = () => {
  const { t /*, i18n*/ } = useTranslation();
  const [clientcode, setClientCode] = useState("");
  const [hasError, setHasError] = useState(() => {
    if (window.location.href.indexOf("codenotfound") !== -1) {
      return 1;
    } else if (window.location.href.indexOf("errorcreation") !== -1) {
      return 2;
    } else if (window.location.href.indexOf("notfound") !== -1) {
      return 3;
    } else if (window.location.href.indexOf("cantaccess") !== -1) {
      return 4;
    }
  });
  const redirectToClient = (event) => {
    //console.log("test");
    //var clientcode = document.getElementById('clientcode').val();
    if (clientcode) {
      //console.log(variables.phpfolder + "feed.php?clientcheck=" + clientcode);
      axios
        .get(variables.phpfolder + "feed.php?clientcheck=" + clientcode)
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("No client");
            setHasError(1);
          } else {
            //console.log("test");
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
    } else if (hasError === 3) {
      return <div className="notice is-error">404 - Page introuvable</div>;
    } else if (hasError === 4) {
      return (
        <div className="notice is-error">
          403 - Vous n'avez pas accès à cette page
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  //if(window.location.href.indexOf('codenotfound') != -1);

  return (
    <div className="Container PageHome">
      <h1>{t("Système de Tickets Pixel Circus")}</h1>
      <ErrorMessage />
      <form onSubmit={redirectToClient}>
        <input
          type="text"
          id="clientcode"
          onChange={inputChangedHandler}
          placeholder={t("Votre Code Client")}
        />
        <input type="submit" value={t("Soumettre")} />
      </form>
      <div
        className="Button"
        onClick={() => {
          if (i18n.language === "fr") {
            i18n.changeLanguage("en");
          } else {
            i18n.changeLanguage("fr");
          }
        }}
        style={{
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        {t("Changer la langue")}
      </div>
    </div>
  );
};

export default PageHome;
