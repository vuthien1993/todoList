import React from "react";
import Modal from "./Modal";
import "./ModalDelete.css";
function ModalDelete(props) {
  const deleteHandler = () => {
    const index = props.tasksArr.findIndex((ele) => ele.id === props.id);
    props.tasksArr.splice(index, 1);
    localStorage.setItem("tasksArr", JSON.stringify(props.tasksArr));
    props.onHidden();
  };
  return (
    <Modal>
      <div className="modalDelete">
        <p>{props.tasks}</p>
        <div className="btnright">
          <button onClick={props.onHidden}>Cancel</button>
          <button className="btndelete" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDelete;
