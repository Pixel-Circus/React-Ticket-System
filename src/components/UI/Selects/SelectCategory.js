import React, { useState, useEffect } from "react";
//import axios from "axios";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../../actionCreator/isAdmin";
import Input from "./../../../components/UI/Input/Input";
import variables from "./../../../variables";

const SelectCategory = (props) => {
  const { currCateg, isAdmin, change } = props;
  const [selectConfig, setSelectConfig] = useState();
  useEffect(() => {
    var { options, config } = "";
    //if (!selectConfig) {
    if (isAdmin) {
      //console.log(variables.categories);
      options = [];
      var value = "";
      Object.keys(variables.categories).map(function (key, index) {
        //variables.categories.map(function (e, k) {
        //console.log(key);
        //console.log(index);
        options.push({
          value: key,
          label: variables.categories[key],
        });
        if (key === currCateg) {
          value = {
            value: key,
            label: variables.categories[key],
          };
        }
        return null;
      });
      config = {
        options: options,
        value: value,
        isClearable: true,
      };
      setSelectConfig(config);
      //return null;
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
      //}
    }
    //return null;
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
        label="Catégorie"
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);
