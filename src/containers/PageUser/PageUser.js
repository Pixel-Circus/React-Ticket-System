import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import variables from "./../../variables";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";

import TicketList from "./../../components/TicketList/TicketList.js";

const PageUser = (props) => {
  const { setIsAdmin, code } = props;
  const [userInfo, setUserinfo] = useState();
  const [userTickets, setUserTickets] = useState();
  useEffect(() => {
    if (!userInfo) {
      axios
        .get(variables.phpfolder + "feed.php?usercheck=" + code)
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
    if (!userTickets) {
      //console.log(variables.phpfolder + "feed.php?listticketsclient=" + code);
      axios
        .get(variables.phpfolder + "feed.php?listticketsuser=" + code)
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
    console.log(userInfo);
    return (
      <div className="Container">
        <h1>User {userInfo.nom}</h1>
        <TicketList tickets={userTickets} />
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
