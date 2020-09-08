import React from "react";
import { Link } from "@reach/router";
//import TicketListItem from "./../TicketListItem/TicketListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";
import "./UserList.scss";

const UserList = (props) => {
  const { users, type } = props;
  const ListItem = (props) => {
    const { nom, code, active } = props;
    var classname = "";
    if (!active) {
      classname = "is-inactive";
    }
    return (
      <div className={"ListItem " + classname}>
        <div>
          {nom} ({code})
        </div>
        <div className="Links">
          {active ? (
            <Link to={"/" + type + "/" + code}>
              <FontAwesomeIcon icon={Icons.faEye} />
            </Link>
          ) : (
            <div></div>
          )}
          <Link to={"/modif" + type + "/" + code}>
            <FontAwesomeIcon icon={Icons.faPencilAlt} />
          </Link>
        </div>
      </div>
    );
  };
  var list = <div></div>;
  if (users) {
    list = users.map((u) => {
      var active = 1;
      //console.log(u);
      if (u.actif === "0") {
        active = 0;
      }
      return <ListItem code={u.code} nom={u.nom} active={active} key={u.id} />;
    });
  }
  return <div className="UserList">{list}</div>;
};
export default UserList;
