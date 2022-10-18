import React, { useState } from "react";
import moment from "moment/moment";
import useInput from "../../hook/use-input";
import ModalDelete from "../modalDelete/ModalDelete";
import "./MyDay.css";

function MyDay(props) {
  // lay data tu localstorage
  const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];
  //khai bao mang chua data
  const [tasks, setTasks] = useState(tasksArr);
  //khai bao lay gia tri thoi gian thuc
  const d = moment().format("dddd, MMMM Do");
  const [showStar, setShowStar] = useState(tasksArr.isDone);
  const [isImportant, setIsImportant] = useState(false);

  //khai bao su dung custom hook

  const [id, setId] = useState("");
  const [tasksTodo, setTasksTodo] = useState("");
  const {
    value: enteredTasks,
    isValid: enteredTasksIsvalid,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetTasksInput,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredTasksIsvalid) {
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
      isImportant: false,
      isDone: false,
      id: id,
      tasks: enteredTasks,
    };
    setTasks((pre) => {
      const newTasks = [...pre, tasksItem];
      localStorage.setItem("tasksArr", JSON.stringify(newTasks));
      return newTasks;
    });
    console.log(tasks);
    resetTasksInput();
  };
  const deleteHandler = () => {
    const index = tasksArr.findIndex((ele) => id === ele.id);
    tasksArr.splice(index, 1);
    //set lại state vi moi state chỉ khởi tạo giá trị ban đầu 1 lần duy nhất
    setTasks(tasksArr);
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
    props.onShowModal();
    props.onHidden();
  };
  const testHandler = (ele, event) => {
    setIsImportant(!isImportant);
    event.stopPropagation();
    ele.isImportant = !ele.isImportant;
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  };
  const showTasksDetailHandler = (ele) => {
    setId(ele.id);
    setTasksTodo(ele.tasks);
    console.log(tasksTodo);
    props.onShowTasksDetail(tasksTodo);
  };
  const showTasksDetail = props.showTasksDetail;
  const classMyday = showTasksDetail ? "myday1" : "myday";
  const classIconStar = showTasksDetail ? "iconLineStar1" : "iconLineStar";
  const classBorderTasksArr = showTasksDetail
    ? "borderTasksArr1"
    : "borderTasksArr2";
  const classTasksArrList = showTasksDetail ? "tasksArrList1" : "tasksArrList";
  return (
    <React.Fragment>
      {props.show && (
        <ModalDelete
          onHidden={props.onShowModal}
          onDelete={deleteHandler}
          tasksArr={tasksArr}
          id={id}
          tasks={tasksTodo}
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
                  value={enteredTasks}
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
              {tasksArr.map((ele) => {
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
