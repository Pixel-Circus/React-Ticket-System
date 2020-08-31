import React from "react";
import { Link } from "@reach/router";
import "./TicketListItem.scss";
import variables from "./../../variables.js";
const TicketListItem = (props) => {
  const { code, titre, categorie, date_debut, date_modif } = props;
  var categorieName = categorie;
  if (variables.categories[categorie]) {
    categorieName = variables.categories[categorie];
  }
  const InnerListItem = () => {
    return (
      <div className="TicketListItem">
        <div className="title">{titre}</div>
        <div className="categ">{categorieName}</div>
        <div className="date">{date_debut}</div>
        <div className="date">{date_modif}</div>
      </div>
    );
  };
  if (code) {
    return (
      <Link
        to={"/ticket/" + code}
        className={"OuterTicketListItem is-categ-" + categorie}
      >
        <InnerListItem />
      </Link>
    );
  } else {
    return (
      <div className={"OuterTicketListItem is-title"}>
        <InnerListItem />
      </div>
    );
  }
};
export default TicketListItem;
