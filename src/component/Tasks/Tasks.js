import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import ModalDelete from "../modalDelete/ModalDelete";
import useInput from "../../hook/use-input";
import "./Tasks.css";
function Tasks(props) {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const tasksArrTotal = useSelector((state) => state.important.tasksArr);
  const tasksArr = tasksArrTotal.filter((ele) => ele.isDone !== true);
  const tasksArrCompele = tasksArrTotal.filter((ele) => ele.isDone === true);

  const {
    value: enteredTasks,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetTasksInput,
    isValid: enteredTasksIsvalid,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredTasksIsvalid) {
    formIsvalid = true;
  }

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let tasksItem = {
      isDone: false,
      isImportant: false,
      isMyday: false,
      isPlanned: false,
      isTasks: true,
      id: id,
      tasks: enteredTasks,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetTasksInput();
  };

  ///////////////////////////////////////
  const deleteHandler = () => {
    dispatch(importantAction.deleteTask({ id }));
    props.onShowModal();
    dispatch(importantAction.hidenDetail());
  };
  const testHandler = (ele, event) => {
    event.stopPropagation();
    const idI = ele.id;
    dispatch(importantAction.important({ idI }));
    if (ele.id === id) {
      const isImportant = !ele.isImportant;
      dispatch(importantAction.showImportantDetail({ isImportant }));
    }
  };
  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const showTasksDetailHandler = (ele) => {
    setId(ele.id);
    const idDetail = ele.id;
    const tasksName = ele.tasks;
    const isImportant = ele.isImportant;
    dispatch(importantAction.showDetail({ tasksName, idDetail }));
    dispatch(importantAction.showImportantDetail({ isImportant }));
    console.log(showTasksDetail);
  };
  //ham chon va bo chon hoan thanh cong viec
  const isDoneHandler = (ele, event) => {
    event.stopPropagation();
    const idC = ele.id;
    dispatch(importantAction.complete({ idC }));
  };

  return (
    <React.Fragment>
      {props.show && (
        <ModalDelete
          onHidden={props.onShowModal}
          onDelete={deleteHandler}
          tasksArr={tasksArr}
          id={id}
        />
      )}
      <div className="mydayBorder ">
        <div className={`fll marginTMyday lineTasks`} id="sizeText">
          <p className="textColorImportant">
            <i className="fa-solid fa-house"></i> Tasks
            <button>...</button>
          </p>
        </div>
        <div className="fll marginTMyday lineTasks1">
          <p className="textColorImportant">
            <span>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </span>
            <span>Sort</span>
          </p>
        </div>
      </div>
      <div className="formSubmitMyday">
        <form onSubmit={submitHandler}>
          <div className="totalInputTask">
            <div className="inputTasks">
              <i className="fa-regular fa-circle"></i>
              <input
                placeholder="Add a tasks"
                onChange={changeHandler}
                onBlur={blurHandler}
                value={enteredTasks}
              />
            </div>

            {/* ///////////////////// */}
            <div className="iconMydayAdd">
              <div className="textGray fll iconWidth">
                <i className="fa-solid fa-calendar-days"></i>
                <i className="fa-regular fa-bell"></i>
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              <div className="fll" id="btnAdd">
                <button disabled={!formIsvalid}>Add</button>
              </div>
            </div>
          </div>
          {/* ////////////////// */}
          <div className="tasksArrList">
            {[...tasksArr].reverse().map((ele) => {
              return (
                <div
                  className="borderTasksArr"
                  key={ele.id}
                  onClick={() => showTasksDetailHandler(ele)}
                >
                  <div className="fll iconLine">
                    <i
                      className="fa-regular fa-circle "
                      onClick={(event) => isDoneHandler(ele, event)}
                    ></i>
                  </div>
                  <div className="fll taskName">
                    <span className="tasksLine checked"> {ele.tasks}</span>
                  </div>
                  <div className={`fll iconLineStar`}>
                    {!ele.isImportant && (
                      <i
                        style={{ color: "blue" }}
                        onClick={(event) => testHandler(ele, event)}
                        className="fa-regular fa-star"
                        data-toggle="tooltip"
                        title="Mark tasks as important!"
                      ></i>
                    )}
                    {ele.isImportant && (
                      <i
                        onClick={(event) => testHandler(ele, event)}
                        style={{ color: "blue" }}
                        className="fa-solid fa-star"
                        data-toggle="tooltip"
                        title="Remove importance!"
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Tasks;
