import React, { useState, useEffect } from "react";
import axios from "axios";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../../actionCreator/isAdmin";
import Input from "./../../../components/UI/Input/Input";
import variables from "./../../../variables";

const SelectCategory = (props) => {
  const { currCateg, isAdmin } = props;
  const [selectConfig, setSelectConfig] = useState();
  useEffect(() => {
    var { options, config } = "";
    if (!selectConfig) {
      if (isAdmin) {
        axios
          .get(variables.phpfolder + "feed.php?fetch_users=1")
          .then((response) => {
            //console.log(response.data.noresults);
            //console.log(response.data.results);
            var options = [];
            var value = "";
            response.data.results.map(function (e) {
              //console.log(e);
              options.push({
                value: e.code,
                label: e.nom,
              });
              if (currCateg === e.code) {
                value = { value: e.code, label: e.nom };
              }
            });
            var config = {
              options: options,
              value: value,
            };
            setSelectConfig(config);
            //console.log("test");
            //window.location = "/client/" + code;
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
    }
  }, [selectConfig, currCateg, isAdmin]);
  if (!selectConfig) {
    //console.log("Loading");
    //console.log(selectConfig);
    return <div>Chargement...</div>;
  } else {
    //console.log("Loaded");
    //console.log(selectConfig);
    return <Input elementType="select" elementConfig={selectConfig} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);
