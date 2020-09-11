import React from "react";

import TicketListItem from "./../TicketListItem/TicketListItem";
import { useTranslation } from "react-i18next";

const TicketList = (props) => {
  const { t /*, i18n*/ } = useTranslation();
  const { tickets } = props;
  //console.log(tickets);
  var ticketlist = <div></div>;
  if (tickets) {
    ticketlist = tickets.map((ticket) => (
      <TicketListItem
        key={ticket.id}
        //id={ticket.id}
        code={ticket.code}
        titre={ticket.titre}
        //description={ticket.description}
        //stepbystep={ticket.stepbystep}
        //image={ticket.image}
        date_debut={ticket.date_debut}
        date_modif={ticket.date_modif}
        categorie={ticket.categorie}
        //assigne={ticket.assigne}
        client={ticket.client}
      />
    ));
  }
  return (
    <div className="TicketList">
      <TicketListItem
        key="0"
        //id={ticket.id}
        code={false}
        titre={t("Titre")}
        date_debut={t("Date Début")}
        date_modif={t("Date modification")}
        categorie={t("Catégorie")}
      />
      {ticketlist}
    </div>
  );
};
export default TicketList;
