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
  const testHandler = (e) => {
    // e.stopPropagation();
    e.isImportant = !e.isImportant;
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  };
  const showTasksDetailHandler = (ele) => {
    setId(ele.id);
    setTasksTodo(ele.tasks);
    console.log(tasksTodo);
    props.onShowTasksDetail(tasksTodo);
  };
  const showTasksDetail = props.showTasksDetail;
  const classbuttonAdd = showTasksDetail ? "col-md-2" : "col-md-1";
  const classIconAdd = showTasksDetail ? "col-md-10" : "col-md-11";
  const classBorderTasksArr = showTasksDetail
    ? "borderTasksArr1"
    : "borderTasksArr2";
  const classMyday = showTasksDetail ? "col-md-5" : "col-md-8";
  const classSort = showTasksDetail ? "col-md-7" : "col-md-4";
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
        <div className="row mydayBorder">
          <div className={`${classMyday} marginTMyday`}>
            <h5>
              <i className="fa-regular fa-sun ipadding"></i>My Day{" "}
              <span>...</span>
            </h5>
            <p className="textGray">{d}</p>
          </div>
          <div className={`${classSort} marginTMyday1`}>
            <div className="textGray">
              <span>
                <span>
                  <i className="fa fa-arrow-down" aria-hidden="true"></i>
                  <i className="fa fa-arrow-up" aria-hidden="true"></i>
                </span>
                <span>Sort</span>
              </span>
              <span className="spanHover">
                <span className="ipadding">
                  <span className="fa-solid fa-neuter" />
                  Suggestions
                </span>
              </span>
            </div>
          </div>
          <form onSubmit={submitHandler}>
            <div className="inputTasks">
              <i className="fa-regular fa-circle"></i>
              <input
                placeholder="Add a tasks"
                value={enteredTasks}
                onChange={changeHandler}
                onBlur={blurHandler}
              />
            </div>
            <div className="row iconMydayAdd">
              <div className={classIconAdd}>
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
                  class="fa-solid fa-arrows-rotate"
                  data-toggle="tooltip"
                  title="Repeat!"
                ></i>
              </div>
              <div className={classbuttonAdd}>
                <button disabled={!formIsvalid}>Add</button>
              </div>
            </div>
            <div className={`${classBorderTasksArr} borderTasksArr`}>
              {tasksArr.map((ele) => {
                return (
                  <div
                    key={ele.id}
                    className={`${classTasksArrList} row`}
                    onClick={() => showTasksDetailHandler(ele)}
                  >
                    <div className="col-md-1">
                      <i className="fa-regular fa-circle"></i>
                    </div>
                    <div className="col-md-10">
                      <p> {ele.tasks}</p>
                      <p className="textSize">Tasks</p>
                    </div>
                    <div className="col-md-1" onClick={() => testHandler(ele)}>
                      {!ele.isImportant && (
                        <i
                          className="fa-regular fa-star"
                          data-toggle="tooltip"
                          title="Mark tasks as important!"
                        ></i>
                      )}
                      {ele.isImportant && (
                        <i
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
