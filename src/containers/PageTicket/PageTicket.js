import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import axios from "axios";
import variables from "./../../variables";
import Input from "./../../components/UI/Input/Input";
import SelectCategory from "./../../components/UI/Selects/SelectCategory";
import SelectUser from "./../../components/UI/Selects/SelectUser";

//import { Editor } from "@tinymce/tinymce-react";
import "./PageTicket.scss";

const PageTicket = (props) => {
  const { ticketid, clientcode } = props;
  const [ticketInfo, setTicketInfo] = useState();
  useEffect(() => {
    if (!ticketInfo) {
      if (ticketid !== "create") {
        axios
          .get(variables.phpfolder + "feed.php?getticketinfo=" + ticketid)
          .then((response) => {
            //console.log(response.data.noresults);
            if (response.data.noresults) {
              console.log("No client");
              navigate("/?ticketnotfound=" + ticketid);
            } else {
              //console.log(response.data.results[0]);
              setTicketInfo(response.data.results[0]);
              //console.log("test");
              //window.location = "/client/" + code;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (clientcode) {
          var win = window,
            doc = document,
            docElem = doc.documentElement,
            body = doc.getElementsByTagName("body")[0],
            x = win.innerWidth || docElem.clientWidth || body.clientWidth,
            y = win.innerHeight || docElem.clientHeight || body.clientHeight;
          const technicalinfo =
            "Écran: " +
            window.screen.width +
            "x" +
            window.screen.height +
            "\nBrowser: " +
            x +
            "x" +
            y +
            "\n\nBrowser: \n" +
            navigator.userAgent;
          setTicketInfo({
            id: null,
            code: "create",
            client: clientcode,
            titre: "",
            description: "",
            stepbystep: "",
            technical: technicalinfo,
            date_debut: null,
            date_modif: null,
            assigne: null,
            categorie: 100,
          });
        } else {
          navigate("/?errorcreation=1");
        }
      }
    }
    //console.log("effect");
  }, [ticketInfo, ticketid, clientcode]);
  if (ticketInfo) {
    //console.log(ticketInfo);
    var titrePage = "Création du ticket";
    if (ticketInfo.code !== "create") {
      titrePage = "Modification du ticket " + ticketInfo.categorie;
    }
    return (
      <div className="PageTicket">
        <div className="Container">
          <h1>{titrePage}</h1>
          <form>
            <div class="Flex">
              <div>
                <SelectCategory currCateg={ticketInfo.categorie} />
              </div>
              <div>
                <SelectUser currCateg={ticketInfo.assigne} />
              </div>
              <div class="">
                <b>Soumis:</b>
                <br />
                {ticketInfo.date_debut ? ticketInfo.date_debut : "N/A"}
              </div>
              <div class="">
                <b>Modification:</b>
                <br />
                {ticketInfo.date_modif ? ticketInfo.date_modif : "N/A"}
              </div>
            </div>
            <Input
              elementType="input"
              label="Titre"
              value={ticketInfo.titre}
              placeholder="Titre"
              changed={(e) => {
                //console.log("x " + ticketInfo.titre);
                ticketInfo.titre = e.target.value;
                setTicketInfo(ticketInfo);
              }}
            />
            <Input
              elementType="wysiwyg"
              label="Description"
              value={ticketInfo.description}
              changed={(content, editor) => {
                ticketInfo.description = content;
                console.log(ticketInfo);
                setTicketInfo(ticketInfo);
              }}
            />
            <Input
              elementType="wysiwyg"
              label="Étape par étape"
              value={ticketInfo.stepbystep}
              changed={(content, editor) => {
                ticketInfo.stepbystep = content;
                setTicketInfo(ticketInfo);
              }}
            />
            <Input
              elementType="textarea"
              label="Informations techniques (Modifier seulement si bogue sur un poste différent)"
              value={ticketInfo.technical}
              changed={(e) => {
                //console.log("x " + ticketInfo.titre);
                ticketInfo.technical = e.target.value;
                setTicketInfo(ticketInfo);
              }}
            />

            <Input elementType="submit" value="Soumettre" />
          </form>
        </div>
      </div>
    );
  } else {
    return <div className="Container">Chargement...</div>;
  }
};

export default PageTicket;
