import React from "react";
import variables from "./../../variables.js";
import "./ImageList.scss";

const ImageList = (props) => {
  const { images, remover, code } = props;
  var output = "";
  //console.log(images);
  //console.log(typeof images);
  if (typeof images === "object") {
    output = images.map((i) => {
      var imageUrl = variables.phpfolder + "../uploads/" + code + "/" + i;
      return (
        <div
          className="image"
          style={{
            backgroundImage: "url(" + imageUrl + ")",
          }}
        >
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            &nbsp;
          </a>
          <div
            class="close"
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

export default ImageList;
