import React from "react";
import Modal from "./Modal";
import "./ModalDelete.css";
function ModalDelete(props) {
  return (
    <Modal>
      <div className="modalDelete">
        <p>{props.tasks}</p>
        <div className="btnright">
          <button onClick={props.onHidden}>Cancel</button>
          <button className="btndelete" onClick={props.onDelete}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDelete;
