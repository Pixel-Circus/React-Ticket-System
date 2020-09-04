import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios";
import variables from "./../../variables";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";

import UserList from "./../../components/UserList/UserList.js";
import TicketListBySeparator from "./../../components/TicketListBySeparator/TicketListBySeparator.js";

import "./PageOverview.scss";

const PageOverview = (props) => {
  const { isAdmin } = props;
  const [listClients, setListClients] = useState("");
  const [listUsers, setListUsers] = useState("");
  const [listTicketsByClients, setTicketsByClients] = useState();
  const [listTicketsByUser, setTicketsByUser] = useState();
  const [timer, setTimer] = useState(60);
  if (!isAdmin) {
    navigate("/?cantaccess=1");
  }

  //TIMER
  useEffect(() => {
    setTimeout(() => {
      if (timer === 0) {
        setTimer(60);
        setListClients("");
        setListUsers("");
        setTicketsByClients("");
        setTicketsByUser("");
      } else {
        setTimer(timer - 1);
      }
    }, 1000);
  }, [timer]);

  //LIST CLIENTS
  useEffect(() => {
    if (!listClients) {
      //console.log(variables.phpfolder + "feed.php?fetch_clients=1");
      axios
        .get(variables.phpfolder + "feed.php?fetch_clients=1")
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("Clients Query Crashed");
          } else {
            //console.log(response.data.results);
            setListClients(response.data.results);
          }
        })
        .catch((error) => {
          console.log("Clients Query Crashed");
          console.log(error);
        });
    }
  }, [listClients]);

  //LIST USERS
  useEffect(() => {
    if (!listUsers) {
      axios
        .get(variables.phpfolder + "feed.php?fetch_all_users=1")
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("Clients Query Crashed");
          } else {
            setListUsers(response.data.results);
          }
        })
        .catch((error) => {
          console.log("Clients Query Crashed");
          console.log(error);
        });
    }
  }, [listUsers]);

  //LIST Tickets per client
  useEffect(() => {
    if (!listTicketsByClients) {
      axios
        .get(variables.phpfolder + "feed.php?fetch_tickets_by_clients=1")
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("Clients Query Crashed");
          } else {
            setTicketsByClients(response.data.results);
          }
        })
        .catch((error) => {
          console.log("Clients Query Crashed");
          console.log(error);
        });
    }
  }, [listTicketsByClients]);

  //LIST Tickets per assigné
  useEffect(() => {
    if (!listTicketsByUser) {
      //console.log(variables.phpfolder + "feed.php?fetch_tickets_by_assignee=1");
      axios
        .get(variables.phpfolder + "feed.php?fetch_tickets_by_assignee=1")
        .then((response) => {
          //console.log(response.data.noresults);
          if (response.data.noresults) {
            console.log("Clients Query Crashed");
          } else {
            //console.log(response.data.results);
            setTicketsByUser(response.data.results);
          }
        })
        .catch((error) => {
          console.log("Clients Query Crashed");
          console.log(error);
        });
    }
  }, [listTicketsByUser]);
  return (
    <div class="PageOverview">
      <div className="Refresh">Prochaine Update: {timer}s</div>
      <div class="Flex">
        <div className="Clients">
          <h2>Clients</h2>
          <TicketListBySeparator
            splitter="client"
            list={listTicketsByClients}
          />
        </div>
        <div className="Users">
          <h2>Users</h2>
          <TicketListBySeparator splitter="assigne" list={listTicketsByUser} />
        </div>
        <div className="Lists">
          <div>
            <h2>Clients</h2>
            <UserList users={listClients} type="client" />
            <Link to="/modifclient/create/" className="Button">
              Créer
            </Link>
          </div>
          <div>
            <h2>Users</h2>
            <UserList users={listUsers} type="user" />
            <Link to="/modifuser/create/" className="Button">
              Créer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

//export default PageOverview;
const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    //currentCateg: state.currentCateg,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setIsAdmin: (key) => dispatch(isAdmin(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageOverview);
