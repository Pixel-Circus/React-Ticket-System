import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import variables from "./../../variables";
import Input from "./../../components/UI/Input/Input";
import { Link } from "@reach/router";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";
import "./../../styles/Form.scss";

const PageModifClient = (props) => {
  const { code, isAdmin } = props;
  const [userInfo, setUserInfo] = useState("");
  const [trackUserInfo, setTrackUserInfo] = useState(code);
  const [formLock, setFormLock] = useState(0);
  const [formNotice, setFormNotice] = useState(0);
  useEffect(() => {
    //console.log(userInfo);
    if (!isAdmin) {
      navigate("/?cantaccess=1");
    }
    if (!userInfo) {
      if (trackUserInfo !== "create" && trackUserInfo) {
        /*console.log(
          variables.phpfolder + "feed.php?getclientinfo=" + trackUserInfo
        );*/
        axios
          .get(variables.phpfolder + "feed.php?getclientinfo=" + trackUserInfo)
          .then((response) => {
            //console.log(response.data.noresults);
            if (response.data.noresults) {
              console.log("No client");
              navigate("/?clientnotfound=" + trackUserInfo);
            } else {
              //console.log(response.data.results[0]);
              setUserInfo(response.data.results[0]);
              //console.log("test");
              //window.location = "/client/" + code;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (trackUserInfo) {
          var defaultUserCode = null;
          if (code !== "create") {
            defaultUserCode = code;
          }
          setUserInfo({
            id: "create",
            code: defaultUserCode,
            nom: null,
            //actif: 1,
          });
        }
      }
    }
  }, [userInfo, trackUserInfo, code, isAdmin]);
  function handlerSubmit() {
    /*console.log("push");
    console.log(variables.phpfolder + "update_ticket.php");
    console.log(ticketInfo);*/
    setFormLock(1);
    var error = 0;
    var toCheck = ["code", "nom"];
    //console.log(ticketInfo);
    Object.keys(userInfo).forEach((key) => {
      //console.log(key + " " + ticketInfo[key]);
      if (!userInfo[key] && toCheck.indexOf(key) !== -1) {
        userInfo[key] = "px_error";
        error = 1;
      }
    });
    if (error) {
      setFormLock(0);
      setFormNotice(3);
      setTrackUserInfo(userInfo);
    } else {
      axios
        .post(variables.phpfolder + "update_client.php", userInfo)
        .then((response) => {
          // console.log("response");
          //console.log(response.data);
          setTrackUserInfo(response.data.code);
          setFormLock(0);
          setFormNotice(2);
          setUserInfo("");
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
  if (userInfo) {
    var titrePage = "Modification de l'utilisateur " + code;
    if (code === "create") {
      titrePage = "Création d'un nouvel utilisateur";
    }
    var formClass = "";
    if (formLock) {
      formClass += " is-locked";
    }
    return (
      <div className="Container">
        <div className="Flex">
          <h1>{titrePage}</h1>
          <div>
            <Link to={"/client/" + code} className="Button">
              Retourner au client
            </Link>
            &nbsp;
            <Link to={"/admin/overview/"} className="Button">
              Retourner au overview
            </Link>
          </div>
        </div>
        <ErrorMessage />
        <form className={"Form " + formClass}>
          <Input
            elementType="input"
            label="Code Utilisateur"
            value={userInfo.code}
            placeholder="Code Utilisateur"
            changed={(e) => {
              setUserInfo({ ...userInfo, code: e.target.value });
            }}
          />
          <Input
            elementType="input"
            label="Nom"
            value={userInfo.nom}
            placeholder="Nom"
            changed={(e) => {
              setUserInfo({ ...userInfo, nom: e.target.value });
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
    );
  } else {
    return <div className="Container">Chargement</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(PageModifClient);
//export default PageModifUser;
