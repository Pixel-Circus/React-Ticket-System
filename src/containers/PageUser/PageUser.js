import React, { useEffect } from "react";
import { Link } from "@reach/router";

import { connect /*, useStore*/ } from "react-redux";
import isAdmin from "./../../actionCreator/isAdmin";

const PageUser = (props) => {
  const { isAdmin, setIsAdmin } = props;
  useEffect(() => {
    if (!isAdmin) {
      setIsAdmin(true);
    }
  }, [isAdmin, setIsAdmin]);
  return (
    <div>
      User <Link to="/">Link</Link>
    </div>
  );
};

//export default PageUser;
const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    //currentCateg: state.currentCateg,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setIsAdmin: (key) => dispatch(isAdmin(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageUser);
