import React from "react";
import Modal from "./Modal";
import "./ModalDelete.css";
function ModalDelete(props) {
  const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];
  const deleteHandler = () => {
    const index = tasksArr.findIndex((ele) => ele.id === props.id);
    tasksArr.splice(index, 1);
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
    window.location.reload();
  };
  return (
    <Modal>
      <div className="modalDelete">
        <p>{props.tasks}</p>
        <div className="btnright">
          <button onClick={props.onShow}>Cancel</button>
          <button className="btndelete" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDelete;
