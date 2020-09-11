import React /*, { useState, useEffect }*/ from "react";
import { connect /*, useStore*/ } from "react-redux";
import { Link } from "@reach/router";
import isAdmin from "./../../actionCreator/isAdmin";
import SelectCategory from "./../../components/UI/Selects/SelectCategory";
import SelectUser from "./../../components/UI/Selects/SelectUser";
import SelectClient from "./../../components/UI/Selects/SelectClient";
import variables from "./../../variables";

import { useTranslation } from "react-i18next";

const TicketInfo = (props) => {
  const { t /*, i18n*/ } = useTranslation();
  const {
    isAdmin,
    ticketInfo,
    categchange,
    assignechange,
    clientchange,
  } = props;
  const LinkAssigne = (props) => {
    if (ticketInfo.assigne) {
      return (
        <Link to={"/user/" + ticketInfo.assigne + "/"}>
          {t("Retour à l'assigné")}
        </Link>
      );
    } else {
      return <span>&nbsp;</span>;
    }
  };
  const LinkClient = (props) => {
    if (ticketInfo.client) {
      return (
        <Link to={"/client/" + ticketInfo.client + "/"}>
          {t("Retour au Client")}
        </Link>
      );
    } else {
      return <span>&nbsp;</span>;
    }
  };
  if (isAdmin) {
    return (
      <div>
        <div className="Flex">
          <div>
            <SelectCategory
              currCateg={ticketInfo.categorie}
              change={categchange}
            />
            <Link to="/admin/overview">{t("Retour à l'overview")}</Link>
          </div>
          <div>
            <SelectUser currCateg={ticketInfo.assigne} change={assignechange} />
            <LinkAssigne />
          </div>
          <div>
            <SelectClient currCateg={ticketInfo.client} change={clientchange} />
            <LinkClient />
          </div>
        </div>
        <div className="Flex">
          <div className="">
            <b>{t("Soumis")} </b>
            {ticketInfo.date_debut ? ticketInfo.date_debut : "N/A"}
          </div>
          <div className="">
            <b>{t("Modification")} </b>
            {ticketInfo.date_modif ? ticketInfo.date_modif : "N/A"}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="Flex">
          <div className="">
            <b>Catégorie : </b>
            <br />
            {variables.categories[ticketInfo.categorie]}
          </div>
          <div className="">
            <b>Soumis : </b>
            <br />
            {ticketInfo.date_debut ? ticketInfo.date_debut : "N/A"}
          </div>
          <div className="">
            <b>Modification : </b>
            <br />
            {ticketInfo.date_modif ? ticketInfo.date_modif : "N/A"}
          </div>
          <div>
            <Link to={"/client/" + ticketInfo.client + "/"}>
              Retour aux tickets
            </Link>
          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(TicketInfo);
