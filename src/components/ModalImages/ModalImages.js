import React from "react";
import { connect /*, useStore*/ } from "react-redux";
import modalImages from "../../actionCreator/modalImages";
import "./ModalImages.scss";
import variables from "./../../variables.js";

const ModalImages = (props) => {
  const { modalImages, setModalImages } = props;
  function moveslider(direction) {
    var currimage = modalImages.shown;
    if (direction === "next") {
      currimage++;
      if (currimage >= modalImages.images.length) {
        currimage = 0;
      }
    }
    if (direction === "prev") {
      currimage--;
      if (currimage < 0) {
        currimage = modalImages.images.length - 1;
      }
    }
    setModalImages({ ...modalImages, shown: currimage });
  }
  if (modalImages.shown === 999 || !modalImages.code) {
    return <div></div>;
  } else {
    return (
      <div className="ModalImages">
        <div
          className="ModalBG"
          onClick={() => {
            setModalImages({ code: null });
          }}
        >
          <div className="exit">x</div>
        </div>
        <div className="ModalContents">
          <div
            className="Nav is-next"
            onClick={() => {
              moveslider("next");
            }}
          ></div>
          <div
            className="Nav is-prev"
            onClick={() => {
              moveslider("prev");
            }}
          ></div>
          <img
            src={
              variables.phpfolder +
              "../uploads/" +
              modalImages.code +
              "/" +
              modalImages.images[modalImages.shown]
            }
            alt={modalImages.images[modalImages.shown]}
          />
        </div>
      </div>
    );
  }
};

//export default ModalImages;
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalImages);
