import React, { useState, useEffect } from "react";

import axios from "axios";
import variables from "./../../variables";
import Input from "./../../components/UI/Input/Input";

const PageTicket = (props) => {
  const { ticketid } = props;
  const [ticketInfo, setTicketInfo] = useState();
  useEffect(() => {
    if (!ticketInfo) {
      axios
        .get(variables.phpfolder + "feed.php?getticketinfo=" + ticketid)
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("No client");
            window.location = "/?ticketnotfound=" + ticketid;
          } else {
            setTicketInfo(response.data.results[0]);
            //console.log("test");
            //window.location = "/client/" + code;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //console.log("effect");
  }, [ticketInfo, ticketid]);
  if (ticketInfo) {
    //console.log("rerender");
    return (
      <div className="Container">
        <h1>Modification du ticket {ticketid}</h1>
        <form>
          <Input
            elementType="input"
            label="Titre"
            value={ticketInfo.titre}
            placeholder="Titre"
            changed={(e) => {
              //console.log("x " + ticketInfo.titre);
              ticketInfo.titre = e.target.value;
              setTicketInfo(ticketInfo);
            }}
          />
        </form>
      </div>
    );
  } else {
    return <div className="Container">Chargement...</div>;
  }
};

export default PageTicket;
