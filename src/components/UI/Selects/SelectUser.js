import React, { useState, useEffect } from "react";
import axios from "axios";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../../actionCreator/isAdmin";
import Input from "./../../../components/UI/Input/Input";
import variables from "./../../../variables";
import string_to_slug from "./../../../functions/string_to_slugs";

const SelectUser = (props) => {
  const { currCateg, isAdmin, change } = props;
  const [selectConfig, setSelectConfig] = useState();
  useEffect(() => {
    var { options, config } = "";
    //if (!selectConfig) {
    if (isAdmin) {
      axios
        .get(variables.phpfolder + "feed.php?fetch_users=1")
        .then((response) => {
          //console.log(response.data.noresults);
          //console.log(response.data.results);
          var options = [];
          var value = "";
          response.data.results.map((e) => {
            //console.log(e);
            options.push({
              value: e.code,
              label: e.nom,
            });
            //console.log(currCateg);
            if (currCateg) {
              if (string_to_slug(currCateg) === string_to_slug(e.code)) {
                value = { value: e.code, label: e.nom };
              }
            }
            return null;
          });
          var config = {
            options: options,
            value: value,
            isClearable: true,
          };
          setSelectConfig(config);
          //console.log("test");
          //window.location = "/client/" + code;
          //return null;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      options = {
        value: currCateg,
        label: variables.categories[currCateg],
      };
      config = {
        options: [options],
        isDisabled: true,
        value: options,
      };
      //console.log(config);
      setSelectConfig(config);
    }
    //}
  }, [currCateg, isAdmin]);
  if (!selectConfig) {
    //console.log("Loading");
    //console.log(selectConfig);
    return <div>Chargement...</div>;
  } else {
    //console.log("Loaded");
    //console.log(selectConfig);
    return (
      <Input
        elementType="select"
        elementConfig={selectConfig}
        label="Assigné"
        changed={(e) => {
          if (e) {
            change(e);
          } else {
            e = {};
            e.value = "";
            change(e);
          }
        }}
      />
    );
  }
};
//export default SelectCategory;

const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    //currentCateg: state.currentCateg,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setIsAdmin: (key) => dispatch(isAdmin(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectUser);
