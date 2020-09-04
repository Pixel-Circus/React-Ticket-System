import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";

import axios from "axios";
import variables from "./../../variables";
import Input from "./../../components/UI/Input/Input";
import TicketInfo from "./../../components/TicketInfo/TicketInfo";

//import { Editor } from "@tinymce/tinymce-react";
import "./PageTicket.scss";
import "./../../styles/Form.scss";

const PageTicket = (props) => {
  const { ticketid, clientcode, isAdmin } = props;
  const [trackTicketId, setTrackTicketId] = useState(ticketid);
  const [ticketInfo, setTicketInfo] = useState("");
  const [formLock, setFormLock] = useState(false);
  const [formNotice, setFormNotice] = useState(0);
  useEffect(() => {
    //console.log("effect");
    //console.log(trackTicketId);
    if (!ticketInfo) {
      if (trackTicketId !== "create" && trackTicketId) {
        axios
          .get(variables.phpfolder + "feed.php?getticketinfo=" + trackTicketId)
          .then((response) => {
            //console.log(response.data.noresults);
            if (response.data.noresults) {
              console.log("No client");
              navigate("/?ticketnotfound=" + trackTicketId);
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
        if (clientcode || isAdmin) {
          var defaultClientCode = null;
          if (clientcode) {
            defaultClientCode = clientcode;
          }
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
            client: defaultClientCode,
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
  }, [ticketInfo, ticketid, clientcode, formNotice, trackTicketId, isAdmin]);
  function handlerSubmit() {
    /*console.log("push");
    console.log(variables.phpfolder + "update_ticket.php");
    console.log(ticketInfo);*/
    setFormLock(1);
    var error = 0;
    var toCheck = ["titre", "stepbystep", "technical", "description"];
    //console.log(ticketInfo);
    Object.keys(ticketInfo).forEach((key) => {
      //console.log(key + " " + ticketInfo[key]);
      if (!ticketInfo[key] && toCheck.indexOf(key) !== -1) {
        ticketInfo[key] = "px_error";
        error = 1;
      }
    });
    if (error) {
      setFormLock(0);
      setFormNotice(3);
      setTicketInfo(ticketInfo);
    } else {
      axios
        .post(variables.phpfolder + "update_ticket.php", ticketInfo)
        .then((response) => {
          /* console.log("response");
        console.log(response.data);*/
          setTrackTicketId(response.data.code);
          setFormLock(0);
          setFormNotice(2);
          setTicketInfo("");
          window.scroll(0, 0);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          setFormNotice(1);
          setFormLock(0);
          window.scroll(0, 0);
        });
    }
  }
  if (ticketInfo) {
    var titrePage = "Création du ticket";
    if (ticketInfo.code !== "create") {
      titrePage = "Modification du ticket " + ticketInfo.code;
    }
    var formClass = "";
    if (formLock) {
      formClass += " is-locked";
    }
    const ErrorMessage = () => {
      if (formNotice === 1) {
        return <div className="notice is-error">Une erreur est survenue</div>;
      } else if (formNotice === 2) {
        return (
          <div className="notice is-success">
            Vos modifications ont été sauvegardées
          </div>
        );
      } else if (formNotice === 3) {
        return (
          <div className="notice is-error">
            Certains champs ne sont pas remplis
          </div>
        );
      }
      return <div></div>;
    };

    return (
      <div className="PageTicket">
        <div className="Container">
          <h1>{titrePage}</h1>
          <ErrorMessage />
          <form className={"Form " + formClass}>
            <TicketInfo
              ticketInfo={ticketInfo}
              categchange={(e) =>
                setTicketInfo({ ...ticketInfo, categorie: e.value })
              }
              assignechange={(e) =>
                setTicketInfo({ ...ticketInfo, assigne: e.value })
              }
              clientchange={(e) =>
                setTicketInfo({ ...ticketInfo, client: e.value })
              }
            />
            <Input
              elementType="input"
              label="Titre"
              value={ticketInfo.titre}
              placeholder="Titre"
              changed={(e) => {
                console.log(ticketInfo);
                setTicketInfo({ ...ticketInfo, titre: e.target.value });
              }}
            />
            <Input
              elementType="wysiwyg"
              label="Description"
              value={ticketInfo.description}
              changed={(content, editor) => {
                ticketInfo.description = content;
                //console.log(ticketInfo);
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
                setTicketInfo({ ...ticketInfo, technical: e.target.value });
              }}
            />

            <Input
              elementType="button"
              value="Soumettre"
              submit={() => {
                handlerSubmit();
              }}
            />
          </form>
        </div>
      </div>
    );
  } else {
    return <div className="Container">Chargement...</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(PageTicket);
//export default PageTicket;
