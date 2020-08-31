import React from "react";

import TicketListItem from "./../TicketListItem/TicketListItem";

const TicketList = (props) => {
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
      />
    ));
  }
  return (
    <div className="TicketList">
      <TicketListItem
        key="0"
        //id={ticket.id}
        code={false}
        titre="Titre"
        date_debut="Date Début"
        date_modif="Date modification"
        categorie="Catégorie"
      />
      {ticketlist}
    </div>
  );
};
export default TicketList;
