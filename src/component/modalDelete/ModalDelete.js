import React from "react";
import Modal from "./Modal";
import "./ModalDelete.css";
function ModalDelete(props) {
  return (
    <Modal>
      <div className="modalDelete">
        <div>
          "{props.tasks}" <span> will be permanently deleted.</span>
        </div>
        <div>
          <span>You won't be able to undo this action.</span>
        </div>
        <div className="btnright">
          <button onClick={props.onHidden}>Cancel</button>
          <button className="btndelete" onClick={props.onDelete}>
            Delete tasks
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDelete;
