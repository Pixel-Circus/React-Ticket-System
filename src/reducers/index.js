import { combineReducers } from "redux";
import isAdmin from "./isAdmin";
//import modalSlideshow from "./modalSlideshow";
import modalImages from "./modalImages";
//import currentCateg from "./currentCateg";

export default combineReducers({
  isAdmin,
  modalImages,
  //currentCateg,
});
