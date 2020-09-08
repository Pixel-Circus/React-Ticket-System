import React from "react";
//import { Link } from "@reach/router";
import TicketListItem from "./../TicketListItem/TicketListItem";
import string_to_slug from "./../../functions/string_to_slugs";

const TicketListBySeparator = (props) => {
  const { splitter, list, categs } = props;
  //var currCateg = "";
  //const [currCateg, setCurrCateg] = useState("");
  const TitrePossible = (props) => {
    var { curr, thiscat } = props;
    if (!curr) {
      curr = "nocurrentcateg";
    }
    if (!thiscat) {
      thiscat = "nocurrentcateg";
    }
    if (string_to_slug(curr) !== string_to_slug(thiscat)) {
      //setCurrCateg(thiscat);
      //curr = thiscat;
      var thiscattitle = "";
      Object.values(categs).forEach((t) => {
        //console.log(t);
        if (thiscat === t.id) {
          thiscattitle = t.nom;
        }
      });
      return <h3>{thiscattitle}&nbsp;</h3>;
    } else {
      return <div></div>;
    }
  };
  if (list) {
    var prev = "";
    var output = list.map(function (t) {
      var returnString = (
        <div key={splitter + "-" + t.id}>
          <TitrePossible curr={prev[splitter]} thiscat={t[splitter]} />
          <TicketListItem
            code={t.code}
            titre={t.titre}
            categorie={t.categorie}
            date_debut={t.date_debut}
            date_modif={t.date_modif}
            client={t.client}
          />
        </div>
      );
      prev = t;
      return returnString;
    });
  }
  return <div>{output}</div>;
};
export default TicketListBySeparator;
