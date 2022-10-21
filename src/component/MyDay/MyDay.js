import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantAction } from "../../Redux/important";
import moment from "moment/moment";
import useInput from "../../hook/use-input";
import ModalDelete from "../modalDelete/ModalDelete";
import "./MyDay.css";

function MyDay(props) {
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const mydayTasksArr = tasksArr.filter((ele) => ele.isMyday === true);
  const dispatch = useDispatch();
  //khai bao mang chua data
  // const [tasks, setTasks] = useState(tasksArr);
  //khai bao lay gia tri thoi gian thuc
  const d = moment().format("dddd, MMMM Do");
  //khai bao su dung custom hook

  const [id, setId] = useState("");
  const {
    value: enteredMyday,
    isValid: enteredMydayIsvalid,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetMydayInput,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredMydayIsvalid) {
    formIsvalid = true;
  }

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //ham submit
  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let tasksItem = {
      isDone: false,
      isImportant: false,
      isMyday: true,
      isPlanned: false,
      isTasks: false,
      id: id,
      tasks: enteredMyday,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetMydayInput();
  };
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
  const classMyday = showTasksDetail ? "myday1" : "myday";
  const classIconStar = showTasksDetail ? "iconLineStar1" : "iconLineStar";
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
      <div>
        <div className="mydayBorder">
          <div className={`fll ${classMyday}`}>
            <div className="mydayDate">
              <h5>
                <i className="fa-regular fa-sun"></i>My Day <span>...</span>
              </h5>
            </div>

            <div className="textGray mydayspan">
              <span>{d}</span>
            </div>
          </div>
          <div className="fll mydaySort">
            <div className="textGray">
              <span className="sort">
                <span className="ipadding">
                  <i className="fa fa-arrow-down" aria-hidden="true"></i>
                  <i className="fa fa-arrow-up" aria-hidden="true"></i>
                </span>
                <span>Sort</span>
              </span>
              <span className=" suggestions">
                <span className="fa-solid fa-neuter ipadding" />
                <span>Suggestions</span>
              </span>
            </div>
          </div>
        </div>
        {/* /////////////////////////////// */}
        <div className="formSubmitMyday">
          <form onSubmit={submitHandler}>
            <div className="totalInputTask">
              <div className="inputTasks">
                <i className="fa-regular fa-circle"></i>
                <input
                  placeholder="Add a tasks"
                  value={enteredMyday}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                />
              </div>
              <div className="iconMydayAdd">
                <div className="textGray fll iconWidth">
                  <i
                    className="fa-solid fa-calendar-days"
                    data-toggle="tooltip"
                    title="Add due date!"
                  ></i>
                  <i
                    class="fa-regular fa-bell"
                    data-toggle="tooltip"
                    title="Remind me!"
                  ></i>
                  <i
                    className="fa-solid fa-repeat"
                    data-toggle="tooltip"
                    title="Repeat!"
                  ></i>
                </div>
                <div className="fll" id="ffl">
                  <button disabled={!formIsvalid}>Add</button>
                </div>
              </div>
            </div>
            {/* //////////////////////// */}
            <div className="tasksArrList">
              {mydayTasksArr.map((ele) => {
                return (
                  <div
                    className="borderTasksArr"
                    key={ele.id}
                    onClick={() => showTasksDetailHandler(ele)}
                  >
                    <div className="fll iconLine">
                      <i className="fa-regular fa-circle "></i>
                    </div>
                    <div className="fll taskName">
                      <span> {ele.tasks}</span>
                      <br />
                      <span className="textSize">Tasks</span>
                    </div>
                    <div className={`fll ${classIconStar}`}>
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
      </div>
    </React.Fragment>
  );
}

export default MyDay;
