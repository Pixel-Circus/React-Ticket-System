import React from "react";
import { Link } from "@reach/router";
import "./TicketListItem.scss";
//import variables from "./../../variables.js";

import { useTranslation } from "react-i18next";
//import i18n from "../../i18n";

const TicketListItem = (props) => {
  const { t /*, i18n*/ } = useTranslation();
  const { code, titre, categorie, date_debut, date_modif, client } = props;
  var categorieName = categorie;
  if (t("categories." + categorie)) {
    categorieName = t("categories." + categorie);
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
        to={"/ticket/" + client + "/" + code}
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
