import React from "react";
import variables from "./../../variables.js";
import "./ImageList.scss";

import { connect /*, useStore*/ } from "react-redux";
import modalImages from "../../actionCreator/modalImages";

const ImageList = (props) => {
  const { images, remover, code, setModalImages } = props;
  var output = "";
  //console.log(images);
  //console.log(typeof images);
  function showModal(imgnb) {
    console.log("showmodal");
    setModalImages({ images: images, shown: imgnb, code: code });
  }
  if (typeof images === "object") {
    var inc = -1;
    output = images.map((i) => {
      var imageUrl = variables.phpfolder + "../uploads/" + code + "/" + i;
      inc++;
      var currInc = inc;
      return (
        <div
          className="image"
          style={{
            backgroundImage: "url(" + imageUrl + ")",
          }}
          key={"imagelist-" + inc}
        >
          <div
            className="ModalTrigger"
            onClick={() => {
              showModal(currInc);
              return null;
            }}
          >
            &nbsp;
          </div>
          <div
            className="close"
            onClick={() => {
              remover(i);
            }}
          >
            x
          </div>
        </div>
      );
    });
  }
  return <div className="ImageList">{output}</div>;
};

//export default ImageList;
const mapStateToProps = (state) => {
  return {
    //isAdmin: state.isAdmin,
    modalImages: state.modalImages,
  };
};
const mapDispatchToProps = (dispatch) => ({
  //setIsAdmin: (key) => dispatch(isAdmin(key)),
  setModalImages: (key) => dispatch(modalImages(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
