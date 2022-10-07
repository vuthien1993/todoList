import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const Backdrop = (props) => {
  return <div className="backdrop"></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modalt">
      <div>{props.children}</div>
    </div>
  );
};

//chọn phần tử html
const portalElement = document.getElementById("overlays");
function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
}

export default Modal;
