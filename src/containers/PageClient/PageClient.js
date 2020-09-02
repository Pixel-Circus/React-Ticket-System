import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link, navigate } from "@reach/router";
import variables from "./../../variables";

import TicketList from "./../../components/TicketList/TicketList.js";
import "./PageClient.scss";

const PageClient = (props) => {
  const { code } = props;
  const [clientInfo, setClientInfo] = useState();
  const [clientTickets, setClientTickets] = useState();
  //var clientInfo = "";
  useEffect(() => {
    if (!clientInfo) {
      axios
        .get(variables.phpfolder + "feed.php?clientcheck=" + code)
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("No client");
            navigate("/?codenotfound=" + code);
          } else {
            setClientInfo(response.data.results);
            //console.log("test");
            //window.location = "/client/" + code;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [clientInfo, code]);
  useEffect(() => {
    if (!clientTickets) {
      //console.log(variables.phpfolder + "feed.php?listticketsclient=" + code);
      axios
        .get(variables.phpfolder + "feed.php?listticketsclient=" + code)
        .then((response) => {
          setClientTickets(response.data.results);
          //console.log(response.data.results);
          //window.location = "/client/" + code;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [clientTickets, clientInfo, code]);
  //console.log(clientInfo);

  if (clientInfo) {
    return (
      <div className="Container PageClient">
        <h1>Client {clientInfo[0].nom}</h1>
        <TicketList tickets={clientTickets} />
        <Link to={"/ticket/" + code + "/create"} className="Button">
          Créer
        </Link>
      </div>
    );
  } else {
    return <div className="Container">Chargement...</div>;
  }
};

export default PageClient;
