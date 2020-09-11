import React, { useState, useEffect } from "react";
import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";

import axios from "axios";
import { Link, navigate } from "@reach/router";
import variables from "./../../variables";

import TicketList from "./../../components/TicketList/TicketList.js";
import "./PageClient.scss";

const PageClient = (props) => {
  const { code, isAdmin } = props;
  const [clientInfo, setClientInfo] = useState();
  const [clientTickets, setClientTickets] = useState();
  //var clientInfo = "";
  if (!isNaN(code)) {
    console.log(variables.phpfolder + "feed.php?clientgetbyid=" + code);
    axios
      .get(variables.phpfolder + "feed.php?clientgetbyid=" + code)
      .then((response) => {
        navigate("/client/" + response.data.results[0].code);
      });
  }
  useEffect(() => {
    if (!clientInfo && isNaN(code)) {
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
    if (!clientTickets && clientInfo && isNaN(code)) {
      /*console.log(
        variables.phpfolder + "feed.php?listticketsclient=" + clientInfo[0].id
      );
      console.log(clientInfo);*/
      axios
        .get(
          variables.phpfolder + "feed.php?listticketsclient=" + clientInfo[0].id
        )
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
  const AdminButton = (props) => {
    if (isAdmin) {
      return (
        <Link to={"/modifclient/" + code} className="Button">
          Modifier Client
        </Link>
      );
    } else {
      return null;
    }
  };
  if (clientInfo) {
    return (
      <div className="Container PageClient">
        <h1>Client {clientInfo[0].nom}</h1>
        <TicketList tickets={clientTickets} />
        <AdminButton />
        <Link to={"/ticket/" + code + "/create"} className="Button">
          Créer
        </Link>
      </div>
    );
  } else {
    return <div className="Container">Chargement...</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    //currentCateg: state.currentCateg,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setIsAdmin: (key) => dispatch(isAdmin(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageClient);

//export default PageClient;
