import React /*, { useState, useEffect }*/ from "react";
import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";
import SelectCategory from "./../../components/UI/Selects/SelectCategory";
import SelectUser from "./../../components/UI/Selects/SelectUser";
import SelectClient from "./../../components/UI/Selects/SelectClient";
import variables from "./../../variables";

const TicketInfo = (props) => {
  const {
    isAdmin,
    ticketInfo,
    categchange,
    assignechange,
    clientchange,
  } = props;
  if (isAdmin) {
    return (
      <div>
        <div className="Flex">
          <div>
            <SelectCategory
              currCateg={ticketInfo.categorie}
              change={categchange}
            />
          </div>
          <div>
            <SelectUser currCateg={ticketInfo.assigne} change={assignechange} />
          </div>
          <div>
            <SelectClient currCateg={ticketInfo.client} change={clientchange} />
          </div>
        </div>
        <div className="Flex">
          <div className="">
            <b>Soumis : </b>
            {ticketInfo.date_debut ? ticketInfo.date_debut : "N/A"}
          </div>
          <div className="">
            <b>Modification : </b>
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
            {variables.categories[ticketInfo.categorie]}
          </div>
          <div className="">
            <b>Soumis : </b>
            {ticketInfo.date_debut ? ticketInfo.date_debut : "N/A"}
          </div>
          <div className="">
            <b>Modification : </b>
            {ticketInfo.date_modif ? ticketInfo.date_modif : "N/A"}
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
