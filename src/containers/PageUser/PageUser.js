import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios";
import variables from "./../../variables";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";

import TicketList from "./../../components/TicketList/TicketList.js";

import "./PageUser.scss";

const PageUser = (props) => {
  const { setIsAdmin, code } = props;
  const [userInfo, setUserinfo] = useState();
  const [userTickets, setUserTickets] = useState();
  if (!isNaN(code)) {
    console.log(variables.phpfolder + "feed.php?clientgetbyid=" + code);
    axios
      .get(variables.phpfolder + "feed.php?usergetbyid=" + code)
      .then((response) => {
        navigate("/user/" + response.data.results[0].code);
      });
  }
  useEffect(() => {
    if (!userInfo && isNaN(code)) {
      axios
        .get(variables.phpfolder + "feed.php?need_active=1&usercheck=" + code)
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("No User");
            navigate("/?usercodenotfound=" + code);
          } else {
            setIsAdmin(true);
            setUserinfo(response.data.results[0]);
            //console.log("test");
            //window.location = "/client/" + code;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setIsAdmin, code, userInfo]);
  useEffect(() => {
    if (!userTickets && userInfo && isNaN(code)) {
      //console.log(variables.phpfolder + "feed.php?listticketsclient=" + code);
      console.log(userInfo);
      axios
        .get(variables.phpfolder + "feed.php?listticketsuser=" + userInfo.id)
        .then((response) => {
          setUserTickets(response.data.results);
          //console.log(response.data.results);
          //window.location = "/client/" + code;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userTickets, userInfo, code]);
  if (userInfo) {
    //console.log(userInfo);
    return (
      <div className="PageUser">
        <div className="Container">
          <h1>User {userInfo.nom}</h1>
          <TicketList tickets={userTickets} />
          <Link to={"/admin/overview"} className="Button">
            Mode Overview
          </Link>
          <Link to={"/modifuser/" + code} className="Button">
            Modifier Compte
          </Link>
          <Link to={"/ticket/create"} className="Button">
            Créer Ticket
          </Link>
        </div>
      </div>
    );
  } else {
    return <div className="Container">Chargement...</div>;
  }
};

//export default PageUser;
const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    //currentCateg: state.currentCateg,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setIsAdmin: (key) => dispatch(isAdmin(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageUser);
