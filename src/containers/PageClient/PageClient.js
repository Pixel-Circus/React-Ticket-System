import React from "react";

import axios from "axios";
import variables from "./../../variables";

const PageClient = (props) => {
  const { code } = props;
  axios
    .get(variables.phpfolder + "feed.php?clientcheck=" + code)
    .then((response) => {
      console.log(response.data.noresults);
      if (response.data.noresults) {
        console.log("No client");
        window.location = "/?codenotfound=" + code;
      } else {
        console.log("test");
        //window.location = "/client/" + code;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return <div className="Container">Client {code}</div>;
};

export default PageClient;
